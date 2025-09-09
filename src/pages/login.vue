<script setup>
</script>

<template>
  <div class="container">
    <!-- Left Block -->
    <div class="left-block">
      <h1>Welcome to CY PROJECT!</h1>
      <p>This the place you going to login.</p>
    </div>

    <!-- Right Block -->
    <div class="right-block">
      <img src="../assets/1.-official-logo-2022-26.png" alt="Umamusume Logo" class="logo">

      <form class="auth-form">
        <div class="input-group">
          <input type="text" placeholder="Username" class="input-field">
        </div>
        <div class="input-group">
          <input type="password" placeholder="Password" class="input-field">
        </div>

        <!-- Remember + Forgot -->
        <div class="options-row">
          <label class="remember-me">
            <input type="checkbox" /> Remember password
          </label>
          <a href="#" class="forgot-link">Forgot password?</a>
        </div>

        <div class="button-group">
            <router-link to="/">
              <button type="submit" class="btn primary-btn">Login</button>
            </router-link>
          <router-link to="/signup">
            <button type="button" class="btn secondary-btn">Sign Up</button>
          </router-link>
        <div>
          <label >or login with</label>
        </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
/* ===== Login Styles ===== */
.container {
  display: flex;
  height: 100vh;
}

.left-block {
  flex: 1;
  background: #2196f3;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.right-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.logo {
  width: 200px;
  margin-bottom: 20px;
}

.auth-form {
  width: 100%;
  max-width: 300px;
}

.input-group {
  margin-bottom: 15px;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn {
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.primary-btn {
  background: #2196f3;
  color: white;
}

.secondary-btn {
  background: #f0f0f0;
}

.options-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9em;
  margin-bottom: 15px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 400;
}

.forgot-link {
  color: #4b7bd4;
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
}
</style>
