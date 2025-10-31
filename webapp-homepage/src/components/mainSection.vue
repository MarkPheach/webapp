<script setup>
import { ref } from 'vue';
import cart from './popUpScreen/cart.vue';
import post from './popUpScreen/post.vue';
import request from './popUpScreen/request.vue';

const isCart = ref(false);
const isPost = ref(false);
const isRequest = ref(false);
const isAdmin = ref(true);

function cartShow() {
    isCart.value = !isCart.value
    isPost.value = false
    isRequest.value = false
}
function postShow() {
    isPost.value = !isPost.value
    isCart.value = false
    isRequest.value = false
}
function requestShow() {
    isRequest.value = !isRequest.value
    isPost.value = false
    isCart.value = false
}
</script>

<template>
    <div>
        <!-- cart -->
        <cart v-if="isCart"/>
        <!-- post -->
        <post v-if="isPost"/>
        <!-- request -->
        <request v-if="isRequest"/>
        <!-- main -->

        <main class="min-h-[calc(100vh_-_10vh)] min-w-screen bg-sky-50">
            <!-- board -->
            <div class="flex float-right h-170 w-300 rounded-2xl bg-white shadow-2xl mr-12 mt-3">
                <!-- cart-post -->
                <button class="fixed right-15 bottom-30 w-15 h-15 shadow-2xl rounded-full" @click="cartShow"><v-icon
                        size="28" color="black">mdi-cart</v-icon></button>
                <button class="fixed right-15 bottom-10 w-15 h-15 shadow-2xl rounded-full" @click="postShow"><v-icon
                        size="28" color="black">mdi-pencil</v-icon></button>
                <button v-if="isAdmin" class="fixed right-15 bottom-50 w-15 h-15 shadow-2xl rounded-full" @click="requestShow"><v-icon
                        size="28" color="black">mdi-account-box</v-icon></button>
            </div>
        </main>
    </div>
</template>