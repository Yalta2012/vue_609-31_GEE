<script setup>
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
const sections = [
    ['catalog', 'Каталог', '/public/catalog-icon.svg'],
    ['cart', 'Корзина', '/public/cart-icon.svg'],
    ['favorites', 'Избранное', '/public/like-outline.svg'],
    ['orders', 'Заказы', '/public/orders-icon.svg']
]
</script>

<template>
    <nav class="py-3 border-b border-b-slate-200">
        <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <img src="/public/logo.svg" alt="logo">
                <p>Лучшие цены <br /> в интернет магазинах</p>
            </div>
            <ul class="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-10">
                
                <template v-for="section in sections" :key="section[0]">
                    <li v-if="section[0] !== 'orders' || authStore.isAuthenticated">
                        <RouterLink :to="{ name: section[0] }" class="inline-flex flex-col items-center">
                            <span class="p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition">
                                <img :src="section[2]" :alt="section[1]">
                            </span>
                            {{ section[1] }}
                        </RouterLink>
                    </li>
                </template>

                <li class="flex items-center gap-3">
                    <template v-if="authStore.isAuthenticated">
                        <span class="text-sm font-medium text-slate-700">{{ authStore.user?.fullName }}</span>
                        <button @click="authStore.logout" class="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium
                        text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">Выйти</button>
                    </template>

                    <template v-else>
                        <button @click="authStore.activeModal = 'login'" class="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-700
                        transition cursor-pointer hover:bg-slate-100">Войти</button>

                        <button @click="authStore.activeModal = 'register'" class="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white
                        shadow-sm transition cursor-pointer hover:bg-red-400">Регистрация</button>
                    </template>

                </li>

            </ul>
        </div>

    </nav>
</template>