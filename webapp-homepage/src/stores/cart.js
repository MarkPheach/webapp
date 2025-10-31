import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCart = defineStore('cart', () => {
  const carts = ref([
    {
        id: 1,
        name: 'Wizly',
        price: '120',
        detail: 'จิบิ'
    },
    {
        id: 2,
        name: 'Sunny',
        price: '150',
        detail: 'จิบิ'
    },
    {
        id: 3,
        name: 'Rainy',
        price: '150',
        detail: 'จิบิ'
    },
  ])

  return { carts};
})