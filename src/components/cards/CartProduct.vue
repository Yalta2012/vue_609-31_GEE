<script setup>
import { useFavoritesStore } from '@/stores/favorites';
import { useCartStore } from '@/stores/cart';

const favoriteStore = useFavoritesStore();
const cartStore = useCartStore();

defineProps({
    product: Object
});

</script>

<template>
    <div class="p-5 bg-slate-100 rounded-4xl flex items-start justify-between gap-10">
        <div class="flex gap-4 flex-1">
            <div class="w-30 h-30 overflow-hidden">
                <img :src="product.imageUrl" alt="product image" class="w-full h-full object-cover">
            </div>
            <div class="pt-2">
                <h3 class="tex-xl font-semibold mb-3">
                    {{ product.title }}
                </h3>
                <div class="flex gap-3 items-center">
                    <button @click="useFavoritesStore.toggleFavorite(product)"
                        class="rounded-4xl bg-white shadow p-3 cursor-pointer hover:scale-110 transition">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 21.65C11.69 21.65 11.39 21.61 11.14 21.52C7.32 20.21 1.25 15.56 1.25 8.69C1.25 5.19 4.08 2.35 7.56 2.35C9.25 2.35 10.83 3.01 12 4.19C13.17 3.01 14.75 2.35 16.44 2.35C19.92 2.35 22.75 5.2 22.75 8.69C22.75 15.57 16.68 20.21 12.86 21.52C12.61 21.61 12.31 21.65 12 21.65ZM7.56 3.85C4.91 3.85 2.75 6.02 2.75 8.69C2.75 15.52 9.32 19.32 11.63 20.11C11.81 20.17 12.2 20.17 12.38 20.11C14.68 19.32 21.26 15.53 21.26 8.69C21.26 6.02 19.1 3.85 16.45 3.85C14.93 3.85 13.52 4.56 12.61 5.79C12.33 6.17 11.69 6.17 11.41 5.79C10.48 4.55 9.08 3.85 7.56 3.85Z"
                                fill="#263141" />
                        </svg>
                    </button>

                    <button @click="cartStore.removeFromCart(product.id)"
                        class="rounded-4xl bg-white shadow p-3 cursor-pointer hover:scale-110 transition">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.5 4.98335C14.725 4.70835 11.9333 4.56668 9.15 4.56668C7.5 4.56668 5.85 4.65001 4.2 4.81668L2.5 4.98335"
                                fill="white" />
                            <path
                                d="M17.5 4.98335C14.725 4.70835 11.9333 4.56668 9.15 4.56668C7.5 4.56668 5.85 4.65001 4.2 4.81668L2.5 4.98335"
                                stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M7.08325 4.14166L7.26659 3.04999C7.39992 2.25832 7.49992 1.66666 8.90825 1.66666H11.0916C12.4999 1.66666 12.6083 2.29166 12.7333 3.05832L12.9166 4.14166"
                                stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M15.7084 7.61667L15.1667 16.0083C15.0751 17.3167 15.0001 18.3333 12.6751 18.3333H7.32508C5.00008 18.3333 4.92508 17.3167 4.83341 16.0083L4.29175 7.61667"
                                stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.6084 13.75H11.3834" stroke="white" stroke-width="1.25" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M7.91675 10.4167H12.0834" stroke="white" stroke-width="1.25" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>

                    </button>

                </div>
            </div>
        </div>

        <div class="pt-2">
            <b class="text-xl">{{ product.price.toLocaleString("ru-RU") }}₽</b>
        </div>

        <div class="rounded-4xl bg-white p-1 flex items-center">
            <button class="cursor-pointer w-10 h-10 font-bold flex items-center justify-center rounded-4xl"
                @click="cartStore.updateQuantity(product.id, -1)">
                -
            </button>

            <span class="w-12 text-center">{{ product.quatity }}</span>

            <button class="cursor-pointer w-10 h-10 font-bold flex item-center justify-center rounded-4xl"
                @click="cartStore.updateQuantity(product.id, 1)">
                +
            </button>
        </div>
    </div>
</template>