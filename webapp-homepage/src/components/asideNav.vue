<template>
  <aside
    class="fixed left-0 min-h-[calc(100vh-10vh)] max-w-[20vw] bg-sky-50 flex flex-col items-center">

    <!-- user detail -->
    <div class="h-[180px] w-[95%] rounded-xl bg-white flex flex-col justify-center my-5 px-2">
      <h1 class="w-[90%]">Name : UserName</h1>
      <h3 class="w-[90%]">StudentID : studentID</h3>
      <h3 class="w-[90%]">StudentFact : studentFaculty</h3>
      <h3 class="w-[90%]">StudentDept : studentDepartment</h3>
    </div>

    <!-- page -->
    <div class="flex flex-col my-5 px-2 w-[95%]"> 
      <ul>
        <router-link to="/HomeInventory">
          <li class="text-indigo-900 text-3xl hover:text-4xl transition duration-300">
            <button>Inventory</button>
          </li>
        </router-link>
        <router-link to="/HomeShop">
          <li class="text-indigo-900 text-3xl hover:text-4xl transition duration-300">
            <button>Shop</button>
          </li>
        </router-link>
        <router-link to="/HomeCourse">
          <li class="text-indigo-900 text-3xl hover:text-4xl transition duration-300">
            <button>Course</button>
          </li>
        </router-link>
        <router-link to="/HomePage">
          <li class="text-indigo-900 text-3xl hover:text-4xl transition duration-300">
            <button>Home</button>
          </li>
        </router-link>
      </ul>
    </div>
  </aside>
</template>

<script setup>
</script>
