<script setup>
import { ref } from 'vue';
import purchase from './purchase.vue';
import { useProfileFrameStore } from '../../stores/profileframe.js';
const profileFrameStore = useProfileFrameStore();

const selectedPurchase = ref('Nikka1')
const selectedPrice = ref(0)
const currentState = ref('EROR')
const selectedsrc = ref('../../assets/Eror.jpg')
const selectedtype = ref('EROR')
const isPurchase = ref(false)

function purchasePopup(name, price, state, src, type) {
    selectedPurchase.value = name
    selectedPrice.value = price
    currentState.value = state
    selectedsrc.value = src
    selectedtype.value = type
    isPurchase.value = !isPurchase.value
}

</script>

<template>
    <div>
        <!--โปรไฟล์เฟรม 1-->
        <div>
            <button @click="purchasePopup(profileFrameStore.ProfileFrame[0].name, profileFrameStore.ProfileFrame[0].price, profileFrameStore.ProfileFrame[0].state, profileFrameStore.ProfileFrame[0].src, profileFrameStore.ProfileFrame[0].type)">
                <v-card
                    class="absolute left-22 top-10 w-[180px] h-[200px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
                    elevation="4">
                    <!-- รูปสินค้า -->
                    <div class="flex justify-center mb-2">
                        <v-img src="public/images/Profileframe1.png" alt="กรอบโปรไฟล์" width="80" height="80" contain
                            class="rounded-full mb-2"></v-img>
                    </div>
                    <!-- ชื่อสินค้า -->
                    <p class="text-center font-bold text-sm mb-2">
                        กรอบโปรไฟล์ : {{  profileFrameStore.ProfileFrame[0].name  }}
                    </p>
                    <!-- ราคา -->
                    <div class="flex items-center justify-center gap-1">
                        <v-icon color="amber" size="22">mdi-cash</v-icon>
                        <span class="font-bold text-base"> {{ profileFrameStore.ProfileFrame[0].price }} </span>
                    </div>
                    <div>
                            {{ profileFrameStore.ProfileFrame[0].state }}
                    </div>
                </v-card>
            </button>
        </div>

        <!--โปรไฟล์เฟรม 2-->
        <div>
            <button @click="purchasePopup(profileFrameStore.ProfileFrame[1].name, profileFrameStore.ProfileFrame[1].price, profileFrameStore.ProfileFrame[1].state, profileFrameStore.ProfileFrame[1].src, profileFrameStore.ProfileFrame[1].type)">
                <v-card
                    class="absolute left-88 bottom-41.5 w-[180px] h-[200px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
                    elevation="4">
                    <!-- รูปสินค้า -->
                    <div class="flex justify-center mb-2">
                        <v-img src="public/images/Profileframe2.png" alt="กรอบโปรไฟล์" width="80" height="80" contain
                            class="rounded-full mb-2"></v-img>
                    </div>
                    <!-- ชื่อสินค้า -->
                    <p class="text-center font-bold text-sm mb-2">
                        กรอบโปรไฟล์ : {{ profileFrameStore.ProfileFrame[1].name  }}
                    </p>
                    <!-- ราคา -->
                    <div class="flex items-center justify-center gap-1">
                        <v-icon color="amber" size="22">mdi-cash</v-icon>
                        <span class="font-bold text-base">{{ profileFrameStore.ProfileFrame[1].price }}</span>
                    </div>
                    <div>
                            {{ profileFrameStore.ProfileFrame[1].state }}
                    </div>
                </v-card>
            </button>
        </div>

        <!--โปรไฟล์เฟรม 3-->
        <div>
            <button @click="purchasePopup(profileFrameStore.ProfileFrame[2].name, profileFrameStore.ProfileFrame[2].price, profileFrameStore.ProfileFrame[2].state, profileFrameStore.ProfileFrame[2].src, profileFrameStore.ProfileFrame[2].type)">
                <v-card
                    class="absolute left-152 bottom-93 w-[180px] h-[200px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
                    elevation="4">
                    <!-- รูปสินค้า -->
                    <div class="flex justify-center mb-2">
                        <v-img src="public/images/Profileframe3.png" alt="กรอบโปรไฟล์" width="80" height="80" contain
                            class="rounded-full mb-2"></v-img>
                    </div>
                    <!-- ชื่อสินค้า -->
                    <p class="text-center font-bold text-sm mb-2">
                        กรอบโปรไฟล์ : {{ profileFrameStore.ProfileFrame[2].name  }}
                    </p>
                    <!-- ราคา -->
                    <div class="flex items-center justify-center gap-1">
                        <v-icon color="amber" size="22">mdi-cash</v-icon>
                        <span class="font-bold text-base">{{ profileFrameStore.ProfileFrame[2].price }}</span>
                    </div>
                    <div>
                            {{ profileFrameStore.ProfileFrame[2].state }}
                    </div>
                </v-card>
            </button>
        </div>

        <!--โปรไฟล์เฟรม 4-->
        <div>
            <button @click="purchasePopup(profileFrameStore.ProfileFrame[3].name, profileFrameStore.ProfileFrame[3].price, profileFrameStore.ProfileFrame[3].state, profileFrameStore.ProfileFrame[3].src, profileFrameStore.ProfileFrame[3].type)">
                <v-card
                    class="absolute left-218 bottom-144.5 w-[180px] h-[200px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
                    elevation="4">
                    <!-- รูปสินค้า -->
                    <div class="flex justify-center mb-2">
                        <v-img src="public/images/Profileframe4.png" alt="กรอบโปรไฟล์" width="80" height="80" contain
                            class="rounded-full mb-2"></v-img>
                    </div>
                    <!-- ชื่อสินค้า -->
                    <p class="text-center font-bold text-sm mb-2">
                        กรอบโปรไฟล์ : {{ profileFrameStore.ProfileFrame[3].name  }}
                    </p>
                    <!-- ราคา -->
                    <div class="flex items-center justify-center gap-1">
                        <v-icon color="amber" size="22">mdi-cash</v-icon>
                        <span class="font-bold text-base">{{ profileFrameStore.ProfileFrame[3].price }}</span>
                    </div>
                    <div>
                            {{ profileFrameStore.ProfileFrame[3].state }}
                    </div>
                </v-card>
            </button>
        </div>
    <purchase v-if="isPurchase" :type-of-purchase="selectedPurchase" :item-price="selectedPrice" :image="selectedsrc" :state="currentState" :type="selectedtype" @close="isPurchase = false" />
    </div>
</template>
