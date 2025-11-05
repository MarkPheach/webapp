<script setup>
import { ref } from 'vue';
import purchase from './purchase.vue';
import {useFloating} from '@floating-ui/vue';

const selectedPurchase = ref('Nikka1')
const selectedPrice = ref(0)

const isPurchase = ref(false)
function purchasePopup(name, price) {
    selectedPurchase.value = name
    selectedPrice.value = price
    isPurchase.value = !isPurchase.value
}

</script>

<template>
    <div>

        <!--โปรไฟล์เฟรม 1-->
        <div>
            <button @click="purchasePopup('ProfileFrame1', 30)">
                <v-card
                    class="absolute left-22 top-10 w-[180px] h-[155px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
                    elevation="4">
                    <!-- รูปสินค้า -->
                    <div class="flex justify-center mb-2">
                        <v-img src="public/images/Profileframe1.png" alt="กรอบโปรไฟล์" width="80" height="80" contain
                            class="rounded-full mb-2"></v-img>
                    </div>
                    <!-- ชื่อสินค้า -->
                    <p class="text-center font-bold text-sm mb-2">
                        กรอบโปรไฟล์ : Profile1
                    </p>
                    <!-- ราคา -->
                    <div class="flex items-center justify-center gap-1">
                        <v-icon color="amber" size="22">mdi-cash</v-icon>
                        <span class="font-bold text-base">30</span>
                    </div>
                </v-card>
            </button>
        </div>

        <!--โปรไฟล์เฟรม 2-->
        <div>
            <button @click="purchasePopup('ProfileFrame2', 30)">
                <v-card
                    class="absolute left-88 bottom-30.5 w-[180px] h-[155px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
                    elevation="4">
                    <!-- รูปสินค้า -->
                    <div class="flex justify-center mb-2">
                        <v-img src="public/images/Profileframe1.png" alt="กรอบโปรไฟล์" width="80" height="80" contain
                            class="rounded-full mb-2"></v-img>
                    </div>
                    <!-- ชื่อสินค้า -->
                    <p class="text-center font-bold text-sm mb-2">
                        กรอบโปรไฟล์ : Profile2
                    </p>
                    <!-- ราคา -->
                    <div class="flex items-center justify-center gap-1">
                        <v-icon color="amber" size="22">mdi-cash</v-icon>
                        <span class="font-bold text-base">30</span>
                    </div>
                </v-card>
            </button>
        </div>

        <!--โปรไฟล์เฟรม 3-->
        <div>
            <button @click="purchasePopup('ProfileFrame3', 30)">
                <v-card
                    class="absolute left-152 bottom-71 w-[180px] h-[155px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
                    elevation="4">
                    <!-- รูปสินค้า -->
                    <div class="flex justify-center mb-2">
                        <v-img src="public/images/Profileframe1.png" alt="กรอบโปรไฟล์" width="80" height="80" contain
                            class="rounded-full mb-2"></v-img>
                    </div>
                    <!-- ชื่อสินค้า -->
                    <p class="text-center font-bold text-sm mb-2">
                        กรอบโปรไฟล์ : Profile3
                    </p>
                    <!-- ราคา -->
                    <div class="flex items-center justify-center gap-1">
                        <v-icon color="amber" size="22">mdi-cash</v-icon>
                        <span class="font-bold text-base">30</span>
                    </div>
                </v-card>
            </button>
        </div>

        <!--โปรไฟล์เฟรม 4-->
        <div>
            <button @click="purchasePopup('ProfileFrame4', 30)">
                <v-card
                    class="absolute left-218 bottom-111 w-[180px] h-[155px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
                    elevation="4">
                    <!-- รูปสินค้า -->
                    <div class="flex justify-center mb-2">
                        <v-img src="public/images/Profileframe1.png" alt="กรอบโปรไฟล์" width="80" height="80" contain
                            class="rounded-full mb-2"></v-img>
                    </div>
                    <!-- ชื่อสินค้า -->
                    <p class="text-center font-bold text-sm mb-2">
                        กรอบโปรไฟล์ : Profile4
                    </p>
                    <!-- ราคา -->
                    <div class="flex items-center justify-center gap-1">
                        <v-icon color="amber" size="22">mdi-cash</v-icon>
                        <span class="font-bold text-base">30</span>
                    </div>
                </v-card>
            </button>
        </div>
    <purchase v-if="isPurchase" :type-of-purchase="selectedPurchase" :item-price="selectedPrice" @close="isPurchase = false" />
    </div>
</template>
