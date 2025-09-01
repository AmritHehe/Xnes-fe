import React, { useState } from "react";
import axios from "axios";

export function SignIn(){ 
    const [username , setUsername] = useState<string>("")
    const [pass , setPass] = useState<string>("")
function signMeIn() { 
    axios.post('http://localhost:3000/signin', { 
             username : username,
             "email" : "eh@bhosdu.com" , 
             pass : pass
    }).then((res)=> { 
        const data = res.data; 
        localStorage.setItem('token' , data.token)
        console.log("settled the token")
        alert("signed you in")
    })
}
    return <>
        <h1 className="text-xl font-bold ">
            username : 
        </h1>
        <input className="border-1 p-2 m-2" type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} name="" id="" />

        <h1 className="text-xl font-bold ">
            passWord  
        </h1>
        <input className="border-1 p-2 m-2" type="text" value={pass} onChange={(e)=>{setPass(e.target.value)}} name="" id="" />
        <br />

        <button onClick={signMeIn}>
            Signin

        </button>
    </>
}
export default SignIn
