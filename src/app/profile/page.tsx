"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
      const router = useRouter()
       const [data, setData] = useState("nothing")
      const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('logout successful')         
            router.push('/login')
            
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }

      }


      const getUserDetails = async () => {
        const res = await axios.get('/api/users/user')
        
        console.log(res.data);
        setData(res.data.data._id)
      }

    return (
        <div className="flex flex-col items-center min-h-screen justify-center">
            <h1 className="text-3xl">Profile</h1>
            <p>This is the Profile Page</p>
            <h2>{data === 'nothing' ? "nothing" : <Link 
            href={`/profile/${data}`}>{data}
            </Link>}</h2>
            <hr/>
            <button 
            onClick={logout}
            className="border rounded-lg p-2">
            Logout
            </button>

            <button 
            onClick={getUserDetails}
            className="border rounded-lg p-2">
                  Get User details
            </button>
        </div>
    )
}
