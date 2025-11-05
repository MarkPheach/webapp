<script setup>
import { ref } from 'vue';
import purchase from './purchase.vue';
import { useThemeStore } from '../../stores/theme';
const themeStore = useThemeStore();

const selectedPurchase = ref('Nikka1')
const selectedPrice = ref(0)
const currentState = ref('EROR')
const selectedImage = ref('../../assets/Eror.jpg')
const selectedtype = ref('EROR')
const isPurchase = ref(false)

function purchasePopup(name, price, state, src, type) {
    selectedPurchase.value = name
    selectedPrice.value = price
    currentState.value = state
    selectedImage.value = src
    selectedtype.value = type
    isPurchase.value = !isPurchase.value
}

</script>

<template>
    <div>
        <!--โปรไฟล์เฟรม 1-->
        <div>
            <button @click="purchasePopup(themeStore.themes[0].name, themeStore.themes[0].price, themeStore.themes[0].state, themeStore.themes[0].src, themeStore.themes[0].type)">
                <v-card
                    class="absolute left-22 top-10 w-[180px] h-[200px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
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
                        <span class="font-bold text-base">{{ themeStore.themes[0].price }}</span>
                    </div>
                    <div>
                        {{ themeStore.themes[0].state }}
                    </div>
                </v-card>
            </button>
        </div>

        <!--โปรไฟล์เฟรม 2-->
        <div>
            <button @click="purchasePopup(themeStore.themes[1].name, themeStore.themes[1].price, themeStore.themes[1].state, themeStore.themes[1].src, themeStore.themes[1].type)">
                <v-card
                    class="absolute left-88 bottom-42 w-[180px] h-[200px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
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
                        <v-icon color="amber" size="22">mdi-cash</v-icon>
                        <span class="font-bold text-base">{{ themeStore.themes[1].price }}</span>
                    </div>
                    <div>
                        {{ themeStore.themes[1].state }}
                    </div>
                </v-card>
            </button>
        </div>

        <!--โปรไฟล์เฟรม 3-->
        <div>
            <button @click="purchasePopup(themeStore.themes[2].name, themeStore.themes[2].price, themeStore.themes[2].state, themeStore.themes[2].src, themeStore.themes[2].type)">
                <v-card
                    class="absolute left-152 bottom-94 w-[180px] h-[200px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
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
                        <span class="font-bold text-base">{{ themeStore.themes[2].price }}</span>
                    </div>
                    <div>
                        {{ themeStore.themes[2].state }}
                    </div>
                </v-card>
            </button>
        </div>

        <!--โปรไฟล์เฟรม 4-->
        <div>
            <button @click="purchasePopup(themeStore.themes[3].name, themeStore.themes[3].price, themeStore.themes[3].state, themeStore.themes[3].src, themeStore.themes[3].type)">
                <v-card
                    class="absolute left-218 bottom-145.5 w-[180px] h-[200px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
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
                        <span class="font-bold text-base">{{ themeStore.themes[3].price }}</span>
                    </div>
                    <div>
                        {{ themeStore.themes[3].state }}
                    </div>
                </v-card>
            </button>
        </div>
        <purchase v-if="isPurchase" :type-of-purchase="selectedPurchase" :item-price="selectedPrice" :image="selectedImage" :state="currentState" :type="selectedtype" @close="isPurchase = false" />
    </div>
</template>