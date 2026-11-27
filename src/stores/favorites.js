import { defineStore } from "pinia";
import { ref } from "vue";
import { favoritesApi } from "@/api/favorites";
import { useAuthStore } from "./auth";

export const useFavoritesStore = defineStore('favorites', () => {
    const items = ref([]);
    const serverId = ref(null);
    let isSyncing = false;

    const toggleFavorite = async (product) => {

        const index = items.value.findIndex( p => p.id === product.id);
        if (index === -1){
            items.value.push(product);
        }
        else{
            items.value.splice(index, 1);
        }
        await saveToServer();
    }

    const isFavorite = (productId) => {
        return items.value.some( product => product.id === productId);
    }

    const saveToServer = async() => {
        const authStore = useAuthStore();
        if(!authStore.isAuthenticated) return;

        if(serverId.value){
            await favoritesApi.update(serverId.value, items.value);
        } else{
            const created = await favoritesApi.create(authStore.user.id, items.value);
            serverId.value = created.id;
        }
    }

    const syncWithServer = async () => {
        const authStore = useAuthStore();
        if(!authStore.isAuthenticated || isSyncing) return;

        isSyncing = true;

        try{
            const serverFavs = await favoritesApi.getByUser(authStore.user.id);

            if(serverFavs){
                serverId.value = serverFavs.id;
                const merged = [...(serverFavs.items || [])];

                for(const localItem of items.value){
                    if(!merged.some(s=>s.id === localItem.id)){
                        merged.push(localItem);
                    }
                }

                items.value = merged;
                await favoritesApi.update(serverId.value, items.value);
            }
            else if (items.value.length >0 ){
                const created = await favoritesApi.create(authStore.user.id, items.value);
                serverId.value = created.id;
            }
        }
        finally {
            isSyncing = false;
        }
    }

    const clearFavorites = () => {
        items.value = [];
        serverId.value = null;
    }
    return {items, toggleFavorite, isFavorite, syncWithServer, clearFavorites }
}, 
{
    persist: true
})