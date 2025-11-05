<script setup>
import { ref } from 'vue';
import purchase from './purchase.vue';
import { useChibi } from '../../stores/chibi.js';
const chibiStore = useChibi();


const selectedPurchase = ref('Nikka1')
const selectedPrice = ref(0)
const currentState = ref('EROR')
const selectedImage = ref('../../assets/Eror.jpg')
const selectedtype = ref('EROR')
const isPurchase = ref(false)

function purchasePopup(name, price, state, image, type) {
    selectedPurchase.value = name
    selectedPrice.value = price
    currentState.value = state
    selectedImage.value = image
    selectedtype.value = type
    isPurchase.value = !isPurchase.value
}

</script>

<template>
    <div>
        <!--โปรไฟล์เฟรม 1-->
        <div>
            <button @click="purchasePopup(chibiStore.chibis[0].name, chibiStore.chibis[0].price, chibiStore.chibis[0].state, chibiStore.chibis[0].image, chibiStore.chibis[0].type)"
>
                <v-card
                    class="absolute left-22 top-10 w-[180px] h-[180px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
                    elevation="4">
                    <!-- รูปสินค้า -->
                    <div class="flex justify-center mb-2">
                        <v-img src="public/chibi/Mutsumi.gif" alt="จิบิ" width="80" height="80" contain
                            class="rounded-full mb-2"></v-img>
                    </div>
                    <!-- ชื่อสินค้า -->
                    <p class="text-center font-bold text-sm mb-2">
                        Mutsumi With Clubcumber
                    </p>

                    <!-- ราคา -->
                    <div class="flex items-center justify-center gap-1">
                        <v-icon color="amber" size="22">mdi-cash</v-icon>
                        <span class="font-bold text-base">{{ chibiStore.chibis[0].price }}</span>
                    </div>
                    <div>
                        {{ chibiStore.chibis[0].state }}
                    </div>
                </v-card>
            </button>
        </div>

        <!--โปรไฟล์เฟรม 2-->
        <div>
            <button @click="purchasePopup(chibiStore.chibis[1].name, chibiStore.chibis[1].price, chibiStore.chibis[1].state, chibiStore.chibis[1].image, chibiStore.chibis[1].type)">
                <v-card
                    class="absolute left-88 bottom-36 w-[180px] h-[180px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
                    elevation="4">
                        <!-- รูปสินค้า -->
                        <div class="flex justify-center mb-2">
                            <v-img src="public/chibi/adventer.gif" alt="จิบิ" width="80" height="80"
                                contain class="rounded-full mb-2"></v-img>
                        </div>
                        <!-- ชื่อสินค้า -->
                        <p class="text-center font-bold text-sm mb-2">
                            Just Normal Chibi
                        </p>
                        <!-- ราคา -->
                        <div class="flex items-center justify-center gap-1">
                            <v-icon color="amber" size="22">mdi-cash</v-icon>
                            <span class="font-bold text-base">{{ chibiStore.chibis[1].price }}</span>
                        </div>
                        <div>
                            {{ chibiStore.chibis[1].state }}
                        </div>
                </v-card>
            </button>
        </div>

        <!--โปรไฟล์เฟรม 3-->
        <div>
            <button @click="purchasePopup(chibiStore.chibis[3].name, chibiStore.chibis[3].price, chibiStore.chibis[3].state, chibiStore.chibis[3].image ,chibiStore.chibis[3].type)">
                <v-card
                    class="absolute left-152 bottom-82 w-[180px] h-[180px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
                    elevation="4">
                        <!-- รูปสินค้า -->
                        <div class="flex justify-center mb-2">
                            <v-img src="public/chibi/uma-musume-haru-urara.gif" alt="จิบิ" width="80" height="80"
                                contain class="rounded-full mb-2"></v-img>
                        </div>
                        <!-- ชื่อสินค้า -->
                        <p class="text-center font-bold text-sm mb-2">
                            Haru Awful
                        </p>
                        <!-- ราคา -->
                        <div class="flex items-center justify-center gap-1">
                            <v-icon color="amber" size="22">mdi-cash</v-icon>
                            <span class="font-bold text-base">{{ chibiStore.chibis[3].price }}</span>
                        </div>
                        <div>
                            {{ chibiStore.chibis[3].state }}
                        </div>
                </v-card>
            </button>
        </div>

        <!--โปรไฟล์เฟรม 4-->
        <div>
            <button @click="purchasePopup(chibiStore.chibis[2].name, chibiStore.chibis[2].price ,   chibiStore.chibis[2].state, chibiStore.chibis[2].image, chibiStore.chibis[2].type)">
                <v-card
                    class="absolute left-218 bottom-129 w-[180px] h-[180px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
                    elevation="4">
                        <!-- รูปสินค้า -->
                        <div class="flex justify-center mb-2">
                            <v-img src="public/chibi/chibi-tachyon.gif" alt="จิบิ" width="80" height="80"
                                contain class="rounded-full mb-2"></v-img>
                        </div>
                        <!-- ชื่อสินค้า -->
                        <p class="text-center font-bold text-sm mb-2">
                            Tachyon dance
                        </p>
                        <!-- ราคา -->
                        <div class="flex items-center justify-center gap-1">
                            <v-icon color="amber" size="22">mdi-cash</v-icon>
                            <span class="font-bold text-base">{{ chibiStore.chibis[2].price }}</span>
                        </div>
                        <div class="flex item-center justify-center">
                            {{ chibiStore.chibis[2].state }}
                        </div>
                </v-card>
            </button>
        </div>
        <purchase v-if="isPurchase" :type-of-purchase="selectedPurchase" :item-price="selectedPrice" :image="selectedImage" :state="currentState"  :type="selectedtype" @close="isPurchase = false" />
    </div>
</template>
