<script setup>
import { ref, onMounted } from 'vue'
import purchase from './purchase.vue'
import { useChibi } from '../../stores/chibi.js'

const chibiStore = useChibi()

const selectedPurchase = ref('')
const selectedPrice = ref(0)
const currentState = ref('')
const selectedImage = ref('')
const selectedtype = ref('')
const isPurchase = ref(false)

// 📦 โหลดข้อมูลจาก Firestore เมื่อ component โหลด
onMounted(() => {
  chibiStore.fetchChibis()
})

function purchasePopup(chibi) {
  selectedPurchase.value = chibi.chibi_name
  selectedPrice.value = chibi.price
  currentState.value = chibi.state
  selectedImage.value = chibi.gif
  selectedtype.value = chibi.type
  isPurchase.value = true
}
</script>

<template>
  <div class="flex flex-wrap gap-20">
    <div v-for="chibi in chibiStore.chibis" :key="chibi.id">
      <button @click="purchasePopup(chibi)">
        <v-card
          class="absolute left-22 top-10 w-[180px] h-[180px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
          elevation="4">
          <div class="flex justify-center mb-2">
            <v-img :src="chibi.gif" alt="chibi" width="80" height="80" contain
                class="rounded-full mb-2"></v-img>
            </div>
          <p class="text-center font-bold text-sm mb-2">{{ chibi.chibi_name }}</p>
          <div class="flex items-center justify-center gap-1">
            <v-icon color="amber" size="22">mdi-cash</v-icon>
            <span class="font-bold text-base">{{ chibi.price }}</span>
          </div>
          <div>{{ chibi.state }}</div>
        </v-card>
      </button>
    </div>

    <!-- Popup -->
    <purchase
      v-if="isPurchase"
      :type-of-purchase="selectedPurchase"
      :item-price="selectedPrice"
      :image="selectedImage"
      :state="currentState"
      :type="selectedtype"
      @close="isPurchase = false"
    />
  </div>
</template>
