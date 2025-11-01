<script setup>
import { ref } from 'vue';
import purchase from './purchase.vue';

const selectedPurchase = ref('Nikka1')

const isPurchase = ref(false)
function purchasePopup(name) {
    selectedPurchase.value = name
    isPurchase.value = !isPurchase.value
}
</script>

<template>
    <div>

        <!--โปรไฟล์เฟรม 1-->
        <div>
            <button @click="purchasePopup('Theme1')">
                <v-card
                    class="absolute left-22 top-10 w-[180px] h-[155px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
                    elevation="4">
                    <!-- รูปสินค้า -->
                    <div class="flex justify-center mb-2">
                        <v-img src="public/images/Theme1.jpg" alt="ธีม" width="80" height="80" contain
                            class="rounded-full mb-2"></v-img>
                    </div>
                    <!-- ชื่อสินค้า -->
                    <p class="text-center font-bold text-sm mb-2">
                        ธีม : 9/11
                    </p>
                    <!-- ราคา -->
                    <div class="flex items-center justify-center gap-1">
                        <v-icon color="amber" size="22">mdi-cash</v-icon>
                        <span class="font-bold text-base">911</span>
                    </div>
                </v-card>
            </button>
        </div>

        <!--โปรไฟล์เฟรม 2-->
        <div>
            <button @click="purchasePopup('Theme2')">
                <v-card
                    class="absolute left-88 bottom-30 w-[180px] h-[155px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
                    elevation="4">
                    <!-- รูปสินค้า -->
                    <div class="flex justify-center mb-2">
                        <v-img src="public/images/Theme2.jpg" alt="ธีม" width="80" height="80" contain
                            class="rounded-full mb-2"></v-img>
                    </div>
                    <!-- ชื่อสินค้า -->
                    <p class="text-center font-bold text-sm mb-2">
                        ธีม : Niger
                    </p>
                    <!-- ราคา -->
                    <div class="flex items-center justify-center gap-1">
                        <v-icon color="amber" size="22">mdi-human</v-icon>
                        <span class="font-bold text-base">ดำ</span>
                    </div>
                </v-card>
            </button>
        </div>

        <!--โปรไฟล์เฟรม 3-->
        <div>
            <button @click="purchasePopup('Theme3')">
                <v-card
                    class="absolute left-152 bottom-70 w-[180px] h-[155px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
                    elevation="4">
                    <!-- รูปสินค้า -->
                    <div class="flex justify-center mb-2">
                        <v-img src="public/images/Theme3.jpg" alt="ธีม" width="80" height="80" contain
                            class="rounded-full mb-2"></v-img>
                    </div>
                    <!-- ชื่อสินค้า -->
                    <p class="text-center font-bold text-sm mb-2">
                        ธีม : แมว
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
            <button @click="purchasePopup('Theme4')">
                <v-card
                    class="absolute left-218 bottom-110 w-[180px] h-[155px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
                    elevation="4">
                    <!-- รูปสินค้า -->
                    <div class="flex justify-center mb-2">
                        <v-img src="public/images/Theme4.jpg" alt="ธีม" width="80" height="80" contain
                            class="rounded-full mb-2"></v-img>
                    </div>
                    <!-- ชื่อสินค้า -->
                    <p class="text-center font-bold text-sm mb-2">
                        ธีม : แมว
                    </p>
                    <!-- ราคา -->
                    <div class="flex items-center justify-center gap-1">
                        <v-icon color="amber" size="22">mdi-cash</v-icon>
                        <span class="font-bold text-base">30</span>
                    </div>
                </v-card>
            </button>
        </div>
        <purchase v-if="isPurchase" :type-of-purchase="selectedPurchase" @close="isPurchase = false" />
    </div>
</template>