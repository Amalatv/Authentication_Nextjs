"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";






export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: ""
  
    })
    const [buttonDisabled, setButtonDisabled] = React.
    useState(false);
    const [loading, setLoading] = React.useState(false);



    const onLogin = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/login", user);
        console.log("Login success", response.data);
        toast.success("Login success");
        router.push("/profile");
           
      } catch (error: any) {
        console.log("login failed", error.message);
        toast.error(error.message)
        
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled (true);

        } else {
            setButtonDisabled (false)
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">

            <h1 className="text-2xl">Login</h1>
            

            <label htmlFor="email">email</label>
            <input
            className="text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />

            <label htmlFor="password">password</label>
            <input
            className="mb-4 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />

            <button
             onClick={onLogin}
             className="p-2 border rounded-lg mb-2">Login</button>
             <Link href="/signup"> visit Signup page</Link>
        </div>
    )
}