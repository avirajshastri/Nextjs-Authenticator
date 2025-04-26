"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import React,{useEffect, useState} from "react"


export default function ChangePassword(){

    const router = useRouter()
    const [user,setUser] = useState({
        newPassword: "",
        token: ""
    })

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1]
        setUser({...user,token:urlToken})
    },[])

    const [loading,setLoading] = useState(false)

    const onSubmit = async ()=>{
        try {
            setLoading(true)
            const response = await axios.post("/api/users/changePassword",user);
            console.log("Passwrod changed successfully", response.data);
            router.push("/login");
        } catch (error:any) {
            console.log("Not able to change password")
            toast.error(error.message)
        }
    }
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-3xl mb-4">{loading ? "Processing" : "Reset Password"}</h1>
            <hr />
            <div className="flex justify-center mt-3 gap-3">
            <label htmlFor="newPassword" className="py-2 pl-1 mr-3">New password</label>
            <input
            className="bg-gray-100 text-black border border-white rounded p-2 mb-4 focus:outline-none focus:border-grey-600"
            id="newPassword"
            type="text"
            value={user.newPassword}
            onChange={(e) => setUser({...user,newPassword:e.target.value})}
            placeholder=""></input>
            </div>
            <button 
            onClick={onSubmit}
            className="mt-4 border border-white rounded-xl p-2 hover:bg-gray-100 hover:text-black ">Submit</button>
        </div>
    )
}