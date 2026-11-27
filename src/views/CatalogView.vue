<script setup>
import VProduct from '@/components/cards/VProduct.vue';
import axios from 'axios';
import SearchInput from '@/components/SearchInput.vue';
import SortSelect from '@/components/form/SortSelect.vue';
import ProductSkeletonLoader from '@/components/skeletons/ProductSkeletonLoader.vue';
import { ref, onMounted, computed, watch } from 'vue';
const items = ref([]);
const showSkeletonLoader = ref(true);
const fetchItems = async () => {
    try {
        const { data } = await axios.get(
            import.meta.env.VITE_API_URL + "/items"
        );
        items.value = data.map((obj) => ({
            ...obj,
            isFavorite: false,
            isAdded: false
        }));

    }
    catch (e) {
        console.log(e)
    }
};

onMounted(async () => {
    await fetchItems();
    showSkeletonLoader.value = false;

});

const searchQuery = ref("")
const sortOptions = [
    { value: "default", label: "По умолчанию" },
    { value: "price-asc", label: "Сначала дешевые" },
    { value: "price-desc", label: "Сначала дорогие" },
    { value: "name-asc", label: "Название (А-Я)" },
    { value: "name-desc", label: "Название (Я-А)" },
]

const sortBy = ref(localStorage.getItem('shop_sort_by') || 'default')

watch(sortBy, (newValue) => {
    localStorage.setItem('shop_sort_by', newValue);
});

const filteredProducts = computed(() => {
    let result = [...items.value];

    if (searchQuery.value.trim() !== "") {
        const query = searchQuery.value.toLowerCase();
        result = result.filter((product) =>
            product.title.toLowerCase().includes(query)
        );
    }

    switch (sortBy.value) {
        case "price-asc":
            result.sort((a, b) => a.price - b.price);
            break;
        case "price-desc":
            result.sort((a, b) => b.price - a.price);
            break;
        case "name-asc":
            result.sort((a, b) =>
                a.title.localeCompare(b.title, ["ru", "en"], {
                    sensitivity: "base",
                }));
            break;
        case "name-desc":
            result.sort((a, b) =>
                b.title.localeCompare(a.title, ["ru", "en"], {
                    sensitivity: "base"
                })
            );

    }
    return result;
}

);
</script>

<template>
    <main class="pt-10">
        <div class="flex flex-col sm:flex-row">
            <h1 class="text-[40px] mb-5">Каталог</h1>
            <div class="flex items-center gap-3 mb-4 flex-col sm:flex-row">
                <div class="w-full sm:w-auto">
                    <SearchInput v-model="searchQuery" placeholder="Поиск по названию..." />
                </div>
                <div class="w-full sm:w-auto">
                    <SortSelect v-model="sortBy" :options="sortOptions" class="w-full"/>
                </div>
            </div>

        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            <template v-if="showSkeletonLoader">
                <ProductSkeletonLoader v-for="value in 10" :key="value" />
            </template>

            <template v-else>
                <v-product v-for="item in filteredProducts" :key="item.id" :product="item"
                    :price="item.price.toLocaleString('ru-Ru')"></v-product>
                <p v-if="filteredProducts.length === 0">Товары не найдены</p>

            </template>
        </div>
    </main>
</template>