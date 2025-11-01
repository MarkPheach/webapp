<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserDummy } from '../../stores/userDummy';
import { usePost } from '../../stores/post';

const { userDummys } = storeToRefs(useUserDummy());
const { posts } = storeToRefs(usePost());
const isConfirm = ref(false);
const inputTitle = ref('');
const inputDetail = ref('');

//การโพส
const handleAddPost = () => {
    const newPost = {
        title: inputTitle.value,
        detail: inputDetail.value,
    };

    usePost().insertPost(newPost);

    //   ล้างฟอร์มหลังโพส
    inputTitle.value = '';
    inputDetail.value = '';
}

function confirmShow() {
    isConfirm.value = !isConfirm.value
}
</script>

<template>
    <!-- popUp สำหรับยืนยันการโพส -->
    <div v-if="isConfirm"
        class="min-h-100 min-w-100 bg-sky-100 rounded-2xl shadow-2xl flex flex-col justify-center items-center fixed left-125 top-25 z-50">
        <h1>แน่ใจ๊?</h1>
        <button @click="confirmShow(); handleAddPost();"
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
                <input type="text" v-model="inputTitle" placeholder=" ชื่อหัวข้อ (Title)"
                    class="h-1/2 w-full item-center bg-white rounded-lg">
                <textarea v-model="inputDetail" placeholder=" รายละเอียด (Detail)" rows="3"
                    class="w-full item-center p-2 bg-gray-100 rounded-lg border-2 border-gray-300 resize-none"></textarea>
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