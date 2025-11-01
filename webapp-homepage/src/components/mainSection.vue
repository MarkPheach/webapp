<script setup>
import { ref } from 'vue';
import cart from './popUpScreen/cart.vue';
import post from './popUpScreen/post.vue';
import request from './popUpScreen/request.vue';
import { storeToRefs } from 'pinia';
import { usePost } from '../stores/post';

const isCart = ref(false);
const isPost = ref(false);
const isRequest = ref(false);
const isAdmin = ref(true);

const { posts } = storeToRefs(usePost());

const isReview = ref(false);
const isComment = ref(false);

function reviewShow() {
    isReview.value = !isReview.value
    isComment.value = false
}
function commentShow() {
    isComment.value = !isComment.value
    isReview.value = false
}

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
        <cart v-if="isCart" />
        <!-- post -->
        <post v-if="isPost" />
        <!-- request -->
        <request v-if="isRequest" />
        <!-- main -->

        <main class="min-h-[calc(100vh_-_10vh)] min-w-screen bg-sky-50">
            <!-- board -->
            <div class="flex float-right h-170 w-300 rounded-2xl bg-white shadow-2xl mr-12 mt-3">

                <div>
                    <!-- popUp สำหรับ comment -->
                    <div v-if="isReview"
                        class="min-h-100 min-w-100 bg-sky-100 rounded-2xl shadow-2xl flex flex-col justify-center items-center fixed left-125 top-25 z-50">
                        <h1>ให้กี่ดาว?</h1>
                        <button @click="reviewShow"
                            class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md">
                            1
                        </button>
                        <button @click="reviewShow"
                            class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md">
                            2
                        </button>
                        <button @click="reviewShow"
                            class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md">
                            3
                        </button>
                        <button @click="reviewShow"
                            class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md">
                            4
                        </button>
                        <button @click="reviewShow"
                            class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md">
                            5
                        </button>
                        <button @click="reviewShow"
                            class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md">
                            ยกเลิก
                        </button>
                    </div>
                    <!-- popUp สำหรับแสดงความคิดเห็น -->
                    <div v-if="isComment"
                        class="min-h-100 min-w-100 bg-sky-100 rounded-2xl shadow-2xl flex flex-col justify-center items-center fixed left-125 top-25 z-50">
                        <h1>จะเม้นไร?</h1>
                        <div class="flex h-full w-4/5 items-center justify-center">
                            <input type="text" placeholder="  Comment here."
                                class="h-1/2 w-full item-center bg-white rounded-lg">
                        </div>
                        <button @click="commentShow"
                            class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md">
                            ยืนยัน
                        </button>
                        <button @click="commentShow"
                            class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md">
                            ยกเลิก
                        </button>
                    </div>

                    <!-- วนลูปในตัวแปร 'posts' -->
                    <div v-for="post in posts" :key="post.id" class="w-9/10 my-4 p-3 bg-white rounded-lg shadow-md">
                        <h2 class="text-xl font-bold text-sky-700">รีวิว : {{ post.review }} หัวข้อ : {{ post.title
                        }}</h2>
                        <p class="text-sm mt-1">{{ post.detail }}</p>
                        <p class="text-sm mt-1">{{ post.comment.join(' | ') }}</p>

                        <button @click="reviewShow"
                            class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md">
                            ให้คะแนน
                        </button>
                        <button @click="commentShow"
                            class="px-4 py-2 text-sm font-medium bg-red-500 rounded-lg hover:bg-red-600 transition duration-150 shadow-md">
                            ตอบคำถาม
                        </button>
                    </div>

                    <!-- ตรวจสอบความยาวของ 'posts' -->
                    <div v-if="posts.length === 0">
                        <p>ไม่มีรายการโพสในขณะนี้</p>
                    </div>
                </div>
                <!-- cart-post -->
                <button class="fixed right-15 bottom-30 w-15 h-15 shadow-2xl rounded-full" @click="cartShow"><v-icon
                        size="28" color="black">mdi-cart</v-icon></button>
                <button class="fixed right-15 bottom-10 w-15 h-15 shadow-2xl rounded-full" @click="postShow"><v-icon
                        size="28" color="black">mdi-pencil</v-icon></button>
                <button v-if="isAdmin" class="fixed right-15 bottom-50 w-15 h-15 shadow-2xl rounded-full"
                    @click="requestShow"><v-icon size="28" color="black">mdi-account-box</v-icon></button>
            </div>
        </main>
    </div>
</template>