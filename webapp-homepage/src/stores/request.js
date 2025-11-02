import { defineStore } from 'pinia'
import { ref } from 'vue'

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
        name: 'Hacker',
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

  return { requests , removeRequest , addRequest };
})