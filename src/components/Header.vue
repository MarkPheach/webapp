<template>
    <div>
        <header class="header">
            <h1>Welcome I sud</h1>
            <button class="logout">LOG OUT</button>
        </header>
        <main>
            <p>
                Welcome to Home_Page_Test Mister backend!
            </p>
        </main>
    </div>
</template>
<style scoped>
.header {
position: fixed;     
  top: 0;    
  left: 0;
  width: 100%; 
  z-index: 1000; 
    display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f2f2f2;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
}
.logout {
  margin-right: 50px;
  padding: 10px 20px;
  background-color: #4b7bd4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family:fantasy;
  font-size: 20px;
}
.content {
  padding-top: 70px; /* เว้นพื้นที่ให้ header ที่ fixed */
}
</style>