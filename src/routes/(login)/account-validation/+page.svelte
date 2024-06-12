
<script>
    import logo from "/src/lib/image/cyberpunk.jpg"
    // @ts-ignore
    let activeForm = 'SendEmail';
    import {
		auth,
		provider,
		signInWithPopup,
		// @ts-ignore
		signOut,
		providerface
		// @ts-ignore
	} from '/src/lib/firebase.client.js';
	import { onMount } from "svelte";
    function toggleForm(formName) {
    activeForm = formName;
    }
    let email = "";
    let password = "";
    let otp =[];
    let emailvalue=[];
	let emailgoogle = [];
	let username = [];
	let uid =[];
    let showAlert = false;
    let showconfirmAlert=false;
	let checkuid=["false"];
    let currentPath = '';
    export let form;
    console.log("otp dat : ",form)
    // if(form!=null){
    //     if(form.data.result!=null){ // if (form.data && form.data.result && form.data.result.otp) แก้แบบนี้
    //         otp=form.data.result.otp
    //         emailvalue.push( form.data.result.email)
    //         toggleForm('OTP')
    //     }
        
        
    // }
    if (form) {
		onMount(() => {
			if (form.success == true) {
				// รีไดเรกไปยังหน้าอื่นเมื่อฟอร์มส่งสำเร็จ
				if(form.role=="ADMIN"){
					console.log("ADMIN")
					window.location.assign("/admin/{admin_id}/role-management")
				}else if(form.role=="CUSTOMER"){
					console.log("CUSTOMER")
					window.location.assign("/customer/storeList")
				}else{
					console.log("STORE")
					window.location.assign("/store/{store_id}/product-management")
				}
			}else{
				if(form.data){
                        if(form.data.result){ // if (form.data && form.data.result && form.data.result.otp) แก้แบบนี้
                            otp.push(form.data.result.otp)
                            emailvalue.push( form.data.result.email)
                            if(form.success==false){
                                window.location.assign("/login")

                            }else{
                                toggleForm('OTP')
                                console.log("otp : ",otp)
                            }
                            
        }
                }
			}
            
		});
        
	}




    console.log("otp : ",otp)
    console.log("email : ",emailvalue)
    
    function checkOTP(){
        var otpInput = document.getElementById("OTP") ;
        // @ts-ignore
        var otpValue = otpInput.value;
        console.log(otpValue)
        console.log(otp)
        if(otp==otpValue){
            toggleForm('Resetpassword')
            otp.pop()
            console.log(otp)
        }else{
            alert(" OTP ไม่ถูกต้อง")
        }
    }
    
    const loginGoogle = async () => {
		try {
			var result = await signInWithPopup(auth, provider);
			console.log(result);
			emailgoogle.push(result.user.email);
			username.push(result.user.displayName);
			console.log(emailgoogle);
			console.log(username);
			// @ts-ignore
			document.getElementById('emailInput').value = emailgoogle[0];
			// @ts-ignore
			document.getElementById('nameInput').value = username[0];
			if (emailgoogle != null && username != null) {
				// @ts-ignore
				document.getElementById('myForm').submit();
			}
		} catch (error) {
			console.error('Error logging in with Google: ', error);
			return (status = 'false');
		}
	};

	console.log(emailgoogle, ' ', username);

	const logout = async () => {
	  try {

		//line
		localStorage.removeItem('profile');
    	sessionStorage.removeItem('profile');

	//google facebook
	    await signOut(auth);
		
	  } catch (error) {
	    console.error("Error signing out: ", error);
	  }

	};

	const facebook = async () => {
		// @ts-ignore
		let displayname = '';
		try {
			var result = await signInWithPopup(auth, providerface);

			console.log(result);
			emailgoogle.push(result.user.email);
			username.push(result.user.displayName);
			console.log(emailgoogle);
			console.log(username);
			// @ts-ignore
			document.getElementById('emailInputfacebook').value = emailgoogle[0];
			// @ts-ignore
			document.getElementById('nameInputfacebook').value = username[0];
			if (emailgoogle != null && username != null) {
				// @ts-ignore
				document.getElementById('myfacebookForm').submit();
			}
		} catch (error) {
			console.error('Error logging in with Facebook: ', error);
		}
	};
	
	let lineLoginUrl = 'https://access.line.me/oauth2/v2.1/authorize';
let clientId = '2005541373';
let redirectUri = 'http://localhost:5173/login';
let state = 'randomState';
let scope = 'profile%20openid%20email';

let loginUrl = generateLoginUrl(lineLoginUrl, clientId, redirectUri, state, scope);

	function generateLoginUrl(lineLoginUrl, clientId, redirectUri, state, scope) {
		console.log(scope)
    return `${lineLoginUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;

	
}


const line = async () => {
			window.location.replace(loginUrl);
			console.log("1")
	
	};
    
    function validatePasswords(event) {
		// @ts-ignore
		var password = document.getElementById('password').value;
		// @ts-ignore
		var confirmPassword = document.getElementById('confirm-password').value;

		if (password !== confirmPassword || password.length <= 8 ) {
            event.preventDefault();
            alert("รหัสไม่ตรงกัน หรือ น้อยกว่า 8 ตัว")
		} else {
            alert("รหัสตรงกัน")
		}
	}

    function checkPassword() {
        let hasUpperCase = /[A-Z]/.test(password); // เช็คว่ามีตัวใหญ่หรือไม่
        let hasLowerCase = /[a-z]/.test(password); // เช็คว่ามีตัวเล็กหรือไม่
        let hasSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password); // เช็คว่ามีอักขระพิเศษหรือไม่
		if (password.length > 8 && hasUpperCase && hasLowerCase) {
			showAlert = false; // ตั้งค่าตัวแปร showAlert เป็น true เพื่อแสดงข้อความเตือน
		}else {
			showAlert = true; // ถ้ารหัสผ่านมีความยาวมากกว่าหรือเท่ากับ 8 ตัวอักษร ก็ปิดการแสดงข้อความเตือน
		}
	}
    </script>
    
    {#if activeForm === 'SendEmail'}
    <div class="content-center" >
        <div class="form-container"  >
            <div class="d-flex justify-content-center" style="margin-top:20%">
                <img src="{logo}" style="width:140px;height:140px;border-radius:75%">
            </div>
            <div style="text-align:center;margin-top:10px" > 
            <h5 class="fw-bold">เข้าสู่ระบบ</h5>
            <h6 style="font-size:10px;margin-top:12px" class="text-black-50">ยินดีต้อนรับเข้าสู่ เว็บไซต์ Payso Shop</h6>
            </div>
            <form method="POST" action="?/OTP">
            <div style="margin:20px 70px 20px 70px" >
                <h6 style="font-size:16px;">อีเมล :</h6>
                <div>
                <input type="email" id="email" name="email" class="my-2" maxlength="100" placeholder="example@email.com" style="margin: 0px 0px 10px 0px;border-radius:8px;width:100%;height:40px;padding-left: 10px;" >
                </div>
               
                <button class="bg-primary" style="width:100%;margin-top:10px;border-radius:10px;height:40px;border:none;color:aliceblue" >ยืนยัน</button>
                <div class="d-flex justify-content-center">
                    <h6 style="font-size:13px;margin-top:35px">มีบัญชีแล้วใช่หรือไม่ ?<a style="margin-left:10px" href="/login">เข้าสู่ระบบ</a></h6>
                </div></form>
                <div class="d-flex justify-content-center mt-3">
                    <button class="border border-3 boxlogin" on:click={loginGoogle}
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.8em"
                            height="1.8em"
                            viewBox="0 0 256 262"
                            {...$$props}
                        >
                            <path
                                fill="#4285f4"
                                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                            />
                            <path
                                fill="#34a853"
                                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                            />
                            <path
                                fill="#fbbc05"
                                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                            />
                            <path
                                fill="#eb4335"
                                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                            />
                        </svg></button
                    >
                    <form id="myForm" method="post" action="?/signInWithGoogle">
                        <input type="text" hidden name="email" id="emailInput" />
                        <input type="text" hidden name="name" id="nameInput" />
                    </form>
                    <button class="border border-3 boxlogin" on:click={facebook}
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2em"
                            height="2em"
                            viewBox="0 0 256 256"
                            {...$$props}
                        >
                            <path
                                fill="#1877f2"
                                d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
                            />
                            <path
                                fill="#fff"
                                d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165z"
                            />
                        </svg></button
                    >
                    <form id="myfacebookForm" method="post" action="?/signInWithGoogle">
                        <input type="text" hidden name="email" id="emailInputfacebook" />
                        <input type="text" hidden name="name" id="nameInputfacebook" />
                    </form>
                    <buuton class="boxlogin" on:click={line} ><a ><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
                        <path fill="#00c300" d="M12.5,42h23c3.59,0,6.5-2.91,6.5-6.5v-23C42,8.91,39.09,6,35.5,6h-23C8.91,6,6,8.91,6,12.5v23C6,39.09,8.91,42,12.5,42z"></path><path fill="#fff" d="M37.113,22.417c0-5.865-5.88-10.637-13.107-10.637s-13.108,4.772-13.108,10.637c0,5.258,4.663,9.662,10.962,10.495c0.427,0.092,1.008,0.282,1.155,0.646c0.132,0.331,0.086,0.85,0.042,1.185c0,0-0.153,0.925-0.187,1.122c-0.057,0.331-0.263,1.296,1.135,0.707c1.399-0.589,7.548-4.445,10.298-7.611h-0.001C36.203,26.879,37.113,24.764,37.113,22.417z M18.875,25.907h-2.604c-0.379,0-0.687-0.308-0.687-0.688V20.01c0-0.379,0.308-0.687,0.687-0.687c0.379,0,0.687,0.308,0.687,0.687v4.521h1.917c0.379,0,0.687,0.308,0.687,0.687C19.562,25.598,19.254,25.907,18.875,25.907z M21.568,25.219c0,0.379-0.308,0.688-0.687,0.688s-0.687-0.308-0.687-0.688V20.01c0-0.379,0.308-0.687,0.687-0.687s0.687,0.308,0.687,0.687V25.219z M27.838,25.219c0,0.297-0.188,0.559-0.47,0.652c-0.071,0.024-0.145,0.036-0.218,0.036c-0.215,0-0.42-0.103-0.549-0.275l-2.669-3.635v3.222c0,0.379-0.308,0.688-0.688,0.688c-0.379,0-0.688-0.308-0.688-0.688V20.01c0-0.296,0.189-0.558,0.47-0.652c0.071-0.024,0.144-0.035,0.218-0.035c0.214,0,0.42,0.103,0.549,0.275l2.67,3.635V20.01c0-0.379,0.309-0.687,0.688-0.687c0.379,0,0.687,0.308,0.687,0.687V25.219z M32.052,21.927c0.379,0,0.688,0.308,0.688,0.688c0,0.379-0.308,0.687-0.688,0.687h-1.917v1.23h1.917c0.379,0,0.688,0.308,0.688,0.687c0,0.379-0.309,0.688-0.688,0.688h-2.604c-0.378,0-0.687-0.308-0.687-0.688v-2.603c0-0.001,0-0.001,0-0.001c0,0,0-0.001,0-0.001v-2.601c0-0.001,0-0.001,0-0.002c0-0.379,0.308-0.687,0.687-0.687h2.604c0.379,0,0.688,0.308,0.688,0.687s-0.308,0.687-0.688,0.687h-1.917v1.23H32.052z"></path>
                        </svg> </a></buuton>
        
                        <form id="mylineForm" method="post" action="?/signInWithLine">
                            <input type="text" hidden name="uid" id="emailInputline" />
                            <input type="text" hidden name="name" id="nameInputline" />
                        </form>
                </div>
            </div>
        </div>
   

    
     {/if}
    {#if activeForm === 'OTP'}
    <div class="content-center" >
        <div class="form-container" >
            <div class="d-flex justify-content-center" style="margin-top:20%">
                <img src="{logo}" style="width:140px;height:140px;border-radius:75%">
            </div>
            <div style="text-align:center;margin-top:10px" > 
            <h5 class="fw-bold">เข้าสู่ระบบ</h5>
            <h6 style="font-size:10px;margin-top:12px" class="text-black-50">ยินดีต้อนรับเข้าสู่ เว็บไซต์ Payso Shop</h6>
            </div>
            <div style="margin:20px 70px 20px 70px" >
                <h6 style="font-size:16px;">OTP :</h6>
                <div>
                <input type="text" id="OTP" class="my-2" maxlength="6" name="OTP" placeholder="OTP" style="margin: 0px 0px 10px 0px;border-radius:8px;width:100%;height:40px;padding-left: 10px;" >
                </div>
               
                <button class="bg-primary" style="width:100%;margin-top:10px;border-radius:10px;height:40px;border:none;color:aliceblue" on:click={() => checkOTP()}>ยืนยัน</button>
        
            </div>
        </div>
    </div>
     {/if}
     {#if activeForm === 'Resetpassword'}
     <div class="content-center" >
        <div class="form-container"  >
            <div class="d-flex justify-content-center" style="margin-top:20%">
                <img src="{logo}" style="width:140px;height:140px;border-radius:75%">
            </div>
            <div style="text-align:center;margin-top:10px" > 
            <h5 class="fw-bold">เข้าสู่ระบบ</h5>
            <h6 style="font-size:10px;margin-top:12px" class="text-black-50">ยินดีต้อนรับเข้าสู่ เว็บไซต์ Payso Shop</h6>
            </div>
            <div style="margin:20px 70px 20px 70px" >
                <form method="post" action="?/ResetPassword" >
                    <input type="text" hidden name="email" value="{emailvalue}">
                <div>
                <h6 style="font-size:16px;">รหัสผ่านใหม่ :</h6>
                <input  type="password" class="my-2" id="password" maxlength="100" name="password" placeholder="password"  style="border-radius:8px;width:100%;height:40px;padding-left: 10px;" on:input={(event) => {
                    password = event.target.value;
                    checkPassword();
                }} required>
                {#if showAlert}
                <h6 style="color: red;">รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร และ ต้องมีอักษรตัวใหญ่ และ ตัวเล็ก</h6>
                {/if}
                </div>
                
                
                <div>
                    <h6 style="font-size:16px;" class="mt-2">ยืนยันรหัสผ่าน :</h6>
                    <input  type="password" class="my-2" id="confirm-password" maxlength="100" name="confirm-password" placeholder="password"  style="border-radius:8px;width:100%;height:40px;padding-left: 10px;" required>
                     {#if showconfirmAlert}
                     <h6 style="color: red;">รหัสผ่านไม่ตรงกัน</h6>
                     {/if}
                    </div>
               
                <button type="submit" class="bg-primary" style="width:100%;margin-top:10px;border-radius:10px;height:40px;border:none;color:aliceblue" on:click={validatePasswords} ><a style="color: aliceblue;">ยืนยัน</a></button>
            </form>
            </div>
        </div>
    </div>
     {/if}
    
    
    <style scoped>
    .boxlogin{
        border-radius:50px;
        width:40px;
        height:40px;
        display:flex;
        justify-content:center;
        align-items:center;
        margin-left:15px;
        border: 3px solid #ccc;
    }
    .content-center {
        display: flex;
        justify-content: start;
        align-items: center;
        min-height: 98vh;
        background-image: url('/src/lib/image/cyberpunk.jpg');
        background-size: cover;
        background-position: center;
    }

    .form-container {
        background-color: #fff;
        width: 90%;
        max-width: 600px;
        min-height: 850px;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        height:100%;
    }
     
    .form-container input {
        width: 100%;
		height: 40px;
		padding-left: 10px;
		border-radius: 8px;
		border: 1px solid #ccc;
		margin-bottom: 10px;
       
    }
     
    </style>
    
    