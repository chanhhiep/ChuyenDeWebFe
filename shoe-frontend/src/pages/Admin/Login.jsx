import { toastError, toastSuccess } from '../../services/ToastService';
import { FaFacebook,FaTwitter,FaLinkedin } from 'react-icons/fa';
import React, { useEffect, useRef, useState } from "react";
import { API_ENDPOINT } from "../../constants";
import { loginHandel,getProfile } from "../../api/general-api";
import axios from "axios";
export default function AdminLogin(){
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [profile,setProfile] =useState("");
    const [token,setToken] = useState("");
    function handelLogin(){
        try {
            if (email === "") {
                toastError("Vui lòng nhập email");
                return;
            }
              if (pass === "") {
                toastError("Vui lòng nhập password");
                return;
             }
            const data = {
                email: email,
                password: pass,
            }
            
            loginHandel(data).then((res)=>{
              if(res.data.token === "" ||res.data.token === null){
                toastError("Tài Khoản Khồn Tồn Tại");
              }
                console.log(res.data.token);
                 localStorage.setItem("accesstoken",res.data.token);
            }) 
           
            const accesstoken = localStorage.getItem("accesstoken");
            console.log(accesstoken)
            const api = `${API_ENDPOINT}/api/users/profile/${email}`
            console.log(accesstoken.data.token);
            axios.get(api, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            .then(res => {
                if(res.status === 200){           
                    const json = JSON.stringify(res);
                    localStorage.setItem("user",json)
                    console.log(json);
                    toastSuccess("Đăng nhập thành công")
                    
                }
                else{
                    throw Error(res.status);
                    logout();
                }
            })
        } catch (error) {
            console.log(error);
            toastError("loi dang nhap");
        }
        
    }
    function logout () {
        localStorage.removeItem("accesstoken");
        toastSuccess("Đăng Xuat thành công")
    }
    return (
       <>
<section class="vh-100" style={{backgroundColor: "#508bfc"}}>
  
    <div class="d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card shadow-2-strong" style={{borderRadius: "1rem"}}>
          <div class="card-body p-5 text-center">

            <h3 class="mb-5">Sign in</h3>

            <div class="form-outline mb-4">
              <input type="email" id="typeEmailX-2" class="form-control form-control-lg" />
              <label class="form-label" for="typeEmailX-2">Email</label>
            </div>

            <div class="form-outline mb-4">
              <input type="password" id="typePasswordX-2" class="form-control form-control-lg" />
              <label class="form-label" for="typePasswordX-2">Password</label>
            </div>

       
           

            <button class="btn btn-primary btn-lg btn-block" type="submit">Login</button>

         

          </div>
        </div>
      </div>
    </div>
</section>

       </>    
    );
}