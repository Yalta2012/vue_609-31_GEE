<script setup>
import { ref, reactive } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useOrderStore } from '@/stores/orders';
import CartProduct from '@/components/cards/CartProduct.vue';
import VInput from '@/components/form/VInput.vue';
import RadioCard from '@/components/form/RadioCard.vue';

const cartStore = useCartStore();
const router = useRouter();
const authStore = useAuthStore();
const ordersStore = useOrderStore();

const deliveryMethod = ref("pickup"); // pickup | courier
const address = reactive({
    city: "",
    street: "",
    apartment: "",
    comment: "",
});

const validationError = ref("");
const isSubmitting = ref(false);

const validateForm = () => {
    validationError.value = "";
    if (deliveryMethod.value === "courier") {
        if (!address.city.trim() || !address.street.trim()) {
            validationError.value = "Пожалуйста, укажите город и улицу для доставки курьером";
            return false;
        }
    }
    return true;
}

const processOrderCreation = async () => {
    if (!validateForm()) return;

    isSubmitting.value = true;

    try {
        const deliveryDetails = {
            delivery: {
                method: deliveryMethod.value,
                methodLabel:
                    deliveryMethod.value === "pickup"
                        ? "Самовывоз из магазина"
                        : "Доставка курьером",
                fullAddress:
                    deliveryMethod.value === "courier"
                        ? `${address.city}, ${address.street} ${address.apartment ? ",кв + " + address.apartment : ""}${address.comment ? " (" + address.comment + ")" : ""}`
                        : "Пункт самовывоза"
            },
        };

        const createdOrder = await ordersStore.createOrder(deliveryDetails);
        cartStore.clearCart();
        router.push({ name: "orders" });
    } catch (err) {
        validationError.value = err.message;
    } finally {
        isSubmitting.value = false;
    }
};

const handleOrderClick = () => {
    if (!validateForm()) return;
    if (authStore.isAuthenticated) {
        processOrderCreation();
    } else {
        authStore.activeModal = "register";
    }
};
</script>

<template>
    <main class="pt-10">
        <h1 class="text-[40px]" font-bold md-5>Корзина</h1>
        <div v-if="cartStore.items.length === 0" class="flex flex-col gap-5">
            <p>Корзина пуста</p>
            <RouterLink to="/" class="underline">Перейти к покупкам</RouterLink>
        </div>

        <div class="flex flex-col gap-5 items-start lg:flex-row">
            <div class="flex w-full min-w-0 flex-[2] flex-col gap-5">
                <cart-product v-for="item in cartStore.items" :key="item.id" :product="item"></cart-product>
            </div>
            <div class="w-full p-5 bg-slate-100 rounded-4xl flex flex-col gap-3 flex-1" >
                <h2 class="text-lg font-bold text-slate-800">Способ получения</h2>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <radio-card label-text="Самовывоз из магазина" description="Бесплатно, сегодня"
                        v-model="deliveryMethod" value="pickup" />
                    <radio-card label-text="Доставка курьером" description="По указанному адресу"
                        v-model="deliveryMethod" value="courier" />
                </div>

                <div v-if="deliveryMethod === 'courier'" class="space-y-4 border-t border-slate-100">
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <v-input label-text="Город *" placeholder="Например, Сургут" v-model="address.city" />
                        <v-input label-text="Улица и дом" placeholder="ул. Ленина, д. 10" v-model="address.street" />
                    </div>
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <v-input label-text="Квартира / Офис" placeholder="кв. 42" v-model="address.apartment" />
                        <v-input label-text="Комментарий курьеру" placeholder="Код домофона, подъезд"
                            v-model="address.comment" />
                    </div>
                </div>

                <p v-if="validationError" class="mb-2 tex-xs text-red-600">{{ validationError }}</p>
                <button @click="handleOrderClick" :disabled="isSubmitting"
                    class="p-4 bg-red-500 rounded-2xl text-white font-medium cursor-pointer hover:bg-red-400 disabled:bg-red-200 transition">
                    {{ isSubmitting ? "Оформление..." : "Оформить заказ" }}
                </button>
                <div class="flex justify-between items-end">
                    <div>
                        <h4 class="text-md font-bold">Итого:</h4>
                        <p>Товаров ({{ cartStore.totalItems }})</p>
                    </div>
                    <b class="text-xl">
                        {{ cartStore.totalPrice.toLocaleString("ru-RU") }}
                    </b>
                </div>
            </div>
        </div>
    </main>
</template>