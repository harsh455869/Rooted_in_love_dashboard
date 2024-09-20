import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config";

function Login() {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const navigation=useNavigate();

    const onChangeHandler = () => {
      let data = {
        username,
        password
      };
      
        if(username.length<=0 || password.length<=0 ){
          toast("Fill All The Fields", {
            position: "bottom-center",
            type: "error",
          });
          return;
        }
        const res = axios
        .post(
          `${config.serverURL}admin/login`,
          data
        )
        .then(() => {
          toast("Sucessfully Login", {
              position: "bottom-center",
              type: "success",
            });
            // window.location.reload()
            navigation('/userList')
        })
        .catch((e) => {
          console.log(e);
        });
      
    }

  return (
    <div style={{alignItems:'center',justifyContent:'center',height:1000,width:'100%',display:'flex'}}>
    <div  style={{height:500,width:500,margin:'auto',borderWidth:2,borderColor:'black',backgroundColor:'beige',alignItems:'center',display:'flex',flexDirection:'column',padding:50}}>
    <h1>Login</h1>
    <div className="col-12" >
      <h5>Username</h5>
      <input
        className="form"
        id="isUserActive"
        type="text"
      value={username}
      onChange={(e)=>setusername(e.target.value)}
        style={{backgroundColor:'white',width:'100%',padding:10}}
      ></input>
    </div>
    <div className="col-12 my-3" >
      <h5>Password</h5>
      <input
        className="form"
        id="isUserActive"
        type="text"
      value={password}
      onChange={(e)=>setpassword(e.target.value)}
        style={{backgroundColor:'white',width:'100%',padding:10}}
      ></input>
    </div>
    <div className="col-6">
                    <button
                      onClick={()=>onChangeHandler()}
                      className="form"
                      style={{
                        borderWidth: 0,
                        backgroundColor: "#17545E",
                        borderRadius: 10,
                        color: "white",
                        fontSize: 15,
                        padding: 10,
                      }}

                    >
                      {'Login'}
                    </button>
  </div>
  </div>
  <ToastContainer></ToastContainer>
  </div>
  )
}

export default Login