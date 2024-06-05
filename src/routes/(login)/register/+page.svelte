<script>
// @ts-nocheck

    import logo from '/src/lib/image/cyberpunk.jpg';
    // @ts-ignore
    let password = '';
    let showAlert = false;
    //ฟังชันก์ทำไว้เฉยๆ 
    function validatePasswords() {
            // @ts-ignore
            var password = document.getElementById('password').value;
            // @ts-ignore
            var confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert('รหัสผ่านไม่ตรงกัน');
                return false;
            }else{
                window.location.assign("/login");
                return true;
            }
            
    }
    
    function checkPassword() { 
    if (password.length < 6) {
      showAlert = true; // ตั้งค่าตัวแปร showAlert เป็น true เพื่อแสดงข้อความเตือน
    } else {
      showAlert = false; // ถ้ารหัสผ่านมีความยาวมากกว่าหรือเท่ากับ 6 ตัวอักษร ก็ปิดการแสดงข้อความเตือน
    }
  }

  export let form;
    console.log(form)
  
</script>



<div class="content-center">
    <div class="form-container">
        <form method="post" action="?/signUp">
        <div style="text-align: center; margin-top: 5%;">
            <img src={logo} alt="Logo">
        </div>
        <div>
            <h5 class="fw-bold" style="text-align: center;">สร้างบัญชีผู้ใช้</h5>
            <h6 class="text-black-50" style="text-align: center;">สร้างบัญชีผู้ใช้กับเว็บไซต์ของเรา</h6>
        </div>
        <div class="form-group">
            <h6>ชื่อ-นามสกุล :</h6>
            <input type="text" id="name" name="name" placeholder="ชื่อ - นามสกุล">
        </div>
        <div class="form-group">
            <h6>ที่อยู่ :</h6>
            <input type="text" id="address" name="address" placeholder="ที่อยู่">
        </div>
        <div class="form-group">
            <h6>อีเมล :</h6>
            <input type="email" id="email" name="email" placeholder="example@email.com">
        </div>
        <div class="form-group">
            <h6>เบอร์โทร :</h6>
            <input type="tel" id="tel" name="tel" placeholder="เบอร์โทร">
        </div>
        <div class="form-group">
            <h6>รหัสผ่าน :</h6>
            <input type="password" id="password" name="password" on:input={(event) => { password = event.target.value; checkPassword(); }} placeholder="รหัสผ่าน">
            {#if showAlert}
    <h6 style="color: red;">รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร</h6>
  {/if}
        </div>
        <div class="form-group">
            <h6>ยืนยันรหัสผ่าน :</h6>
            <input type="password" id="confirm-password" name="confirm-password" placeholder="ยืนยันรหัสผ่าน">
        </div>
        <button class="bg-primary" on:click={validatePasswords}>สมัครสมาชิก</button>
    </form>
        <div class="login-link">
            <h6>มีบัญชีแล้วใช่หรือไม่? <a href="/login">เข้าสู่ระบบ</a></h6>
        </div>
        <div class="social-login">
            <div class="boxlogin">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 256 262">
                    <path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" />
                    <path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" />
                    <path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z" />
                    <path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" />
                </svg>
            </div>
            <div class="boxlogin">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 256 256">
                    <path fill="#1877f2" d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445" />
                    <path fill="#fff" d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165z" />
                </svg>
            </div>
            <div class="boxlogin">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M18.664 10.84a.526.526 0 0 1-.526.525h-1.462v.938h1.463a.525.525 0 1 1 0 1.049H16.15a.526.526 0 0 1-.522-.524V8.852c0-.287.235-.525.525-.525h1.988a.526.526 0 0 1-.002 1.05h-1.463v.938h1.463c.29 0 .524.237.524.525m-4.098 2.485a.54.54 0 0 1-.166.025a.515.515 0 0 1-.425-.208l-2.036-2.764v2.45a.525.525 0 0 1-1.047 0V8.852a.522.522 0 0 1 .52-.523c.162 0 .312.086.412.211l2.052 2.775V8.852c0-.287.235-.525.525-.525c.287 0 .525.238.525.525v3.976a.524.524 0 0 1-.36.497m-4.95.027a.526.526 0 0 1-.523-.524V8.852c0-.287.235-.525.525-.525c.289 0 .524.238.524.525v3.976a.527.527 0 0 1-.526.524m-1.53 0H6.099a.528.528 0 0 1-.525-.524V8.852c0-.287.238-.525.525-.525c.29 0 .525.238.525.525v3.45h1.464a.525.525 0 0 1 0 1.05m3.915-10.78c-5.513 0-10 3.643-10 8.118c0 4.01 3.558 7.369 8.363 8.007c.325.068.769.215.881.492c.1.25.066.638.032.9l-.137.85c-.037.25-.2.988.874.537c1.076-.449 5.764-3.398 7.864-5.812C21.314 14.089 22 12.477 22 10.69c0-4.475-4.488-8.118-10-8.118" />
                </svg>
            </div>
        </div>
    </div>
</div>

<style>
    .content-center {
        display: flex;
        justify-content: start;
        align-items: center;
        min-height: 100vh;
        background-image: url('/src/lib/image/cyberpunk.jpg');
        background-size: cover;
        background-position: center;
    }

    .form-container {
        background-color: #fff;
        width: 90%;
        max-width: 400px;
        min-height: 400px;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .form-container img {
        width: 140px;
        height: 140px;
        border-radius: 50%;
    }

    .form-container .form-group {
        margin: 10px 0;
    }

    .form-container .form-group h6 {
        font-size: 14px;
        margin-bottom: 5px;
    }

    .form-container input {
        width: 100%;
        height: 40px;
        padding-left: 10px;
        border-radius: 8px;
        border: 1px solid #ccc;
        margin-bottom: 10px;
    }

    .form-container button {
        width: 100%;
        margin-top: 10px;
        border-radius: 10px;
        height: 40px;
        border: none;
        background-color: #007bff;
        color: #fff;
        font-size: 16px;
    }

    .form-container .login-link {
        text-align: center;
        margin-top: 20px;
    }

    .form-container .login-link a {
        color: #007bff;
        text-decoration: none;
        margin-left: 10px;
    }

    .social-login {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .boxlogin {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 3px solid #ccc;
        margin: 0 10px;
        cursor: pointer;
    }
</style>