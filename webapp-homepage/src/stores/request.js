import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserDummy } from './userDummy'

export const useRequest = defineStore('request', () => {
  const requests = ref([
    {
        id: 1,
        name: 'Kanathat',
        title: 'คณิตศาสตร์',
        review: 0,
        detail: 'ต้องการติวคณิตศาสตร์ ม.ปลาย',
        comment: []
    },
    {
        id: 2,
        name: 'Jakree',
        title: 'Web Development',
        review: 0,
        detail: 'ไม่ต้องการติด F',
        comment: []
    },
    {
        id: 3,
        name: 'นาย สมชาย ใจดี',
        title: 'คณิตศาสตร์',
        review: 0,
        detail: 'หาหนังสือติวคณิตสอบเข้า ม.4',
        comment: []
    },
  ])

  //addRequest
  const addRequest = (newRequest) => {
    requests.value.push(newRequest);
    console.log('เพิ่มคำขอใหม่:', newRequest);
  };

  // removeRequest
  const removeRequest = (requestId) => {
    const index = requests.value.findIndex(r => r.id === requestId);
    if (index !== -1) {
      requests.value.splice(index, 1);
      console.log(`Request ID: ${requestId} ถูกลบแล้ว`);
    }
  };

  // editRequest
  const editRequest = (requestId, updatedData) => {
    const request = requests.value.find(r => r.id === requestId); // เข้าถึง .value
    
    if (request) {
      // ใช้ Object.assign เพื่ออัพเดต properties ใน reactive object โดยตรง
      Object.assign(request, updatedData); 
      console.log(`Request ID: ${requestId} ถูกแก้ไขแล้ว`, updatedData);
    }
  };

  return { requests , removeRequest , addRequest , editRequest };
})

export const useUserRequest = defineStore('userRequest', () => {
  const userRequests = computed(() => {
    return useRequest().requests.filter(request => 
      request.name === useUserDummy().userDummys[0].name
    );
  });

  const removeUserRequest = (requestId) => {
    useRequest().removeRequest(requestId);
  };

  const editUserRequest = (requestId, updatedData) => {
    useRequest().editRequest(requestId, updatedData);
  };
  return { userRequests, removeUserRequest, editUserRequest };
})