import { defineStore } from "pinia";
import { ref, computed } from 'vue';
import { cartApi } from "@/api/cart";
import { useAuthStore } from "./auth";

export const useCartStore = defineStore('cart', () => {
    const items = ref([]);
    const serverId = ref(null);
    let isSyncing = false;

    const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0));
    const totalPrice = computed(() => items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0));
    const isAdded = (id) => items.value.some(item => item.id === id);

    const saveToServer = async () => {
        const authStore = useAuthStore();
        if(!authStore.isAuthenticated) return;
        
        if(serverId.value){
            await cartApi.update(serverId.value, items.value);
        } else{
            const created = await cartApi.create(authStore.user.id, items.value);
            serverId.value = created.id;
        }
    }

    const addToCart = async (product) => {
        const existing = items.value.find(item => item.id === product.id)
        if (existing) {
            existing.quantity++;
        }
        else {
            items.value.push({ ...product, quantity: 1 });
        }
        await saveToServer();
    }

    const removeFromCart = async (productId) => {
        items.value = items.value.filter(item => item.id !== productId);
        await saveToServer();
    }

    const updateQuantity = async (productId, amount) => {
        const item = items.value.find(item => item.id === productId);
        if (item) {
            item.quantity += amount;
            if (item.quantity <= 0) {
                removeFromCart(productId);
            }
        }
        await saveToServer();
    }

    const clearCart = async (syncServer = false) => {
        items.value = [];
        if(syncServer) {
            await saveToServer();
        }else{
            serverId.value = null;
        }
    }

    const syncWithServer = async () =>{
        const authStore = useAuthStore();
        if(!authStore.isAuthenticated || isSyncing) return;

        isSyncing = true;

        try{
            const serverCart = await cartApi.getByUser(authStore.user.id);

            if(serverCart){
                serverId.value = serverCart.id;
                const merged = [...addToCart(serverCart.items || [])];

                for (const localItem of items.value){
                    if(!merged.some(s => s.id === localItem.id)){
                        merged.push(localItem);
                    }
                }
                items.value = merged;
                await cartApi.update(serverId.value, items.value);
            } else{
                const created = await cartApi.create(authStore.user.id, items.value);
                serverId.value = created.id;
            }
        } finally {
            isSyncing = false;
        }
    }

    return { 
        items, 
        totalItems, 
        totalPrice, 
        isAdded,
        addToCart, 
        updateQuantity, 
        removeFromCart, 
        syncWithServer,
        clearCart,  }

},
    {
        persist: {paths: ['items']}
    })