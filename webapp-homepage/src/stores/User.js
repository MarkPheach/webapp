import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  // state
  const user = ref(null);

  // actions
  function setUser(u) {
    user.value = {
      id: u.id,
      email: u.email,
      password: u.password,
      fact: u.fact
    };
  }

  return { user, setUser };
});