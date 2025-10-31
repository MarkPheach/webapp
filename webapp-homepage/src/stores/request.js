import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRequest = defineStore('request', () => {
  const requests = ref([
    {
        id: 1,
        name: 'Kanathat',
        title: 'คณิตศาสตร์',
        detail: 'ต้องการติวคณิตศาสตร์ ม.ปลาย'
    },
    {
        id: 2,
        name: 'Jakree',
        title: 'Web Development',
        detail: 'ไม่ต้องการติด F'
    },
    {
        id: 3,
        name: 'Hacker',
        title: 'คณิตศาสตร์',
        detail: 'หาหนังสือติวคณิตสอบเข้า ม.4'
    },
  ])

  return { requests};
})