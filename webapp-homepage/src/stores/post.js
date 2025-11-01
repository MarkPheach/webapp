import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePost = defineStore('post', () => {
  const posts = ref([
    {
        id: 1,
        title: 'คณิตศาสตร์',
        review: '4.5',
        detail: 'ต้องการติวคณิตศาสตร์ ม.ปลาย',
        comment: ['อย่าติวเลย สอบไม่ผ่านอยู่แล้ว','พี่รับครับ คืนละ 1500']
    },
    {
        id: 2,
        title: 'Web Development',
        review: '2',
        detail: 'ไม่ต้องการติด F',
        comment: ['ผมเป็นเก']
    },
    {
        id: 3,
        title: 'คณิตศาสตร์',
        review: '6',
        detail: 'หาหนังสือติวคณิตสอบเข้า ม.4',
        comment: ['มาติวกับพี่ดีกว่าน้อง','wartunder มั้ยเพื่อน']
    },
  ])

  return { posts };
})