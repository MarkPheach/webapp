<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useCart } from '../../stores/cart';

const { carts } = storeToRefs(useCart());
const totalPrice = ref(sumPrice());
const isAccpet = ref(false);

function sumPrice() {
    let sum = 0;
    carts.value.forEach(cart => {
        sum += parseFloat(cart.price);
    });
    return sum;
}
function acceptShow() {
    isAccpet.value = !isAccpet.value
}
</script>

<template>
    <div class="min-h-150 min-w-150 bg-sky-100 rounded-2xl shadow-2xl flex flex-col items-center fixed left-125 top-25">

        <!-- popUp สำหรับยืนยันการโพส -->
        <div v-if="isAccpet"
            class="min-h-100 min-w-100 bg-sky-100 rounded-2xl shadow-2xl flex flex-col justify-center items-center fixed left-125 top-25 z-50">
            <h1>แน่ใจ๊?</h1>
            <button @click="acceptShow"
                class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md">
                ยืนยันการชำระเงิน
            </button>
            <button @click="acceptShow"
                class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md">
                ยกเลิก
            </button>
        </div>

        <!-- วนลูปในตัวแปร 'carts' -->
        <div v-for="cart in carts" :key="cart.id" class="w-9/10 my-4 p-3 bg-white rounded-lg shadow-md">
            <h2 class="text-xl font-bold text-sky-700">{{ cart.name }} ประเภท: {{ cart.detail }}</h2>
            <p class="text-sm mt-1">ราคา : {{ cart.price }}</p>

            <button
                class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md">
                เอาออกจากตะกร้า
            </button>

        </div>
        <p class="text-sm mt-1">ราคารวม : {{ totalPrice }}</p>
        <button
            @click="acceptShow"
            class="px-4 py-2 text-sm font-medium bg-red-500 rounded-lg hover:bg-red-600 transition duration-150 shadow-md">
            ชำระเงิน
        </button>

        <!-- ตรวจสอบความยาวของ 'carts' -->
        <div v-if="carts.length === 0">
            <p>ไม่มีรายการไอเท็มในขณะนี้</p>
        </div>
    </div>
</template>