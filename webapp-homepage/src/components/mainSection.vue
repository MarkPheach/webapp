<script setup>
import { ref } from 'vue';

const isCart = ref(false);
const ispost = ref(false);

function cartShow() {
    isCart.value = !isCart.value
}
function postShow() {
    ispost.value = !ispost.value
}
</script>

<template>
    <div>
        <!-- cart -->
        <div v-if="isCart"
            class="min-h-150 min-w-150 bg-sky-100 rounded-2xl shadow-2xl flex justify-center items-center fixed left-125 top-25">
            <h1>This is cart</h1>
        </div>
        <!-- post -->
        <div v-if="ispost"
            class="min-h-150 min-w-150 bg-sky-100 rounded-2xl shadow-2xl flex justify-center items-center fixed left-125 top-25">
            <h1>This is post</h1>
        </div>
        <!-- main -->

        <main class="min-h-[calc(100vh_-_10vh)] min-w-screen bg-sky-50">
            <!-- board -->
            <div class="flex float-right h-170 w-300 rounded-2xl bg-white shadow-2xl mr-12 mt-3">
                <!-- cart-post -->
                <button class="fixed bottom-28 w-15 h-15 shadow-2xl rounded-full absolute right-10 bottom-30" @click="cartShow"><v-icon
                        size="28" color="black">mdi-cart</v-icon></button>
                <button class="fixed bottom-10 w-15 h-15 shadow-2xl rounded-full absolute right-10 bottom-10" @click="postShow"><v-icon
                        size="28" color="black">mdi-pencil</v-icon></button>
            </div>
        </main>
    </div>
</template>