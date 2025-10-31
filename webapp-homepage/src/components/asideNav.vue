<script setup>
</script>

<template>
    <aside class="fixed left-0 min-h-[calc(100vh_-_10vh)] max-w-[calc(100vw_-_80vw)] bg-blue-300 flex flex-col items-center">
        <!-- user detail -->
        <div class="h-45 w-19/20 rounded-xl bg-white flex flex-col justify-center my-5 px-2">
            <h1 class="w-9/10">Name : UserName</h1>
            <h3 class="w-9/10">StudentID : studentID</h3>
            <h3 class="w-9/10">StudentFact : studentFaculty</h3>
            <h3 class="w-9/10">StudentDept : studentDepartment</h3>
        </div>
        <!-- page -->
         <div class="h-55 w-19/20 flex flex-col my-5 px-2">
            <h1 class="my-4 font-bold text-3xl"></h1>
            <ul>
                <router-link to="/HomeInventory">
                                     <li class="text-white text-3xl hover:text-5xl  transition duration-300"><button>Inventory</button></li>
                </router-link>
                <router-link to="/HomeShop">
                    <li class="text-white text-3xl hover:text-5xl  transition duration-300"><button>Shop</button></li>
                </router-link>
                <li class="text-white text-3xl hover:text-5xl  transition duration-300"><button>Course</button></li>
                <router-link to="/HomePage">
                                     <li class="text-white text-3xl hover:text-5xl  transition duration-300"><button>Home</button></li>
                </router-link>
            </ul>
         </div>
    </aside>
</template>