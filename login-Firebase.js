        
        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
        import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
        import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";

        const firebaseConfig = {
            apiKey: "REMOVED",
            authDomain: "advanceas-d8db4.firebaseapp.com",
            databaseURL: "https://advanceas-d8db4-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "advanceas-d8db4",
            storageBucket: "advanceas-d8db4.firebasestorage.app",
            messagingSenderId: "878892786344",
            appId: "1:878892786344:web:33bb5a97d99daf049d189d",
            measurementId: "G-PLRRKT6RWW"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        const auth = getAuth(app);
        const db = getFirestore(app);

        // 将 login 函数定义为全局函数
        window.login = async function() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const messageDiv = document.getElementById('message');

            try {
                // 首先验证登录
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                
                // 然后从 Firestore 获取用户数据
                const userDocRef = doc(db, 'user', user.uid);
                const userDoc = await getDoc(userDocRef);
                
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    
                    // 更新最后登录时间
                    await updateDoc(userDocRef, {
                        lastLogin: new Date()
                    });
                    
                    // 存储用户 ID 和角色到 sessionStorage
                    sessionStorage.setItem('userID', userData.ID);
                    sessionStorage.setItem('role', userData.role);

                    // 根据角色跳转到不同的页面
                    if (userData.role === 'student') {
                        sessionStorage.setItem('studentID', userData.ID)
                        window.location.href = 'student_dashboard.html';
                    } else if (userData.role === 'lecturer') {
                        sessionStorage.setItem('lectureID', userData.ID);
                        window.location.href = 'lecturer_dashboard.html';
                    } else if (userData.role === "admin"){
                        sessionStorage.setItem('adminID', userData.ID);
                         window.location.href = 'admin_dashboard.html';
                    }else {
                        messageDiv.textContent = "unknown user";
                        messageDiv.style.color = "red";

                    }
                } else {
                    messageDiv.textContent = "Login successfull, but no data exist.";
                    messageDiv.style.color = "yellow";
                }
                
            } catch (error) {
                    console.error("Login error:", error);
                    const email = document.getElementById("email").value.trim();
                    const password = document.getElementById("password").value.trim();
                    const messageDiv = document.getElementById("message");

                    if(email === "" && password ===""){
                        messageDiv.textContent = "Email and password cannot be empty"
                        
                    }

                    else if (email === "") {
                       messageDiv.textContent = "Email cannot be empty";
                       
                     } else if (password === "") {
                        messageDiv.textContent = "Password cannot be empty";
                     } else {
                        
                         messageDiv.textContent = "Wrong email or password";
                     }
                 messageDiv.style.color = "red";
            }

        }
