<script setup>
import { ref, onMounted } from 'vue';
import purchase from './purchase.vue';
import { useProfileFrameStore } from '../../stores/profileframe.js';

const profileFrameStore = useProfileFrameStore();
onMounted(() => profileFrameStore.fetchProfileFrames());

const selectedPurchase = ref('');
const selectedPrice = ref(0);
const currentState = ref('');
const selectedsrc = ref('');
const selectedtype = ref('');
const isPurchase = ref(false);

function purchasePopup(item) {
  selectedPurchase.value = item.name;
  selectedPrice.value = item.price;
  currentState.value = item.state;
  selectedsrc.value = item.src;
  selectedtype.value = item.type;
  isPurchase.value = true;
}
</script>


<template>
  <div v-if="profileFrameStore.profileFrames.length > 0">

    <div v-for="(item, index) in profileFrameStore.profileFrames" :key="item.id">
      <button @click="purchasePopup(item)">
        <v-card
          class="absolute w-[180px] h-[200px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center
                 hover:scale-105 transition"
          :class="[
            index === 0 ? 'left-22 top-10' :
            index === 1 ? 'left-88 bottom-41.5' :
            index === 2 ? 'left-152 bottom-93' :
            index === 3 ? 'left-218 bottom-144.5' : ''
          ]"
          elevation="4">

          <div class="flex justify-center mb-2">
            <v-img :src="item.src" width="80" height="80" contain class="rounded-full mb-2"></v-img>
          </div>

          <p class="text-center font-bold text-sm mb-2">
            กรอบโปรไฟล์ : {{ item.name }}
          </p>

          <div class="flex items-center justify-center gap-1">
            <v-icon color="amber" size="22">mdi-cash</v-icon>
            <span class="font-bold text-base">{{ item.price }}</span>
          </div>

          <div>{{ item.state }}</div>

        </v-card>
      </button>
    </div>

    <Transition name="fade">
      <purchase
        v-if="isPurchase"
        :type-of-purchase="selectedPurchase"
        :item-price="selectedPrice"
        :image="selectedsrc"
        :state="currentState"
        :type="selectedtype"
        @close="isPurchase = false"
      />
    </Transition>
  </div>
</template>


<style scoped>
/* ✅ Transition สไตล์เดียวกับ inventory (นุ่ม ลื่น เหมือนเปลี่ยนหมวดหมู่) */
.smooth-enter-active,
.smooth-leave-active {
  transition: all 0.45s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.smooth-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}

.smooth-leave-to {
  opacity: 0;
  transform: translateY(-15px) scale(0.98);
}
</style>