<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCart } from '../../stores/cart'
import { useChibi } from '../../stores/chibi'
import { useThemeStore } from '../../stores/theme'
import { useProfileFrameStore } from '../../stores/profileframe'

const { carts } = storeToRefs(useCart())

const { typeOfPurchase, itemPrice, state, image, type } = defineProps({
  typeOfPurchase: { type: String, default: 'NULLA' },
  itemPrice: { type: Number, default: 0 },
  state: { type: String, default: 'EROR' },
  image: { type: String, default: '' },
  type: { type: String, default: 'EROR' },
})

// ✅ ประกาศ default image ที่นี่แทน
const defaultImage = new URL('../../assets/Eror.jpg', import.meta.url).href

const isAccept = ref(false)
const emit = defineEmits(['close'])

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

// 🧩 ยืนยันการซื้อ
function confirmPurchase() {
  if (type === 'chibi') {
    const store = useChibi()
    const found = store.chibis.find((item) => item.name === typeOfPurchase)
    if (found) found.state = 'เป็นเจ้าของ'
  } 
  else if (type === 'theme') {
    const store = useThemeStore()
    const found = store.themes.find((item) => item.name === typeOfPurchase)
    if (found) found.state = 'เป็นเจ้าของ '
  }
  else if (type === 'Profileframe') {
    const store = useProfileFrameStore()
    const found = store.ProfileFrame.find((item) => item.name === typeOfPurchase)
    if (found) found.state = 'เป็นเจ้าของ '
  }

  emit('close')
}
</script>

<template>
  <div>
    <div
      class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-2xl w-[380px] h-[350px] flex flex-col items-center p-6 transition-all duration-300 z-40"
    >
      <h2 class="text-xl font-bold text-gray-800 mb-2">🛒 รายการสั่งซื้อ</h2>

      <!-- ✅ ใช้ตัวแปร defaultImage -->
      <img
        :src="image || defaultImage"
        alt="Item Image"
        class="w-20 object-cover rounded-lg mb-2"
      />

      <div class="w-full border-b border-gray-300 mb-4"></div>

      <p class="text-base text-gray-700 mb-1">
        <span class="font-semibold text-blue-700">สินค้า:</span>
        {{ typeOfPurchase }}
      </p>

      <p class="text-base text-gray-700 mb-4">
        <span class="font-semibold text-amber-600">ราคา:</span>
        {{ itemPrice }} coins
      </p>

      <button
        @click="acceptShow"
        class="mt-2 w-3/4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg hover:opacity-90 transition-all"
      >
        ชำระเงิน
      </button>

      <div v-if="carts.length === 0" class="mt-4 text-gray-500 text-sm italic">
        ไม่มีรายการไอเท็มในขณะนี้
      </div>

      <button
        @click="closePopup"
        class="absolute top-2 right-3 text-gray-400 hover:text-black transition"
        aria-label="Close popup"
      >
        ✕
      </button>
    </div>

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
              @click="confirmPurchase"
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
