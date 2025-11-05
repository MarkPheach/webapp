<script setup>
import { ref, computed } from 'vue';
import cart from './popUpScreen/cart.vue';
import post from './popUpScreen/post.vue';
import request from './popUpScreen/request.vue';
import userRequest from './popUpScreen/userRequest.vue';
import { storeToRefs } from 'pinia';
import { usePost } from '../stores/post';
import { useUserRequest } from '../stores/request';

const isCart = ref(false);
const isPost = ref(false);
const isRequest = ref(false);
const isAdmin = ref(true);
const isUserRequest = ref(false);

const { posts } = storeToRefs(usePost());
const { userRequests } = storeToRefs(useUserRequest());

// popup ต่าง ๆ
const isReview = ref(false);
const isComment = ref(false);

// เก็บคะแนนแต่ละโพสต์/คอมเมนต์
const ratings = ref({});
const currentPostId = ref(null);
const averageStar = ref(0);

// popup คำตอบรุ่นพี่
const activePostId = ref(null);
const answerInput = ref('');
const seniorAnswers = ref({});
const seniorAnswerCount = ref({});

// โหมด popup ให้คะแนน (post หรือ comment)
const reviewType = ref(null); // 'post' หรือ 'comment'
const reviewTargetId = ref(null); // id ของสิ่งที่ให้คะแนน

const currentPost = computed(() => {
  if (activePostId.value) {
    return posts.value.find((p) => p.id === activePostId.value);
  }
  return null;
});

// --- เปิด popup ให้คะแนน (ใช้ร่วมได้ทั้งโพสต์/คอมเมนต์) ---
function openReview(type, id) {
  reviewType.value = type;
  reviewTargetId.value = id;
  isReview.value = true;
  hasSelected.value = false;
  selectedStar.value = 0;
}

// --- ระบบปิด popup ---
function closeReview() {
  isReview.value = false;
  reviewType.value = null;
  reviewTargetId.value = null;
}

function userRequestShow() {
  isUserRequest.value = !isUserRequest.value;
}

function reviewShow(postId) {
  openReview('post', postId);
}

// ✅ เปลี่ยนฟังก์ชันนี้ให้ใช้ key ไม่ซ้ำกันระหว่างโพสต์
function reviewCommentShow(postId, commentIndex) {
  openReview('comment', `${postId}-${commentIndex}`);
}

// --- toggle popup ---
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
  if (reviewTargetId.value !== null) {
    ratings.value[`${reviewType.value}-${reviewTargetId.value}`] = star;
  }
}

function getEmoji(star) {
  const emojis = ['⭐1', '⭐2', '⭐3', '⭐4', '⭐5'];
  return emojis[star - 1];
}

// คำตอบรุ่นพี่
function getSeniorAnswer(postId) {
  if (!seniorAnswers.value[postId]) seniorAnswers.value[postId] = [];
  return seniorAnswers.value[postId];
}

function getSeniorAnswerCount(postId) {
  return seniorAnswerCount.value[postId] ?? 67;
}

function openPostPopup(postId) {
  activePostId.value = postId;
  getSeniorAnswer(postId);
}

function closePostPopup() {
  activePostId.value = null;
  answerInput.value = '';
}

function sendSeniorAnswer(postId) {
  const answer = answerInput.value.trim();
  if (!postId || !answer.length) return;
  usePost().addComment(postId, answer);

  answerInput.value = '';
}
</script>

<template>
  <div>
    <cart v-if="isCart" />
    <post v-if="isPost" />
    <request v-if="isRequest" />

    <!-- ✅ POPUP คำตอบรุ่นพี่ -->
    <div v-if="activePostId !== null"
      class="fixed inset-0 flex items-center justify-center z-[999] bg-black/50 backdrop-blur-sm">
      <div class="relative bg-white w-[550px] max-h-[90vh] rounded-2xl shadow-2xl flex flex-col">
        <button @click="closePostPopup"
          class="absolute right-4 top-4 text-2xl font-bold text-gray-700 hover:text-gray-900">
          &times;
        </button>

        <div class="w-full h-16 bg-sky-300/70 rounded-t-2xl flex items-center px-6">
          <h2 class="text-xl font-bold text-gray-800">ตอบกลับโพสต์</h2>
        </div>

        <div class="p-4 flex-1 flex flex-col overflow-hidden relative">
          <!-- ✅ popup ให้คะแนนคอมเมนต์ -->
          <div v-if="isReview && reviewType === 'comment'"
            class="absolute inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50 animate-fade">
            <div
              class="bg-white rounded-2xl shadow-2xl border border-gray-300 px-6 py-5 flex flex-col items-center justify-center">
              <h1 class="text-xl font-semibold text-gray-700 mb-3">ให้กี่ดาวกับคอมเมนต์นี้?</h1>

              <div v-if="!hasSelected" class="flex space-x-3">
                <button v-for="star in 5" :key="star" @click="selectStar(star)"
                  class="text-4xl hover:scale-125 transition-transform duration-150 mx-2">
                  {{ getEmoji(star) }}
                </button>
              </div>

              <div v-else class="text-lg text-gray-800 font-bold mt-2 mx-2">
                คุณให้คะแนน {{ getEmoji(selectedStar) }}
              </div>

              <button @click="closeReview"
                class="mt-4 px-4 py-2 text-sm font-medium bg-gray-400 rounded-lg hover:bg-gray-500 transition duration-150 shadow-md">
                ปิด
              </button>
            </div>
          </div>

          <!-- โพสต์ต้นฉบับ -->
          <div v-if="currentPost" class="mb-4 p-3 bg-gray-100 rounded-lg border border-gray-300">
            <h4 class="font-semibold text-gray-700 text-sm">
              Review: {{ currentPost.review }} | Title: {{ currentPost.title }}
            </h4>
            <p class="text-xs text-gray-600 mt-1">{{ currentPost.detail }}</p>
            <p class="text-[10px] text-blue-600 italic mt-1 border-t pt-1">
              {{ currentPost.comment.join(' | ') }}
            </p>
          </div>

          <h3 class="font-bold text-lg mb-2 text-gray-700">
            คำตอบจากรุ่นพี่ ({{ getSeniorAnswer(activePostId).length }})
          </h3>

          <!-- ✅ แสดงคำตอบ + ปุ่มให้คะแนนแต่ละคอมเมนต์ -->
          <div class="flex-grow overflow-y-auto bg-slate-50 p-3 rounded-lg mb-3 border border-gray-200">
            <div v-for="(answer, index) in currentPost.comment" :key="index"
              class="mb-3 p-2 bg-white rounded shadow-sm border-l-4 border-sky-500">
              <p class="text-gray-800 text-sm whitespace-pre-wrap">{{ answer }}</p>
              <button @click="reviewCommentShow(activePostId, index)"
                class="px-3 py-1 text-xs font-medium rounded-full transition duration-150 shadow-sm text-black" :class="ratings[`comment-${activePostId}-${index}`]
                  ? 'bg-yellow-300 hover:bg-yellow-400'
                  : 'bg-orange-200 hover:bg-orange-300'
                  ">
                <template v-if="ratings[`comment-${activePostId}-${index}`]">
                  คุณให้ {{ getEmoji(ratings[`comment-${activePostId}-${index}`]) }}
                </template>
                <template v-else>ให้คะแนนคอมเมนต์</template>
              </button>
            </div>

            <p v-if="currentPost.comment.length === 0" class="text-gray-400 text-sm text-center py-4">
              ยังไม่มีคำตอบจากรุ่นพี่
            </p>
          </div>

          <!-- ช่องพิมพ์ -->
          <div class="flex items-center">
            <input v-model="answerInput" @keyup.enter="sendSeniorAnswer(activePostId)"
              placeholder="พิมพ์คำตอบหรือความคิดเห็น..."
              class="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            <button @click="sendSeniorAnswer(activePostId)"
              class="px-4 py-2 bg-green-500 rounded-r-lg shadow hover:bg-green-600 transition text-sm font-medium">
              ส่ง
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ✅ popup ให้คะแนนโพสต์ -->
    <div v-if="isReview && reviewType === 'post'"
      class="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50 animate-fade">
      <div
        class="bg-white rounded-2xl shadow-2xl border border-gray-300 px-6 py-5 flex flex-col items-center justify-center">
        <h1 class="text-xl font-semibold text-gray-700 mb-3">ให้กี่ดาว?</h1>

        <div v-if="!hasSelected" class="flex space-x-3">
          <button v-for="star in 5" :key="star" @click="selectStar(star)"
            class="text-4xl hover:scale-125 transition-transform duration-150 mx-2">
            {{ getEmoji(star) }}
          </button>
        </div>

        <div v-else class="text-lg text-gray-800 font-bold mt-2 mx-2">
          คุณให้คะแนน {{ getEmoji(selectedStar) }}
        </div>

        <button @click="closeReview"
          class="mt-4 px-4 py-2 text-sm font-medium bg-gray-400 rounded-lg hover:bg-gray-500 transition duration-150 shadow-md">
          ปิด
        </button>
      </div>
    </div>

    <!-- ✅ หน้าโพสต์หลัก -->
    <main class="flex justify-around min-h-[90vh] min-w-screen">

      <div class="flex flex-col float-right h-170 w-300 rounded-2xl mr-12 mt-3">
        <!-- request -->
        <div id="request" class="bg-gray-100 rounded-2xl flex flex-col items-left justify-center w-9/10 py-5 px-6">
          <h1>โพสที่รอดำเนินการ</h1>
          <p class="text-gray-500">{{ useUserRequest().userRequests.length }} โพส</p>
          <button class="px-3 py-1 bg-white rounded-full transition duration-150 shadow-sm" @click="userRequestShow">
            <p class="text-gray-500 ">จัดการโพส</p>
          </button>
          <userRequest v-if="isUserRequest"/>
        </div>
        <!-- post -->
        <div v-for="post in posts" :key="post.id"
          class="w-9/10 my-4 bg-white rounded-xl shadow-lg border border-gray-100 py-4 px-6">
          <h2 class="text-lg font-bold text-sky-800 mb-1">
            Rating: {{ post.review }}⭐ | {{ post.name }} โพสในหัวข้อ: {{ post.title }}
          </h2>

          <div class="text-sm text-gray-600 mb-2">
            <span class="font-semibold text-yellow-600">
              {{
                ratings[`post-${post.id}`]
                  ? getEmoji(ratings[`post-${post.id}`])
                  : 'ยังไม่มีคะแนน'
              }}
            </span>
          </div>

          <p class="text-base text-gray-700 mb-2">{{ post.detail }}</p>
          <p class="text-xs text-blue-700 mb-3 border-t pt-2">
            {{ post.comment.join(' | ') }}
          </p>

          <div class="flex gap-2 mt-3">
            <button @click="reviewShow(post.id)"
              class="px-3 py-1 text-xs font-medium rounded-full transition duration-150 shadow-sm text-black" :class="ratings[`post-${post.id}`]
                ? 'bg-yellow-300 hover:bg-yellow-400'
                : 'bg-orange-200 hover:bg-orange-300'
                ">
              <template v-if="ratings[`post-${post.id}`]">
                คุณให้ {{ getEmoji(ratings[`post-${post.id}`]) }}
              </template>
              <template v-else>ให้คะแนน</template>
            </button>

            <button @click="openPostPopup(post.id)"
              class="px-3 py-1 text-xs font-medium bg-red-500 hover:bg-red-600 transition duration-150 shadow-md rounded-full text-black">
              ตอบคำถาม
            </button>
          </div>
        </div>

        <!-- ปุ่มลอย -->
        <button class="fixed right-15 bottom-30 w-15 h-15 shadow-2xl rounded-full" @click="cartShow">
          <v-icon size="28" color="black">mdi-cart</v-icon>
        </button>
        <button class="fixed right-15 bottom-10 w-15 h-15 shadow-2xl rounded-full" @click="postShow">
          <v-icon size="28" color="black">mdi-pencil</v-icon>
        </button>
        <button v-if="isAdmin" class="fixed right-15 bottom-50 w-15 h-15 shadow-2xl rounded-full" @click="requestShow">
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