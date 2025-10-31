<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserDummy } from '../../stores/userDummy';

const { userDummys } = storeToRefs(useUserDummy());
const isConfirm = ref(false);

function confirmShow() {
    isConfirm.value = !isConfirm.value
}
</script>

<template>
    <!-- popUp สำหรับยืนยันการโพส -->
    <div v-if="isConfirm"
        class="min-h-100 min-w-100 bg-sky-100 rounded-2xl shadow-2xl flex flex-col justify-center items-center fixed left-125 top-25 z-50">
        <h1>แน่ใจ๊?</h1>
        <button @click="confirmShow"
            class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md">
            ยืนยันการโพสต์
        </button>
        <button @click="confirmShow"
            class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md">
            ยกเลิก
        </button>
    </div>
    <div class="min-h-150 min-w-150 bg-sky-100 rounded-2xl shadow-2xl flex flex-col items-center fixed left-125 top-25">
        <!-- วนลูปในตัวแปร 'requests' -->
        <div v-for="userDummy in userDummys" :key="userDummy.id" class="w-9/10 my-4 p-3 bg-white rounded-lg shadow-md">
            <h2 class="text-xl font-bold text-sky-700">{{ userDummy.name }}</h2>
            <p class="text-sm mt-1">{{ userDummy.StdID }}</p>
            <h1>จะโพสไร?</h1>
            <div class="flex h-full w-4/5 items-center justify-center">
                <input type="text" placeholder="  Comment here." class="h-1/2 w-full item-center bg-white rounded-lg">
            </div>

            <button @click="confirmShow"
                class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md">
                โพสต์
            </button>
            <button
                class="px-4 py-2 text-sm font-medium bg-red-500 rounded-lg hover:bg-red-600 transition duration-150 shadow-md">
                ไม่โพสต์
            </button>
        </div>

        <!-- ตรวจสอบความยาวของ 'requests' -->
        <div v-if="userDummys.length === 0">
            <p>ไม่มีรายการคำขอในขณะนี้</p>
        </div>
    </div>
</template>