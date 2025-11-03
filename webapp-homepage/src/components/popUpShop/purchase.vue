<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCart } from '../../stores/cart'

// ดึงข้อมูลตะกร้าสินค้า
const { carts } = storeToRefs(useCart())

// props จาก parent
const { typeOfPurchase, itemPrice } = defineProps({
  typeOfPurchase: { type: String, default: 'NULLA' },
  itemPrice: { type: Number, default: 0 },
})

// ควบคุม popup การยืนยัน
const isAccept = ref(false)
const emit = defineEmits(['close'])

// รวมราคารวม
function sumPrice() {
  let sum = 0
  carts.value.forEach((cart) => {
    sum += parseFloat(cart.price)
  })
  return sum
}
const totalPrice = ref(sumPrice())

function acceptShow() {
  isAccept.value = !isAccept.value
}

function closePopup() {
  emit('close')
}
</script>

<template>
  <!-- ✅ ห่อทั้งหมดไว้ใน div เดียว -->
  <div>
    <!-- หน้าต่างหลักของ Popup -->
    <div
      class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-2xl w-[380px] h-[180px] flex flex-col items-center p-6 transition-all duration-300 z-40"
    >
      <!-- ชื่อรายการ -->
      <h2 class="text-xl font-bold text-gray-800 mb-2">🛒 รายการสั่งซื้อ</h2>

      <div class="w-full border-b border-gray-300 mb-4"></div>

      <!-- แสดงชื่อ item -->
      <p class="text-base text-gray-700 mb-1">
        <span class="font-semibold text-blue-700">สินค้า:</span>
        {{ typeOfPurchase }}
      </p>

      <!-- แสดงราคา -->
      <p class="text-base text-gray-700 mb-4">
        <span class="font-semibold text-amber-600">ราคา:</span>
        {{ itemPrice }} coins
      </p>

      <!-- ปุ่มชำระเงิน -->
      <button
        @click="acceptShow"
        class="mt-2 w-3/4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg hover:opacity-90 transition-all"
      >
        ชำระเงิน
      </button>

      <!-- ไม่มีสินค้า -->
      <div v-if="carts.length === 0" class="mt-4 text-gray-500 text-sm italic">
        ไม่มีรายการไอเท็มในขณะนี้
      </div>

      <!-- ปุ่มปิด -->
      <button
        @click="closePopup"
        class="absolute top-2 right-3 text-gray-400 hover:text-black transition"
        aria-label="Close popup"
      >
        ✕
      </button>
    </div>

    <!-- Popup ยืนยันการชำระเงิน -->
    <transition name="fade">
      <div
        v-if="isAccept"
        class="fixed inset-0 flex justify-center items-center bg-black/40 z-50"
      >
        <div
          class="bg-white rounded-3xl shadow-2xl p-8 text-center w-[360px] animate-scale-in"
        >
          <h1 class="text-xl font-bold mb-4 text-gray-800">
            ยืนยันการเลือกซื้อ:
            <span class="text-blue-600">{{ typeOfPurchase }}</span>
          </h1>

          <p class="text-gray-600 mb-6">
            คุณแน่ใจหรือไม่ว่าต้องการซื้อสินค้านี้?
          </p>

          <div class="flex justify-center gap-4">
            <button
              @click="closePopup"
              class="px-6 py-2 text-sm font-medium bg-green-500 text-black rounded-lg hover:bg-green-600 transition duration-150 shadow-md"
            >
              ยืนยัน
            </button>
            <button
              @click="acceptShow"
              class="px-6 py-2 text-sm font-medium bg-red-500 text-black rounded-lg hover:bg-red-600 transition duration-150 shadow-md"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes scale-in {
  from {
    transform: scale(0.9);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scale-in {
  animation: scale-in 0.25s ease-out;
}
</style>
