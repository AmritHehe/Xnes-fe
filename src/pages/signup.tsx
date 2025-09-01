import React, { useState } from "react";
import axios from "axios";

export function SignUp(){ 
    const [username , setUsername] = useState<string>("")
    const [pass , setPass] = useState<string>("")
    async function signMeUp() { 
        console.log("reached till here")
        await axios.post('http://localhost:3000/signup', { 
                username : username,
                "email" : "eh@bhosdu.com" , 
                pass : pass
        }).then((res)=> { 
            // const data = JSON.parse(res.data); 
            // localStorage.setItem('token' , data.token)
            console.log(JSON.stringify(res))
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

        <button onClick={signMeUp}>
            SignUp

        </button>
    </>
}
export default SignUp