import "./login.css"
import { toastError, toastSuccess } from '../../services/ToastService';
import { FaFacebook,FaTwitter,FaLinkedin } from 'react-icons/fa';
import React, { useEffect, useRef, useState } from "react";
import { API_ENDPOINT } from "../../constants";
import { loginHandel,getProfile } from "../../api/general-api";
import axios from "axios";
export default function Login() {
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
           // localStorage.clear();
            loginHandel(data).then((res)=>{          
                console.log(res.token);
                //localStorage.setItem("accesstoken",res.data.token);
                setToken(res.data.token);
            }) 
           
            //const accesstoken = localStorage.getItem("accesstoken");
            //console.log(accesstoken)
            const api = `${API_ENDPOINT}/api/users/profile/${email}`
            //console.log(accesstoken.token);
            axios.get(api, { headers: {"Authorization" : `Bearer` +{token}} })
            .then(res => {
                if(res.status === 200){
                  if(res.data==="") {
                    toastError("account not real");

                  } 
                  else{
                    localStorage.setItem("accesstoken",token);
                    const json = JSON.stringify(res);
                    localStorage.setItem("user",json)
                    console.log(json);
                    toastSuccess("Đăng nhập thành công")
                  } 
                   
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
        <section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample image"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>
          <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
            <button type="button" className="btn btn-primary btn-floating mx-1">
              <FaFacebook />
            </button>

            <button type="button" className="btn btn-primary btn-floating mx-1">
              <FaTwitter />
            </button>

            <button type="button" className="btn btn-primary btn-floating mx-1">
              <FaLinkedin />
            </button>
          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

        
          <div className="form-outline mb-4">
            <input type="email" id="form3Example3" className="form-control form-control-lg"
              placeholder="Enter a valid email address" onChange={(e)=>setEmail(e.target.value)} />
            <label className="form-label" for="form3Example3">Email address</label>
          </div>

          
          <div className="form-outline mb-3">
            <input type="password" id="form3Example4" className="form-control form-control-lg"
              placeholder="Enter password"  onChange={(e)=>setPass(e.target.value)}/>
            <label className="form-label" for="form3Example4">Password</label>
          </div>

          <div className="d-flex justify-content-between align-items-center">
        
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" for="form2Example3">
                Remember me
              </label>
            </div>
            <a href="#!" className="text-body">Forgot password?</a>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="button" className="btn btn-primary btn-lg"
              style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}} onClick={()=>handelLogin()}>Login</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                className="link-danger">Register</a></p>
          </div>

        </form>
      </div>
    </div>
  </div>
</section>
        </>
    )
}