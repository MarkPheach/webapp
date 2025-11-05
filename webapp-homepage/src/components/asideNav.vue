<template>
  <aside
    class="fixed left-0 top-[10vh] h-[90vh] w-[15vw] bg-gradient-to-b from-blue-900 to-blue-700 flex flex-col items-center text-white shadow-2xl rounded-tr-2xl">

    <!-- user detail -->
    <div
      class="w-[90%] bg-white/10 backdrop-blur-md rounded-2xl flex flex-col justify-center items-start my-5 p-3 text-xs shadow-md">

      <!--Profile-->
      <div class="flex flex-col items-center w-full">
        <Tooltip content="ดูโปรไฟล์ของคุณ" placement="right">
          <v-avatar size="60" class="mb-3 shadow-lg cursor-pointer">
            <v-img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"></v-img>
          </v-avatar>
        </Tooltip>
      </div>

      <h1 class="font-semibold text-base mb-1">👤 UserName</h1>
      <p>ID: <span class="text-blue-200">studentID</span></p>
      <p>Faculty: <span class="text-blue-200">studentFaculty</span></p>
      <p>Department: <span class="text-blue-200">studentDepartment</span></p>
    </div>

    <!-- page menu -->
    <nav class="w-[90%] mt-3">
      <ul class="flex flex-col gap-3">
        <router-link to="/HomePage">
          <li
            class="text-white text-lg font-medium py-2 px-3 rounded-xl bg-white/5 hover:bg-white/20 hover:scale-105 hover:shadow-md transition-all duration-300 text-center">
            HOME
          </li>
        </router-link>

        <router-link to="/HomeInventory">
          <li
            class="text-white text-lg font-medium py-2 px-3 rounded-xl bg-white/5 hover:bg-white/20 hover:scale-105 hover:shadow-md transition-all duration-300 text-center">
            INVENTORY
          </li>
        </router-link>

        <router-link to="/HomeShop">
          <li
            class="text-white text-lg font-medium py-2 px-3 rounded-xl bg-white/5 hover:bg-white/20 hover:scale-105 hover:shadow-md transition-all duration-300 text-center">
            SHOP
          </li>
        </router-link>

        <router-link to="/HomeCourse">
          <li
            class="text-white text-lg font-medium py-2 px-3 rounded-xl bg-white/5 hover:bg-white/20 hover:scale-105 hover:shadow-md transition-all duration-300 text-center">
            COURSE
          </li>
        </router-link>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import Tooltip from './Tooltip.vue';
</script>
