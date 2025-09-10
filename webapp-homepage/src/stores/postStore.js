import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePostStore = defineStore('post', () => {
  const posts = ref([])

  function addPost(post) {
    posts.value.push(post)
  }

  return { posts, addPost }
})