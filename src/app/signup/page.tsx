"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";



export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false);
    
    const onSignup = async () => {
       try {
          setLoading(true);
          const response = await axios.post("/api/users/signup", user);
          console.log("signup success", response.data);
          router.push("/login");
          

       } catch (error: any) {
          console.log("Signup failed", error.message);
          
       } finally {
        setLoading(false)
       }
    }

    useEffect(() => {
       if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
        setButtonDisabled(false)
       } else {
        setButtonDisabled(true)
       }
    }, [user] )

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">

            <h1 className="text-2xl">{loading? "processing" : "Signup"}</h1>
            <label htmlFor="username">username</label>
            <input
            className="text-black"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder="username"
            />

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
             onClick={onSignup}
             className="p-2 border rounded-lg mb-2">{buttonDisabled ? "no signup" : "Signup"} </button>
             <Link href="/login"> visit login page</Link>
        </div>
    )
}