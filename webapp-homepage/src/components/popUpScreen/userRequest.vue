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
  <!-- pop-up edit form -->
  <form
    v-if="isEdit"
    @submit.prevent="editRequest"
    class="min-h-150 min-w-150 bg-white/95 rounded-2xl shadow-2xl flex flex-col items-center justify-center fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-6 border border-sky-200 z-50 transition-all duration-300"
  >
    <h2 class="text-2xl font-bold text-sky-600 mb-1">
      ✏️ แก้ไขโพสต์ของ {{ selectedRequest.name }}
    </h2>
    <h2 class="text-lg font-semibold text-gray-600 mb-4">
      หัวข้อเดิม: {{ selectedRequest.title }}
    </h2>

    <div class="flex flex-col w-full items-center justify-center gap-3">
      <h2 class="text-base font-semibold text-sky-500">หัวข้อใหม่ :</h2>

      <select
        v-model="inputTitle"
        class="p-2 w-full h-12 bg-gray-100 rounded-lg border-2 border-gray-300 text-gray-700 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none transition-all duration-200"
      >
        <option disabled value="">เลือกหัวข้อใหม่ (Select Title)</option>
        <option v-for="subject in subjects" :key="subject.id" :value="subject.name">
          &nbsp;&nbsp;{{ subject.name }}
        </option>
      </select>

      <h2 class="text-base font-semibold text-sky-500">รายละเอียดใหม่ :</h2>
      <textarea
        v-model="inputDetail"
        placeholder="&nbsp;&nbsp;รายละเอียดใหม่ (Detail)"
        rows="3"
        class="w-full p-3 bg-gray-100 px-3 rounded-lg border-2 border-gray-300 text-gray-700 resize-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none transition-all duration-200"
      ></textarea>
    </div>

    <div class="flex gap-4 mt-6">
      <button
        type="submit"
        class="px-5 py-2 text-sm font-medium bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-md"
      >
        ✅ ยืนยัน
      </button>
      <button
        type="button"
        @click="editShow()"
        class="px-5 py-2 text-sm font-medium bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:from-red-600 hover:to-rose-700 transition-all duration-200 shadow-md"
      >
        ❌ ยกเลิก
      </button>
    </div>
  </form>

  <!-- body -->
  <div
    v-for="userRequest in userRequests"
    :key="userRequest.id"
    class="px-5 py-3 bg-white rounded-2xl border border-sky-100 shadow-md hover:shadow-lg transition-all duration-200 mt-5"
  >
    <h2 class="text-lg font-semibold text-sky-700">
      📘 {{ userRequest.name }} - หัวข้อ: {{ userRequest.title }}
    </h2>
    <p class="text-sm text-gray-600 mt-1">
      {{ userRequest.detail }}
    </p>

    <div class="flex gap-3 mt-3">
      <button
        @click="editShow(userRequest)"
        class="px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-blue-500 to-sky-600 text-white rounded-lg hover:from-blue-600 hover:to-sky-700 transition-all duration-200 shadow-sm"
      >
        ✏️ แก้ไขโพสต์
      </button>
      <button
        @click="useUserRequest().removeUserRequest(userRequest.id)"
        class="px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-sm"
      >
        🗑️ ลบโพสต์
      </button>
    </div>
  </div>
</template>
