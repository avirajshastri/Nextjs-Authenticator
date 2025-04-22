"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";



export default function LoginPage (){
    const router = useRouter();
    const [user,setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled,setButtonDisabled] = React.useState(false);
    const [loading,setLoading]= React.useState(false);

    

    const onLogin = async () =>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login",user);

            console.log("Login success",response.data)
            toast.success("Login success")
            router.push("/profile")
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0)
        {
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    },[user])
    return (
        <div className="flex flex-col items-center justify-center
        min-h-screen py-2">
            <h1 className="text-3xl mb-4">{loading ? "Processing" : "Login"}</h1>
            <hr />
            <div className="flex justify-center mt-3 gap-3">
            <label htmlFor="email" className="py-2 pl-9 mr-3">email</label>
            <input
            className="bg-gray-100 text-black border border-white rounded p-2 mb-4 focus:outline-none focus:border-grey-600"
            id="email"
            type="text"
            value={user.email}
            onChange={(e)=> setUser({...user,email:e.target.value})}
            placeholder="email"></input>
            </div>
            <div className="flex justify-center mt-3 gap-3">
            <label htmlFor="password" className="p-2">password</label>
            <input
            className="bg-gray-100 text-black border border-white rounded p-2 mb-4 focus:outline-none focus:border-grey-600
            "
            id="password"
            type="text"
            value={user.password}
            onChange={(e)=> setUser({...user,password:e.target.value})}
            placeholder="password"></input>
            </div>
            <button 
            onClick={onLogin}
            className="mt-4 ml-2 border border-white rounded-xl p-2 hover:bg-gray-100 hover:text-black ">{buttonDisabled ? "No login": "Login"}</button>
            <Link href="/signup" className="mt-4 ml-2 hover:underline">Go to Sign up page</Link>
        </div>
    )
}