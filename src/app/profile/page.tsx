"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, {useState} from "react";

export default function UserProfile (){
    const router = useRouter()
    const [data,setData] = useState("nothing")
    const logout =async () =>{
        try {
           await axios.get('/api/users/logout')
           toast.success('Logout successful')
           router.push('/login')
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    // const getUserDetails = async () =>{
    //     console.log("hit")
    //     const res = await axios.get('/api/users/me')
    //     console.log("adad",res.data)
    //     setData(res.data._id)
    //     console.log("data h ye",data)
    // }

    const getUserDetails = async () => {
        console.log("Function triggered"); // ✅ Must see this
        try {
          const res = await axios.get('/api/users/me');
          console.log("API Response:", res.data);
          setData(res.data.data._id);
        //   console.log(data)
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h1>User</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="">{data !=='nothing' ? (<Link href={`/profile/${data}`}>{data}</Link>) : "Nothing"}</h2>
            <hr />
            <button
            onClick={logout}
             className="p-2 mt-4 rounded-2xl border border-white text-white hover:bg-white hover:text-black">Logout</button>
             <button
            onClick={getUserDetails}
             className="p-2 mt-4 rounded-2xl border border-white text-white hover:bg-white hover:text-black">GetUser Details</button>
        </div>
    )
}