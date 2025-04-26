"use client"
import Link from "next/link"
import { useRouter } from "next/router"
import axios from "axios"
import toast from "react-hot-toast"
import React,{useState} from "react"


export default function ResetPassword (){

    const [user,setUser] = useState({
        email: "",
    })

    const onSubmit = async () =>{
        console.log("Hit");
        if(user.email.trim().length >0 && user.email.trim().length>0)
        {

            try {
                setLoading(true)
                const respone = await axios.post("/api/users/resetPassword",user)
                
            } catch (error:any) {
                console.log("Not able to reset password")
                toast.error(error.message)
            }
        }
        else{
            toast.error("email fields is required!")
        }
    }
    const [loading,setLoading] = useState(false)
    return(
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-3xl mb-4">{loading ? "Processing" : "Reset Password"}</h1>
            <hr />
            <div className="flex justify-center mt-3 gap-3">
            <label htmlFor="email" className="py-2 pl-3 mr-3">email</label>
            <input
            className="bg-gray-100 text-black border border-white rounded p-2 mb-4 focus:outline-none focus:border-grey-600"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user,email:e.target.value})}
            placeholder="email"></input>
            </div>
            <button 
            onClick={onSubmit}
            className="mt-4 border border-white rounded-xl p-2 hover:bg-gray-100 hover:text-black ">Submit</button>
        </div>
    )
} 