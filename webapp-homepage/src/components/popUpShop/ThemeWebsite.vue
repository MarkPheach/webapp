<script setup>
import { ref, onMounted } from 'vue';
import purchase from './purchase.vue';
import { useTheme } from '../../stores/theme.js';

const themeStore = useTheme();

const selectedPurchase = ref('');
const selectedPrice = ref(0);
const currentState = ref('');
const selectedImage = ref('');
const selectedtype = ref('');
const isPurchase = ref(false);

// ✅ โหลดข้อมูลทันที
onMounted(() => {
  themeStore.fetchThemes();
});

function purchasePopup(item) {
  selectedPurchase.value = item.name;
  selectedPrice.value = item.price;
  currentState.value = item.state;
  selectedImage.value = item.src;
  selectedtype.value = item.type;
  isPurchase.value = true;
}
</script>


<template>
  <div v-if="themeStore.themes.length > 0">

    <div v-for="(item, index) in themeStore.themes" :key="item.id">
      <button @click="purchasePopup(item)">
        <v-card
          class="absolute w-[180px] h-[200px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
          :class="[
            index === 0 ? 'left-22 top-10' :
            index === 1 ? 'left-88 bottom-42' :
            index === 2 ? 'left-152 bottom-94' :
            index === 3 ? 'left-218 bottom-145.5' : ''
          ]"
          elevation="4">

          <div class="flex justify-center mb-2">
            <v-img :src="item.src" width="80" height="80" contain class="rounded-full mb-2"></v-img>
          </div>

          <p class="text-center font-bold text-sm mb-2">
            {{ item.name }}
          </p>

          <div class="flex items-center justify-center gap-1">
            <v-icon color="amber" size="22">mdi-cash</v-icon>
            <span class="font-bold text-base">{{ item.price }}</span>
          </div>

          <div>
            {{ item.state }}
          </div>

        </v-card>
      </button>
    </div>

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
