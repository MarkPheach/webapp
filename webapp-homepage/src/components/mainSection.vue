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

// เก็บคะแนนของแต่ละโพสต์
const ratings = ref({});

const currentPostId = ref(null);

function reviewShow(postId) {
  // ถ้ายังไม่เปิด popup หรือเป็นโพสต์อื่น
  if (!isReview.value || currentPostId.value !== postId) {
    currentPostId.value = postId;
    isReview.value = true;
  } else {
    // ถ้าเปิดอยู่แล้ว -> ปิด
    isReview.value = false;
  }
  isComment.value = false;
}

function commentShow() {
  isComment.value = !isComment.value;
  isReview.value = false;
}

function cartShow() {
  isCart.value = !isCart.value;
  isPost.value = false;
  isRequest.value = false;
}
function postShow() {
  isPost.value = !isPost.value;
  isCart.value = false;
  isRequest.value = false;
}
function requestShow() {
  isRequest.value = !isRequest.value;
  isPost.value = false;
  isCart.value = false;
}

// ระบบให้คะแนน
const selectedStar = ref(0);
const hasSelected = ref(false);

function selectStar(star) {
  selectedStar.value = star;
  hasSelected.value = true;
  // บันทึกคะแนนของโพสต์ปัจจุบัน
  if (currentPostId.value !== null) {
    ratings.value[currentPostId.value] = star;
  }
  setTimeout(() => {
    isReview.value = false;
    hasSelected.value = false;
  }, 800);
}

function getEmoji(star) {
  const emojis = ['⭐1 ', '⭐2 ', '⭐3 ', '⭐4 ', '⭐5'];
  return emojis[star - 1];
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

    <main class="min-h-[calc(100vh_-_10vh)] min-w-screen bg-sky-50">
      <div class="flex float-right h-170 w-300 rounded-2xl bg-white shadow-2xl mr-12 mt-3">
        <div>
          <!-- ✅ Popup ให้คะแนน -->
          <div
            v-if="isReview"
            class="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50 animate-fade"
          >
            <div
              class="bg-white rounded-2xl shadow-2xl border border-gray-300 px-6 py-5 flex flex-col items-center justify-center"
            >
              <h1 class="text-xl font-semibold text-gray-700 mb-3">
                ให้กี่ดาว?
              </h1>

              <div v-if="!hasSelected" class="flex space-x-3">
                <button
                  v-for="star in 5"
                  :key="star"
                  @click="selectStar(star)"
                  class="text-4xl hover:scale-125 transition-transform duration-150 mx-2"
                >
                  {{ getEmoji(star) }}
                </button>
              </div>

              <div v-else class="text-lg text-gray-800 font-bold mt-2 mx-2">
                คุณให้คะแนน {{ getEmoji(selectedStar) }}
              </div>

              <button
                @click="isReview = false"
                class="mt-4 px-4 py-2 text-sm font-medium bg-gray-400 rounded-lg hover:bg-gray-500 transition duration-150 shadow-md"
              >
                ปิด
              </button>
            </div>
          </div>

          <!-- ✅ Popup แสดงความคิดเห็น -->
          <div
            v-if="isComment"
            class="min-h-100 min-w-100 bg-sky-100 rounded-2xl shadow-2xl flex flex-col justify-center items-center fixed left-125 top-25 z-50"
          >
            <h1>จะเม้นไร?</h1>
            <div class="flex h-full w-4/5 items-center justify-center">
              <input
                type="text"
                placeholder="  Comment here."
                class="h-1/2 w-full item-center bg-white rounded-lg"
              />
            </div>
            <button
              @click="commentShow"
              class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md"
            >
              ยืนยัน
            </button>
            <button
              @click="commentShow"
              class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md"
            >
              ยกเลิก
            </button>
          </div>

          <!-- ✅ วนลูปโพสต์ -->
          <div
            v-for="post in posts"
            :key="post.id"
            class="w-9/10 my-4 p-3 bg-white rounded-lg shadow-md"
          >
            <h2 class="text-xl font-bold text-sky-700">
              รีวิว : {{ post.review }} หัวข้อ : {{ post.title }}
            </h2>
            <p class="text-sm mt-1">{{ post.detail }}</p>
            <p class="text-sm mt-1">{{ post.comment.join(' | ') }}</p>

            <!-- ✅ ปุ่มให้คะแนน ( แก้ไข: เพิ่ม text-black และลบ text-white ในเงื่อนไข :class ) -->
            <button
              @click="reviewShow(post.id)"
              class="px-4 py-2 text-sm font-medium rounded-lg transition duration-150 shadow-md text-black"
              :class="ratings[post.id] ? 'bg-yellow-300 hover:bg-yellow-400' : 'bg-green-500 hover:bg-green-600'"
            >
              <template v-if="ratings[post.id]">
                คุณให้คะแนน {{ getEmoji(ratings[post.id]) }}
              </template>
              <template v-else>
                ให้คะแนน
              </template>
            </button>

            <!-- ✅ ปุ่มตอบคำถาม ( แก้ไข: เปลี่ยน text-white เป็น text-black ) -->
            <button
              @click="commentShow"
              class="px-4 py-2 ml-2 text-sm font-medium bg-red-500 rounded-lg hover:bg-red-600 transition duration-150 shadow-md text-black"
            >
              ตอบคำถาม
            </button>
          </div>

          <div v-if="posts.length === 0">
            <p>ไม่มีรายการโพสในขณะนี้</p>
          </div>
        </div>

        <!-- ปุ่มลอย -->
        <button
          class="fixed right-15 bottom-30 w-15 h-15 shadow-2xl rounded-full"
          @click="cartShow"
        >
          <v-icon size="28" color="black">mdi-cart</v-icon>
        </button>
        <button
          class="fixed right-15 bottom-10 w-15 h-15 shadow-2xl rounded-full"
          @click="postShow"
        >
          <v-icon size="28" color="black">mdi-pencil</v-icon>
        </button>
        <button
          v-if="isAdmin"
          class="fixed right-15 bottom-50 w-15 h-15 shadow-2xl rounded-full"
          @click="requestShow"
        >
          <v-icon size="28" color="black">mdi-account-box</v-icon>
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade {
  animation: fadeIn 1s ease;
}
</style>