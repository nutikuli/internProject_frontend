
<script>
import logo from "/src/lib/image/cyberpunk.jpg";
// @ts-ignore
import { auth, provider, signInWithPopup, signOut ,providerface} from "/src/lib/firebase.client.js";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  let email = "";
  let password = "";
  const user = writable(null);

  onMount(() => {
    auth.onAuthStateChanged((u) => {
      user.set(u);
    });
  });

  const loginGoogle = async () => {
    try {
     var result= await signInWithPopup(auth, provider);
    window.location.assign("/")
      console.log(result)
    } catch (error) {
      console.error("Error logging in with Google: ", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }

  };
  const facebook = async () => {
    try {
     var result= await signInWithPopup(auth, providerface);
     console.log(result)
     console.log(result.user.displayName)
     console.log(result.user.email)
     console.log(result.user.accessToken)
    } catch (error) {
      console.error("Error logging in with Facebook: ", error);
    }
  };

  const Login = async () => {
		console.log("checking login")
		console.log("email,pass:",email,"   ",password)
		let config = {
			method: 'POST', //การทำงาน get post update delete
			headers: {
        //ต้องใส่ไว้ตลอด
				'Access-Control-Allow-Origin': '*',  
				'Content-Type': 'application/json',
				'token': ''
			},
			body: JSON.stringify({
        //ข้อมูลที่ต้องการใส่ในDatabase จะโยงไปทำงานที่เขียนใน go ตรงจะเหมือนเราเอาข้อมูลไปวางไว้ตรง body raw postman แล้วข้อมูลจะเอาตามpath โดยข้อมูลจะรับผ่านหน้าเว็บแทน และคำสั่งที่ทำให้รับข้อมูลได้จากหน้าเว็บ bind:value={ตัวแปร}
        password:password,
        email:email
			})
		};
        
		var result = await fetch(`http://127.0.0.1:8080/api/v1/account/login`, config);
        const data = await result.json();
        console.log(data.token)
        console.log(data.email)
        window.location.href = "/" //ไปยังหน้าถัดไป
        // if(data.data){
		   sessionStorage.setItem('authToken', data.token);//ตัวส่งข้อมูลที่รับไปใช้ในหน้าอื่น
           sessionStorage.setItem('email', data.email);
          };
  
</script>



<div class="content-center">
    <div class="form-container" >
        <div class="d-flex justify-content-center" style="margin-top:20%">
            <img src="{logo}" style="width:140px;height:140px;border-radius:75%">
        </div>
        <div style="text-align:center;margin-top:10px" > 
        <h5 class="fw-bold">เข้าสู่ระบบ</h5>
        <h6 style="font-size:10px;margin-top:12px" class="text-black-50">ยินดีต้อนรับเข้าสู่ เว็บไซต์ Payso Shop</h6>
        </div>
        <div style="margin:20px 70px 20px 70px" >
            <h6 style="font-size:16px;">อีเมล :</h6>
            <div>
            <input type="email" bind:value={email} id="email" name="email" placeholder="example@email.com" style="margin: 0px 0px 10px 0px;border-radius:8px;width:100%;height:40px;padding-left: 10px;" >
            </div>
            <div>
            <h6 style="font-size:16px;">รหัสผ่าน :</h6>
            <input  type="password" bind:value={password} id="password" name="password" placeholder="password"  style="border-radius:8px;width:100%;height:40px;padding-left: 10px;">
            </div>
            <div style="margin-top:10px" class="d-flex w-100">
                <input type="checkbox"><h6 style="font-size:12px;margin-top:6px">จดจำฉันไว้ในระบบ</h6>
                <a style="font-size:12px;margin-left:45%" class="mt-1" href="/account-validation">ลืมรหัสผ่าน ?</a>
                
            </div>
            <button class="bg-primary" style="width:100%;margin-top:10px;border-radius:10px;height:40px;border:none;color:aliceblue" on:click={Login}>เข้าสู่ระบบ</button>
            <div class="d-flex justify-content-center">
            <h6 style="font-size:13px;margin-top:35px">ยังไม่มีบัญชีใช่หรือไม่ ?<a style="margin-left:10px" href="/register">สมัครบัญชี</a></h6>
            </div>
            <div class="d-flex justify-content-center mt-3">
                <button class="border border-3 boxlogin" on:click={loginGoogle}><svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 256 262" {...$$props}>
                    <path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" />
                    <path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" />
                    <path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z" />
                    <path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" />
                </svg></button>
                <button class="border border-3 boxlogin" on:click={facebook}><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 256 256" {...$$props}>
                    <path fill="#1877f2" d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445" />
                    <path fill="#fff" d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165z" />
                </svg></button>
            </div>
        </div>
    </div>
</div>





<style>
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
        min-height: 990px;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        height:100%;
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
