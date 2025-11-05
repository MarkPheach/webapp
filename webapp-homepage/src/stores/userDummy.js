import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserDummy = defineStore("userDummy", () => {
  const userDummys = ref([
    {
      id: 1,
      StdID: "673380000-0",
      name: "นาย สมชาย ใจดี",
      point: '5000',
    },
  ]);

  return { userDummys };
});
