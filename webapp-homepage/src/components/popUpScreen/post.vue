<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserDummy } from '../../stores/userDummy';
import { useRequest } from '../../stores/request';
import { useSubject } from "../../stores/subject";

const { userDummys } = storeToRefs(useUserDummy());
const { subjects } = storeToRefs(useSubject());
const isConfirm = ref(false);
const inputTitle = ref('');
const inputDetail = ref('');

// การโพสต์
const handleAddPost = () => {
    const newRequest = {
        name: userDummys.value[0].name,
        title: inputTitle.value,
        detail: inputDetail.value,
        createdAt: new Date().toISOString(), // ✅ แก้ให้ตรง
    };


    useRequest().addRequest(newRequest);
    inputTitle.value = '';
    inputDetail.value = '';
};

function confirmShow() {
    isConfirm.value = !isConfirm.value;
}
</script>

<template>
    <!-- Pop-up ยืนยันโพสต์ -->
    <div v-if="isConfirm"
        class="min-h-35 min-w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl flex flex-col justify-center items-center fixed left-195 top-90 z-50 border border-gray-200">
        <h1 class="text-2xl font-semibold text-blue-900 mb-4">ยืนยันการโพสต์หรือไม่?</h1>
        <div class="flex gap-4">
            <button @click="confirmShow(); handleAddPost();"
                class="px-5 py-2 bg-blue-900 text-black font-medium rounded-xl hover:bg-blue-950 transition-all duration-200 shadow-md">
                ✅ ยืนยันโพสต์
            </button>
            <button @click="confirmShow();"
                class="px-5 py-2 bg-gray-300 text-gray-800 font-medium rounded-xl hover:bg-gray-400 transition-all duration-200 shadow-md">
                ❌ ยกเลิก
            </button>
        </div>
    </div>

    <!-- กล่องโพสต์หลัก -->
    <div
        class="min-h-100 min-w-150 bg-gradient-to-br from-gray-50 to-gray-200 rounded-2xl shadow-2xl flex flex-col items-center fixed left-190 top-30 p-6 overflow-y-auto">
        <div v-for="userDummy in userDummys" :key="userDummy.id"
            class="w-11/12 my-4 p-5 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200">
            <h2 class="text-2xl font-semibold text-blue-900">{{ userDummy.name }}</h2>
            <p class="text-sm text-gray-500 mb-4">รหัสนิสิต: {{ userDummy.StdID }}</p>


            <div class="flex flex-col gap-3">
                <select v-model="inputTitle"
                    class="h-12 w-full bg-gray-50 border border-gray-300 rounded-lg px-3 text-gray-700 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition">
                    <option disabled value="">เลือกหัวข้อ (Select Title)</option>
                    <option v-for="subject in subjects" :key="subject.name" :value="subject.name">
                        {{ subject.name }}
                    </option>
                </select>

                <textarea v-model="inputDetail" placeholder="รายละเอียดเพิ่มเติม (Detail)" rows="3"
                    class="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition"></textarea>
            </div>

            <div class="flex justify-end gap-3 mt-4">
                <button @click="confirmShow"
                    class="px-4 py-2 text-sm font-medium bg-blue-900 text-black rounded-lg hover:bg-blue-950 transition duration-200 shadow-md">
                    💬 โพสต์
                </button>
                <button
                    class="px-4 py-2 text-sm font-medium bg-gray-500 text-black rounded-lg hover:bg-gray-600 transition duration-200 shadow-md">
                    🗙 ไม่โพสต์
                </button>
            </div>
        </div>

        <div v-if="userDummys.length === 0" class="text-gray-500 mt-10">
            <p>ไม่มีรายการคำขอในขณะนี้</p>
        </div>
    </div>
</template>
