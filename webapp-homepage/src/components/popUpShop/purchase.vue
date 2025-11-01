<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useCart } from '../../stores/cart';

const { carts } = storeToRefs(useCart());
const totalPrice = ref(sumPrice());
const isAccpet = ref(false);

const { typeOfPurchase } = defineProps({
  typeOfPurchase: { type: String, default: 'NULLA' }
})

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

const emit = defineEmits(['close'])
function closePopup() {
  emit('close')
}

</script>

<template>
    <div class="min-h-75 min-w-75 bg-sky-100 rounded-2xl shadow-2xl flex flex-col items-center fixed left-150 top-50">

        <!-- popUp สำหรับยืนยันการโพส -->
        <div v-if="isAccpet"
            class="min-h-100 min-w-100 bg-sky-100 rounded-2xl shadow-2xl flex flex-col justify-center items-center fixed left-140 top-30 z-10">
            <h1>ยืนยันการเลือกซื้อ : {{ typeOfPurchase }}</h1>
            <button @click="closePopup"
                class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md">
                ยืนยันการชำระเงิน
                <!-- ใส่ฟังก์ชันการซื้อตรงนี้ -->
            </button>
            <button @click="closePopup"
                class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md">
                ยกเลิก
            </button>
        </div>

        <p class="text-sm mt-1">ราคารวม : {{ totalPrice }}</p>
        <button
            @click="acceptShow"
            class="min-h-10 min-w-70 text-sm font-medium bg-red-500 rounded-lg hover:bg-red-600 transition duration-150 shadow-md">
            ชำระเงิน
        </button>
        <!-- ตรวจสอบความยาวของ 'carts' -->
        <div v-if="carts.length === 0">
            <p>ไม่มีรายการไอเท็มในขณะนี้</p>
        </div>
    </div>
</template>