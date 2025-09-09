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

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* Left Section */
.left-block {
  flex: 1;
  background: linear-gradient(135deg, #4b7bd4, #4b7bd4),
              url('../assets/umamusume-bg.jpg') center/cover no-repeat;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;
  text-align: center;
}

.left-block h1 {
  font-size: 3em;
  font-weight: 800;
  margin-bottom: 20px;
}

.left-block p {
  font-size: 1.2em;
  opacity: 0.95;
}

/* Right Section */
.right-block {
  flex: 1;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px;
}

/* Auth Card */
.auth-form {
  width: 100%;
  max-width: 420px;
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.08);
  position: relative;
}

/* Back button */
.back-btn {
  position: absolute;
  top: 18px;
  left: 18px;
  background: none;
  border: none;
  font-size: 1rem;
  color: #4b7bd4;
  cursor: pointer;
}

/* Form inputs */
.input-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-size: 0.9rem;
  margin-bottom: 6px;
  color: #333;
}

.input-field {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  transition: 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.input-field:focus {
  border-color: #4b7bd4;
  box-shadow: 0 0 0 3px rgba(75, 123, 212, 0.2);
  outline: none;
}

/* Buttons */
.button-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 10px;
}

.btn {
  width: 100%;
  padding: 14px;
  font-size: 1.1em;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease;
  text-align: center;
}

.primary-btn {
  background-color: #4b7bd4;
  color: white;
}

.primary-btn:hover {
  background-color: #3a64af;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .left-block, .right-block {
    width: 100%;
    padding: 30px;
  }

  .auth-form {
    padding: 30px;
  }
}
</style>
