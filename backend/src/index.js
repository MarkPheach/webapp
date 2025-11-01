const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const serviceAccount = require("../key/cp422021-673380167-8-firebase-adminsdk-fbsvc-1a26fe376f.json");
const bcrypt = require("bcrypt"); 
const saltrounds = 5;
const app = express();
const port = 3001;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const USERS_COLLECTION = 'Account';

app.use(bodyParser.json());

// Register endpoint
app.post("/register", async (req, res) => {
  const { userName, password } = req.body; 
  if (!userName || !password) {
      return res.status(400).json({ success: false, message: "Username and password required." });
  }

  try {
    const userSnapshot = await db.collection(USERS_COLLECTION).where('UserName', '==', userName).get();
    if (!userSnapshot.empty) {
        return res.status(409).json({ success: false, message: "Username already registered." });
    }

    // เข้ารหัสรหัสผ่านก่อนบันทึก
    const hashedPassword = await bcrypt.hash(password, saltrounds);

    // บันทึกข้อมูลลง Firestore
    const docRef = await db.collection(USERS_COLLECTION).add({
      UserName: userName,
      Password: hashedPassword, // บันทึกรหัสผ่านที่ถูกเข้ารหัสแล้ว
    });
    
    res.status(201).json({ success: true, message: "Register success.", docId: docRef.id });

  } catch (error) {
    console.error("Registration Error:", error); 
    res.status(500).json({ success: false, message: "Register failed due to server error." });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
    const { userName, password } = req.body; 

    if (!userName || !password) {
        return res.status(400).json({ success: false, message: "Username and password are required." });
    }

    try {
        // ค้นหาผู้ใช้ใน Firestore
        const userSnapshot = await db.collection(USERS_COLLECTION)
                                     .where('UserName', '==', userName)
                                     .limit(1)
                                     .get();

        // ตรวจสอบว่าพบผู้ใช้หรือไม่
        if (userSnapshot.empty) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }

        const userData = userSnapshot.docs[0].data();
        const storedHash = userData.Password;
        // 6. ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, storedHash);

        if (isMatch) {
            res.status(200).json({ 
                success: true, 
                message: "Login successful"
            });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials." });
        }

    } catch (error) {
        console.error("Login attempt error:", error);
        return res.status(500).json({ success: false, message: "Server error during authentication." });
    }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
