<script setup>
import { onMounted } from 'vue';
import { useOrderStore } from '@/stores/orders';
import OrderCardSkeletonLoader from '@/components/skeletons/OrderCardSkeletonLoader.vue';
import OrderCard from '@/components/cards/OrderCard.vue';
import { RouterLink } from 'vue-router';

const ordersStore = useOrderStore();

onMounted(() =>{
    ordersStore.fetchOrders();
});
</script>

<template>
    <main class="pt-10">
        <h1 class="text-[40px] font-bold mb-5">Заказы</h1>
        <div v-if="ordersStore.isLoading">
            <template
            v-for="value in 3"
            :key="value"
            >
                <order-card-skeleton-loader/>
            </template>
        </div>

        <div
            v-else-if="ordersStore.orders.length === 0"
            class="flex flex-col gap-5"
            >
            <p>У вас пока нет оформленных заказов</p>
            <router-link
                to="/"
                class="underline">
                Перейти в каталог
            </router-link>
        </div>

        <div
            v-else
            class="space-y-6"
            >
            <order-card
                v-for="order in ordersStore.orders"
                :key="order.id"
                :order="order"
            />
        </div>
    </main>
</template>