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
    isAccpet.value = !isAccpet.value
    selectedRequest.value = request;
}

function confirmAccept() {
    if (selectedRequest.value) {
        usePost().insertPost(selectedRequest.value);
        useRequest().removeRequest(selectedRequest.value.id);

        acceptShow(); 
    }
}
</script>

<template>
    <div>
        <!-- popUp สำหรับยืนยันการโพส -->
        <div v-if="isAccpet"
            class="min-h-100 min-w-100 bg-sky-100 rounded-2xl shadow-2xl flex flex-col justify-center items-center fixed left-125 top-25 z-50">
            <h1>แน่ใจ๊?</h1>
            <button @click="confirmAccept"
                class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md">
                ยืนยันการอณุมัติ
            </button>
            <button @click="acceptShow"
                class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md">
                ยกเลิก
            </button>
        </div>
        
        <!-- body -->
        <div
            class="min-h-150 min-w-150 bg-sky-100 rounded-2xl shadow-2xl flex flex-col items-center fixed left-125 top-25">

            <!-- วนลูปในตัวแปร 'requests' -->
            <div v-for="request in requests" :key="request.id" class="w-9/10 my-4 p-3 bg-white rounded-lg shadow-md">
                <h2 class="text-xl font-bold text-sky-700">{{ request.name }} หัวข้อ: {{ request.title }}</h2>
                <p class="text-sm mt-1">{{ request.detail }}</p>

                <button @click="acceptShow(request)"
                    class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md">
                    อนุมัติการโพสต์
                </button>
                <button @click="useRequest().removeRequest(request.id);"
                    class="px-4 py-2 text-sm font-medium bg-red-500 rounded-lg hover:bg-red-600 transition duration-150 shadow-md">
                    ไม่อนุมัติการโพสต์
                </button>
            </div>

            <!-- ตรวจสอบความยาวของ 'requests' -->
            <div v-if="requests.length === 0">
                <p>ไม่มีรายการคำขอในขณะนี้</p>
            </div>
        </div>
    </div>
</template>