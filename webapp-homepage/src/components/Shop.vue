<script>
import { ref } from 'vue';
</script>

<template>
  <div class="flex bg-sky-300 h-[90vh] w-[85vw] float-right">
    <div class="absolute bg-blue-400 left-70 top-32 rounded-3xl w-48 h-12 text-4xl flex items-center justify-center">
      ร้านค้า </div>

    <!-- Profile -->
    <button
      class="absolute left-70 top-51 bg-white rounded-full w-44 h-12 flex items-center justify-center gap-2 border-2 border-gray-300 shadow"
      aria-label="กรอบโปรไฟล์">
      <!-- inline user icon -->
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24"
        aria-hidden="true">
        <path
          d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 3.134-7 7h2c0-2.761 2.239-5 5-5s5 2.239 5 5h2c0-3.866-3.134-7-7-7z" />
      </svg>
      <span class="text-xl">กรอบโปรไฟล์</span>
    </button>

    <!-- Theme website -->
    <button
      class="absolute left-120 top-51 bg-white rounded-full w-44 h-12 flex items-center justify-center gap-2 border-2 border-gray-300 shadow"
      aria-label="ธีมเว็บไซต์">
      <!-- inline color palette icon -->
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24"
        aria-hidden="true">
        <path
          d="M12 2c5.522 0 10 4.478 10 10s-4.478 10-10 10c-1.892 0-3.638-.614-5.051-1.649a.999.999 0 0 1-.325-1.324l1.961-3.922a1 1 0 0 1 .875-.553h.001c1.199.001 2.279-.891 2.279-2.09 0-1.199-.98-2.463-2.179-2.463h-4.3a1 1 0 0 1-.97-1.255C5.712 3.988 8.632 2 12 2zm-8 9c.69 0 1.25-.56 1.25-1.25S4.69 8.5 4 8.5s-1.25.56-1.25 1.25S3.31 11 4 11zm3-4c.69 0 1.25-.56 1.25-1.25S7.69 4.5 7 4.5S5.75 5.06 5.75 5.75 6.31 7 7 7zm7-1c.69 0 1.25-.56 1.25-1.25S14.69 3.5 14 3.5s-1.25.56-1.25 1.25S13.31 6 14 6zm4 3c.69 0 1.25-.56 1.25-1.25S18.69 6.5 18 6.5s-1.25.56-1.25 1.25S17.31 9 18 9z" />
      </svg>
      <span class="text-xl">ธีมเว็บไซต์</span>
    </button>

    <!-- Chibli -->
    <button
      class="absolute left-170 top-51 bg-white rounded-full w-44 h-12 flex items-center justify-center gap-2 border-2 border-gray-300 shadow"
      aria-label="จิบิ">
      <!-- uwu emoticon image -->
      <img src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Stylized_uwu_emoticon.svg" alt="uwu emoticon"
        class="absolute left-10 w-5 h-5 object-contain" />
      <span class="text-xl">จิบิ</span>
    </button>

    <!-- screen -->
    <div class="bg-sky-200 absolute left-70 top-70 rounded-3xl w-3/4 h-5/8">
      <div class="absolute left-10 top-10 text-2xl"></div>
      <div class="static flex space-x-4">


      </div>
    </div>
  </div>


</template>
