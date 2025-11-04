<script setup>
import { ref } from "vue";
import ProfileFrame from "./popUpShop/ProfileFrame.vue";
import ThemeWebsite from "./popUpShop/ThemeWebsite.vue";
import Chibli from "./popUpShop/Chibli.vue";

const isProfileFrame = ref(true);
const isThemeWebsite = ref(false);
const isChibli = ref(false);

function profileFrameShow() {
  isProfileFrame.value = true;
  isThemeWebsite.value = false;
  isChibli.value = false;
}

function themeWebsiteShow() {
  isThemeWebsite.value = true;
  isProfileFrame.value = false;
  isChibli.value = false;
}

function chibliShow() {
  isChibli.value = true;
  isProfileFrame.value = false;
  isThemeWebsite.value = false;
}
</script>

<template>
  <main class="flex justify-center min-h-[calc(100vh-10vh)] bg-gradient-to-br from-sky-100 to-blue-50 pt-6 pb-10">
    <div class="flex flex-col float-right h-170 min-w-[80vw] rounded-2xl mr-12 mt-3">
      <!-- TITLE -->
      <div
        class="bg-gradient-to-r from-blue-800 to-blue-600 text-white text-4xl font-bold w-fit px-10 py-4 rounded-2xl shadow-lg mb-8">
        ร้านค้า 🛍️
      </div>

      <!-- BUTTON MENU -->
      <div class="flex flex-wrap gap-6">
        <!-- SHOW PROFILE -->
        <!-- SHOW PROFILE -->
        <!-- SHOW PROFILE -->
<button
  @click="profileFrameShow"
  :class="[ 
    'rounded-2xl w-48 h-14 flex items-center justify-center gap-2 border-2 transition-all duration-300 shadow-md font-semibold text-lg',
    isProfileFrame
      ? 'bg-gradient-to-r from-blue-800 to-blue-600 text-white border-blue-700 scale-105 shadow-lg shadow-blue-300/30'
      : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-50 hover:scale-105 hover:shadow-md'
  ]"
  aria-label="กรอบโปรไฟล์"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 3.134-7 7h2c0-2.761 2.239-5 5-5s5 2.239 5 5h2c0-3.866-3.134-7-7-7z"
    />
  </svg>
  <span>กรอบโปรไฟล์</span>
</button>

<!-- THEME WEBSITE -->
<button
  @click="themeWebsiteShow"
  :class="[
    'rounded-2xl w-48 h-14 flex items-center justify-center gap-2 border-2 transition-all duration-300 shadow-md font-semibold text-lg',
    isThemeWebsite
      ? 'bg-gradient-to-r from-blue-800 to-blue-600 text-white border-blue-700 scale-105 shadow-lg shadow-blue-300/30'
      : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-50 hover:scale-105 hover:shadow-md'
  ]"
  aria-label="ธีมเว็บไซต์"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M12 2c5.522 0 10 4.478 10 10s-4.478 10-10 10c-1.892 0-3.638-.614-5.051-1.649a.999.999 0 0 1-.325-1.324l1.961-3.922a1 1 0 0 1 .875-.553h.001c1.199.001 2.279-.891 2.279-2.09 0-1.199-.98-2.463-2.179-2.463h-4.3a1 1 0 0 1-.97-1.255C5.712 3.988 8.632 2 12 2z"
    />
  </svg>
  <span>ธีมเว็บไซต์</span>
</button>

<!-- CHIBLI -->
<button
  @click="chibliShow"
  :class="[
    'rounded-2xl w-48 h-14 flex items-center justify-center gap-2 border-2 transition-all duration-300 shadow-md font-semibold text-lg',
    isChibli
      ? 'bg-gradient-to-r from-blue-800 to-blue-600 text-white border-blue-700 scale-105 shadow-lg shadow-blue-300/30'
      : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-50 hover:scale-105 hover:shadow-md'
  ]"
  aria-label="จิบิ"
>
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Stylized_uwu_emoticon.svg"
    alt="uwu emoticon"
    class="w-6 h-6 object-contain"
  />
  <span>จิบิ</span>
</button>

      </div>

      <!-- SCREEN -->
      <div
        class="bg-gradient-to-tr from-sky-100 to-white rounded-3xl mt-10 p-6 shadow-inner border border-blue-200 items-center min-h-[60vh]">
        <ProfileFrame v-if="isProfileFrame" />
        <ThemeWebsite v-if="isThemeWebsite" />
        <Chibli v-if="isChibli" />
      </div>
    </div>
  </main>
</template>
