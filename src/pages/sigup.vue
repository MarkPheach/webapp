<script setup></script>

<template>
    <div class="container">
        <div class="left-block">
            Welcome to Umamusume
        </div>
        <div class="right-block">
            <div class="signup-form-container">
                <button class="back-btn" onclick="window.history.back()">
                    <i class="fa fa-arrow-left"></i>
                </button>
                <h2>Sign Up</h2>
                <form class="signup-form">
                    <label for="studentid">รหัสนักศึกษา</label>
                    <input type="text" id="studentid" name="studentid" required>

                    <label for="kkumail">KKUMail</label>
                    <input type="email" id="kkumail" name="kkumail" required>

                    <label for="password">รหัสผ่าน</label>
                    <input type="password" id="password" name="password" required>

                    <label for="confirm-password">ยืนยันรหัสผ่าน</label>
                    <input type="password" id="confirm-password" name="confirm-password" required>

                    <label for="major">เลือกสาขา</label>
                    <select id="major" name="major" required>
                        <option value="" disabled selected>เลือกสาขา</option>
                        <option value="CS">CS</option>
                        <option value="CY">CY</option>
                        <option value="AI">AI</option>
                        <option value="IT">IT</option>
                        <option value="GIS">GIS</option>
                    </select>

                    <button type="submit" class="signup-btn">สมัคร</button>
                </form>
            </div>
        </div>
    </div>
</template>