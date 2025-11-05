import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSubject = defineStore('subject', () => {
  const subjects = ref([
  {
    id: 1,
    image: "../public/CoursePNG/AI.png",
    name: "AI",
    status: "เลือกวิชา",
  },
  {
    id: 2,
    image: "../public/CoursePNG/CALCULUS.png",
    name: "Math",
    status: "เลือกวิชา",
  },
  {
    id: 3,
    image: "../public/CoursePNG/DATABASE.png",
    name: "DATABASE",
    status: "เลือกวิชา",
  },
  {
    id: 4,
    image: "../public/CoursePNG/ENGINEER.png",
    name: "ENGINEER",
    status: "เลือกวิชา",
  },
  {
    id: 5,
    image: "../public/CoursePNG/NETWORK.png",
    name: "NETWORK",
    status: "เลือกวิชา",
  },
  {
    id: 6,
    image: "../public/CoursePNG/STRUCTURE_PROGRAMING.png",
    name: "SA",
    status: "เลือกวิชา",
  },
  {
    id: 7,
    image: "../public/CoursePNG/OS.png",
    name: "OS",
    status: "เลือกวิชา",
  },
  {
    id: 8,
    image: "../public/CoursePNG/WEBAPP.png",
    name: "WEBAPP",
    status: "เลือกวิชา",
  }])

  return { subjects }
});