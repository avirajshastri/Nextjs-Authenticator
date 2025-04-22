"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";



export default function SignUpPage (){
    const router = useRouter();
    const [user,setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignUp = async () =>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup",user);
            console.log("Signup success", response.data);
            router.push("/login");
        } catch (error: any) {
            console.log("Singup failed",error.message)
            toast.error(error.message); // react-toast jo library install kri thi popup deti ye error ka screen pe
        }finally{
            setLoading(false); // error h fir bhi loading to stop krni hi h
        }
    }

    useEffect(()=>{
        if(user.email.length> 0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    },[user]);


    return (
        <div className="flex flex-col items-center justify-center
        min-h-screen py-2">
            <h1 className="text-3xl mb-4">{loading ? "Processing": "Signup"}</h1>
            <hr />
            <div className="flex justify-center mt-3 gap-3">
            <label htmlFor="username" className="p-2">username</label>
            <input
            className="bg-gray-100 text-black border border-white rounded p-2 mb-4 focus:outline-none focus:border-grey-600"
            id="username"
            type="text"
            value={user.username}
            onChange={(e)=> setUser({...user,username:e.target.value})}
            placeholder="username"></input>
            </div>
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
            onClick={onSignUp}
            className="mt-4 ml-2 border border-white rounded-xl p-2 hover:bg-gray-100 hover:text-black cursor-pointer">{buttonDisabled ? "No signup": "Signup"}</button>
            <Link href="/login" className="mt-4 ml-2 hover:underline">Go to Login page</Link>
        </div>
    )
}