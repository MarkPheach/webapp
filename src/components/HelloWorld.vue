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

<style>
body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #f4f6fb;
        }
        .container {
            display: flex;
            min-height: 100vh;
        }
        .left-block {
            background: #2196f3;
            flex: 0 0 60%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 2.2rem;
            font-weight: 600;
            letter-spacing: 1px;
        }
        .right-block {
            background: #fff;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        .signup-form-container {
            width: 100%;
            max-width: 370px;
            padding: 32px 28px 24px 28px;
            border-radius: 10px;
            background: #fff;
            position: relative;
        }
        .back-btn {
            position: absolute;
            top: 18px;
            left: 18px;
            background: none;
            border: none;
            font-size: 1.3rem;
            color: #2196f3;
            cursor: pointer;
        }
        .signup-form-container h2 {
            text-align: center;
            margin-bottom: 28px;
            font-weight: 700;
            color: #222;
        }
        .signup-form label {
            display: block;
            margin-bottom: 7px;
            font-size: 1rem;
            color: #333;
        }
        .signup-form input,
        .signup-form select {
            width: 100%;
            padding: 9px 10px;
            margin-bottom: 18px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;
            background: #fafbfc;
        }
        .signup-form select {
            margin-bottom: 28px;
        }
        .signup-btn {
            width: 20%;
            padding: 11px;
            background: #2196f3;
            color: #fff;
            border: none;
            border-radius: 4px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            margin: 0 auto;
        }
        @media (max-width: 900px) {
            .container { flex-direction: column; }
            .left-block { flex-basis: 180px; min-height: 180px; justify-content: flex-start; font-size: 1.3rem; padding: 32px 0 0 32px;}
            .right-block { flex: 1; min-height: 400px;}
        }
</style>