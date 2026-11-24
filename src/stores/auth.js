import { defineStore } from "pinia";
import { ref, computed } from 'vue';
import { authApi } from "@/api/auth";
import { useCartStore } from "./cart";
import { useFavoritesStore } from "./favorites";
import router from "@/router";

export const useAuthStore = defineStore('auth', () => {
    const token = ref(null);
    const user = ref(null);
    const activeModal = ref(null);

    const isAuthenticated = computed(() => Boolean(token.value));


    const syncUserData = async () => {
        const cartStore = useCartStore();
        const favoritesStore = useFavoritesStore();
        await Promise.all([
            cartStore.syncWithServer(),
            favoritesStore.syncWithServer()
        ]);
    }

    const register = async (fullName, email, password) => {
        const res = await authApi.register(fullName, email, password);
        token.value = res.token;
        user.value = res.data;
        await syncUserData();
    }

    const login = async (email, password) => {
        const res = await authApi.login(email, password);
        token.value = res.token;
        user.value = res.data;
        await syncUserData();
    }

    const checkAuth = async () => {
        if (!token.value) return;

        try {
            user.value = await authApi.getMe();
            await syncUserData();
        } catch {
            logout();
        }
    }

    const logout = () =>{
        token.value = null;
        user.value = null;
        useCartStore().clearCart();
        useFavoritesStore().clearCart();
        router.push({name: 'catalog'});
    }

    return {token, user, isAuthenticated, register, login,checkAuth}
}, {
    persist:{
        paths: ['token', 'user']
    }
})