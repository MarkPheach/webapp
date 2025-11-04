<script setup>
import { ref } from "vue";
import { usePost } from "../stores/post";
const postStore = usePost();

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
  },
]);

function selectSubject(subject) {
  if (postStore.selectedSubject === subject.name) {
    postStore.selectedSubject = "ทั้งหมด";
  } else {
    postStore.selectedSubject = subject.name;
  }
}
</script>

<template>
  <main class="flex justify-around min-h-[calc(100vh-10vh)] bg-gradient-to-b from-sky-100 to-sky-200 pt-5">
    <div class="flex flex-col float-right min-w-[80vw] rounded-2xl mr-12 mt-3">
      
      <!-- TITLE -->
      <div class="bg-gradient-to-r from-blue-800 to-blue-600 text-white text-4xl font-bold w-fit px-10 py-4 rounded-2xl shadow-lg mb-8">
        เลือกรายวิชา
      </div>

      <!-- GRID CONTAINER -->
      <div class="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/40">
        <div class="grid grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
          <div
            v-for="subject in subjects"
            :key="subject.id"
            class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg w-44 mt-4 my-4 h-60 flex flex-col items-center justify-between text-center p-3 border border-white/40 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-out"
          >
            <!-- IMAGE -->
            <img
              :src="subject.image"
              alt="subject image"
              class="w-full h-42 rounded-xl object-cover shadow-md border border-gray-200"
            />

            <!-- NAME -->
            <div class="flex flex-col items-center gap-2">
              <h2 class="font-semibold text-gray-800 text-base">
                {{ subject.name }}
              </h2>

              <!-- BUTTON -->
              <button
                @click="selectSubject(subject)"
                class="px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm transition duration-200"
                :class="{
                  'bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600':
                    postStore.selectedSubject === subject.name,
                  'bg-gradient-to-r from-blue-300 to-blue-400 text-white hover:from-blue-400 hover:to-blue-500':
                    postStore.selectedSubject !== subject.name,
                }"
              >
                {{
                  postStore.selectedSubject === subject.name
                    ? "ยกเลิก"
                    : "เลือกวิชา"
                }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
