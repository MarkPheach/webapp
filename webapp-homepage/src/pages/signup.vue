<script setup>
import { ref } from 'vue';
import router from '../router';
import { useUserStore } from '../stores/User.js';

const isuupdate = ref(false);
const userid    = ref('');
const userpassword  = ref('');
const useremail = ref('');
const userfact  = ref('');

const userStore = useUserStore();
const updatedsignupuser = () => {
    console.log("Signup user:", userid.value, useremail.value, userfact.value);
    isuupdate.value = true;
    // Store user data in Pinia store
    const userdata = {
        id: userid.value,
        email: useremail.value,
        password: userpassword.value,
        fact: userfact.value
    }
    userStore.setUser(userdata);
    router.push('/login');
}


</script>

<template>
  <div class="container">
    <!-- Left Block -->
    <div class="left-block">
      <h1>Welcome to CY PROJECT!</h1>
      <p>please register</p>
    </div>

    <!-- Right Block -->
    <div class="right-block">
      <div class="auth-form">
        <button class="back-btn"><router-link to="/login">← Back</router-link></button>

        <h2 style="margin-bottom: 20px;">Sign Up</h2>

        <form>
          <div class="input-group">
            <label for="studentid">รหัสนักศึกษา</label>
            <input type="text" v-model="userid" class="input-field" required />
          </div>

          <div class="input-group">
            <label for="kkumail">KKUMail</label>
            <input type="email" v-model="useremail" class="input-field" required />
          </div>

          <div class="input-group">
            <label for="password">รหัสผ่าน</label>
            <input type="password" v-model="userpassword" class="input-field" required />
          </div>

          <div class="input-group">
            <label for="confirm-password">ยืนยันรหัสผ่าน</label>
            <input type="password" class="input-field" required />
          </div>

          <div class="input-group">
            <label for="major">เลือกสาขา</label>
            <select v-model="userfact" id="major" name="major" class="input-field" required>
              <option value="" disabled selected>เลือกสาขา</option>
              <option value="CS">CS</option>
              <option value="CY">CY</option>
              <option value="AI">AI</option>
              <option value="IT">IT</option>
              <option value="GIS">GIS</option>
            </select>
          </div>

          <div class="button-group">
              <button @click="updatedsignupuser" type="submit" class="btn primary-btn"> สมัคร </button>
          </div>
          <!-- div>
            user store
            <div v-if="userStore.user">
            <div>id: {{ userStore.user.id }}</div>
            <div>email: {{ userStore.user.email }}</div>
            <div>fact: {{ userStore.user.fact }}</div>
            <div>password: {{ userStore.user.password }}</div>
                </div>
                <div v-else>
                    <p>No user yet</p>
                </div>
            </div -->
            <label >or sign up with</label>
        </form>
      </div>
    </div>
  </div>
</template>