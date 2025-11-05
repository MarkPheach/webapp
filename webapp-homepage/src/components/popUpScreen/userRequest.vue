<script setup>
import { ref } from 'vue';
import { useUserRequest } from '../../stores/request';
import { storeToRefs } from 'pinia';
import { useSubject } from "../../stores/subject";

const { userRequests } = storeToRefs(useUserRequest());
const { subjects } = storeToRefs(useSubject());
const selectedRequest = ref({});

const isEdit = ref(false);
const inputTitle = ref('');
const inputDetail = ref('');

function editShow(userRequest) {
    isEdit.value = !isEdit.value;

    if (isEdit.value) {
        selectedRequest.value = userRequest;
        inputTitle.value = userRequest.title;
        inputDetail.value = userRequest.detail;
    } else {
        selectedRequest.value = null;
        inputTitle.value = '';
        inputDetail.value = '';
    }
}

function editRequest() {
    if (selectedRequest.value) {
        const updatedRequest = {
            id: selectedRequest.value.id,
            name: selectedRequest.value.name,
            title: inputTitle.value,
            detail: inputDetail.value,
            review: 0,
            comment: []
        };
        useUserRequest().editUserRequest(selectedRequest.value.id, updatedRequest);

        editShow();
    }
}
</script>

<template>
    <!-- edit popUp -->
    <form v-if="isEdit" @submit.prevent="editRequest"
        class="min-h-150 min-w-150 bg-white rounded-lg shadow-md flex flex-col items-center justify-center fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 z-50">

        <h2 class="text-xl font-bold text-sky-500">
            การแก้ไขโพสของ {{ selectedRequest.name }}
        </h2>
        <h2 class="text-xl font-bold text-sky-300">
            ในหัวข้อ: {{ selectedRequest.title }}
        </h2>

        <div class="flex flex-col w-full items-center justify-center gap-3 mt-4">

            <!-- หัวข้อสำหรับ Dropdown (Title) -->
            <h2 class="text-xl font-bold text-sky-300">
                หัวข้อใหม่ :
            </h2>

            <!-- DROP DOWN BOX (แทนที่ input type="text") -->
            <select v-model="inputTitle"
                class="p-2 w-full h-12 bg-gray-100 rounded-lg border-2 border-gray-300 text-gray-700 focus:ring-blue-500 focus:border-blue-500">

                <option disabled value="">เลือกหัวข้อใหม่ (Select Title)</option>

                <!-- ต้องมีตัวแปร `subjects` ที่ถูกดึงมาจาก Pinia Store หรือ ref() -->
                <option v-for="subject in subjects" :key="subject.id" :value="subject.name">
                    {{ subject.name }}
                </option>
            </select>

            <!-- หัวข้อสำหรับรายละเอียด (Detail) -->
            <h2 class="text-xl font-bold text-sky-300">
                แก้ไขรายละเอียด :
            </h2>

            <!-- TEXTAREA (รายละเอียด) ยังคงเดิม -->
            <textarea v-model="inputDetail" placeholder=" รายละเอียดใหม่ (Detail)" rows="3"
                class="w-full p-2 bg-gray-100 rounded-lg border-2 border-gray-300 resize-none"></textarea>
        </div>

        <div class="flex gap-4 mt-6">
            <!-- ใช้ type="submit" เพื่อให้ผูกกับ @submit.prevent ของ form -->
            <button type="submit"
                class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md">
                ยืนยัน
            </button>
            <button type="button" @click="editShow()"
                class="px-4 py-2 text-sm font-medium bg-red-500 rounded-lg hover:bg-red-600 transition duration-150 shadow-md">
                ยกเลิก
            </button>
        </div>
    </form>
    <!-- body -->
    <div v-for="userRequest in userRequests" :key="userRequest.id"
        class="px-3 py-1 bg-gray-300 rounded-2xl transition duration-150 shadow-sm mt-5">
        <h2 class="text-xl font-bold text-sky-700">{{ userRequest.name }} หัวข้อ: {{ userRequest.title }}</h2>
        <p class="text-sm mt-1">{{ userRequest.detail }}</p>

        <button @click="editShow(userRequest); console.log(selectedRequest);"
            class="px-4 py-2 text-sm font-medium bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md">
            แก้ไขโพส
        </button>
        <button @click="useUserRequest().removeUserRequest(userRequest.id);"
            class="px-4 py-2 text-sm font-medium bg-red-500 rounded-lg hover:bg-red-600 transition duration-150 shadow-md">
            ลบโพส
        </button>
    </div>
</template>