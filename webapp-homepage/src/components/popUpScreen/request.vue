<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRequest } from '../../stores/request';
import { usePost } from '../../stores/post';

const { requests } = storeToRefs(useRequest());
const { posts } = storeToRefs(usePost());

const isAccpet = ref(false);
const selectedRequest = ref({});

function acceptShow(request) {
    isAccpet.value = !isAccpet.value;
    selectedRequest.value = request;
}

function declineShow() {
    isAccpet.value = false;
    selectedRequest.value = {};
}

function confirmAccept() {
  if (selectedRequest.value) {
    const approvedPost = {
      ...selectedRequest.value,
      createdAt: selectedRequest.value.createdAt || new Date().toISOString()
    };
    usePost().insertPost(approvedPost);
    useRequest().removeRequest(selectedRequest.value.id);
    acceptShow();
  }
}

// 🕒 ฟังก์ชันแปลง timestamp เป็นเวลาที่อ่านง่าย
function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('th-TH', {
        dateStyle: 'short',
        timeStyle: 'short'
    });
}
</script>

<template>
    <div>
        <!-- popUp ยืนยัน -->
        <div v-if="isAccpet" class="min-h-100 min-w-100 rounded-2xl shadow-2xl flex flex-col justify-center items-center 
                   fixed left-127 top-30 z-50  
                   bg-gradient-to-br from-blue-900 to-blue-700 text-white border border-blue-300/40">
            <h1 class="text-2xl font-semibold mb-6 tracking-wide">แน่ใจไหมว่าจะอนุมัติ?</h1>

            <div class="flex gap-4">
                <button @click="confirmAccept" class="px-5 py-2 text-sm font-medium bg-emerald-500 rounded-lg hover:bg-emerald-600 
                           transition duration-150 shadow-md">
                    ✅ ยืนยันการอนุมัติ
                </button>
                <button @click="declineShow" class="px-5 py-2 text-sm font-medium bg-gray-500 rounded-lg hover:bg-gray-600 
                           transition duration-150 shadow-md">
                    ❌ ยกเลิก
                </button>
            </div>
        </div>

        <!-- body -->
        <div class="min-h-125 min-w-125 bg-gradient-to-br from-blue-900 to-blue-700 text-white 
                   rounded-2xl shadow-2xl flex flex-col items-center fixed left-215 top-30 border border-blue-300/40">

            <div v-for="request in requests" :key="request.id"
                class="w-9/10 my-4 p-4 bg-white/10 backdrop-blur-md rounded-lg shadow-lg hover:shadow-blue-500/40 transition-all duration-200">

                <h2 class="text-xl font-semibold text-blue-100">
                    {{ request.name }} <span class="text-blue-300">หัวข้อ:</span> {{ request.title }}
                </h2>
                <p class="text-sm mt-2 text-blue-200">{{ request.detail }}</p>

                <!-- 🕓 แสดงเวลา -->
                <p v-if="request.createdAt" class="text-xs mt-2 text-blue-300 italic">
                    เวลาที่ส่งคำขอ: {{ formatTime(request.createdAt) }}
                </p>

                <div class="flex gap-3 mt-4">
                    <button @click="acceptShow(request)" class="px-4 py-2 text-sm font-medium bg-emerald-500 rounded-lg hover:bg-emerald-600 
                               transition duration-150 shadow-md">
                        อนุมัติการโพสต์
                    </button>
                    <button @click="useRequest().removeRequest(request.id); declineShow()" class="px-4 py-2 text-sm font-medium bg-rose-500 rounded-lg hover:bg-rose-600 
                               transition duration-150 shadow-md">
                        ไม่อนุมัติการโพสต์
                    </button>
                </div>
            </div>

            <div v-if="requests.length === 0" class="text-blue-200 mt-8">
                <p>ไม่มีรายการคำขอในขณะนี้</p>
            </div>
        </div>
    </div>
</template>
