<script setup>
const sections = [
    ['catalog', 'Каталог', '/public/catalog-icon.svg'],
    ['cart', 'Корзина', '/public/cart-icon.svg'],
    ['favorites', 'Избранное', '/public/like-outline.svg'],
    ['orders', 'Заказы', '/public/orders-icon.svg']
]
</script>

<template>
    <nav class="py-3 border-b border-b-slate-200">
        <div class="flex item-center justify-between">
            <div class="flex item-center gap-3">
                <img src="/public/logo.svg" alt="logo">
                <p>Лучшие цены <br /> в интернет магазинах</p>
            </div>
            <ul class="flex gap-10">
                <li v-for="section in sections">
                    <RouterLink :to="{ name: section[0] }" class="inline-flex flex-col items-center">
                        <span class=" p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition">
                            <img :src="section[2]" alt="cart-icon">
                        </span>
                        {{ section[1] }}
                    </RouterLink>
                </li>
            </ul>
        </div>

    </nav>
</template>