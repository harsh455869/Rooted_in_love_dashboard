import React,{useState,useEffect} from 'react'

function Login() {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
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
                      onClick={()=>{}}
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
  
  </div>
  )
}

export default Login