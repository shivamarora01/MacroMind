"use client"
import Link from "next/link"
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginClient(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [disablerOn, setDisablerOn] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  //handle api call
  const handleLogin = async () => {
    const login_Data = {
      email,
      password
    }
    //fetch the api
    console.log("login_data", login_Data);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(login_Data),
      credentials: "include"
    });
    console.log(res);
    if(res.ok){
      router.push(redirect);
    }
    else {
      const data = await res.json();
      const message = data.message;
      const statusCode = res.status;
      if(statusCode == 429) setDisablerOn(true);
      setTimeout(()=>{
        setDisablerOn(false);
        setMessage("");
      },60000)
      console.log(statusCode);
    }
  }
return (
  <main className="min-h-screen bg-slate-950 text-white flex justify-center items-start py-12">
    <div className="w-full max-w-md px-4 space-y-6">
      
      {/* Header */}
      <h1 className="text-2xl font-semibold">Login</h1>
      <p className="text-sm text-slate-400">
        Enter your credentials to access your account.
      </p>

      {/* Inputs */}
      <div className="space-y-4">
        <div className="flex flex-col space-y-1">
          <label className="text-sm text-slate-300">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm text-slate-300">Password</label>
          <div className="flex flex-col space-y-1 relative">
          <input
            type={showPassword? "text":"password"}
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            placeholder="Enter your password"
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="button"
            onClick={()=>setShowPassword(!showPassword)}
            className="absolute right-2 top-1/4"
            >
              {showPassword? <FaEye/> : <FaEyeSlash/>}
          </button>
          </div>
          <p className="text-xs text-red-400">
          {message}
         </p>
        </div>
      </div>

      {/* Login Button */}
      <button
        className={`w-full rounded-lg py-2 font-medium text-sm transition ${disablerOn?"bg-gray-600 hover:bg-gray-500":"bg-blue-600 hover:bg-blue-500"}`}
        disabled={disablerOn}
        onClick={handleLogin}
         >
        {disablerOn?"Please wait... too many requests":"Login"}
      </button>

      {/* Footer */}
      <p className="text-center text-slate-400 text-sm">
        Don't have an account?{" "}
        <Link href="/register"
        className="text-blue-500 hover:underline cursor-pointer">
          Register
        </Link>
      </p>

    </div>
  </main>
)
};