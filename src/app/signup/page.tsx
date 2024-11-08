"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    
    const onSignup = async () => {
       try {
          setLoading(true);
          const response = await axios.post("/api/users/signup", user);
          console.log("Signup success", response.data);
          toast.success("Signup successful! Please login.");
          router.push("/login");
       } catch (error: any) {
          console.log("Signup failed", error);
          toast.error(error.response?.data?.error || "Signup failed");
       } finally {
          setLoading(false);
       }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl mb-4">{loading ? "Processing..." : "Signup"}</h1>

            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="Username"
            />

            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="Email"
            />

            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="Password"
            />

            <button
                onClick={onSignup}
                disabled={buttonDisabled}
                className={`p-2 border rounded-lg mb-4 focus:outline-none ${buttonDisabled ? "bg-gray-300" : "bg-blue-500 text-white"}`}
            >
                {loading ? "Processing..." : "Signup"}
            </button>

            <Link href="/login" className="text-blue-500 hover:underline">
                Already have an account? Login here
            </Link>
        </div>
    )
}