"use client"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react"
export default function login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabler, setDisabler] = useState(false);
    const [fullname, setFullname] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();
    const handleRegister = async () => {
        const registerData = {
            email,
            fullname,
            password
        }
        console.log(registerData);
        const res = await fetch("/api/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(registerData)
        });
        if(res.ok) {
          setMessage("registered succesfully");
          router.push("/");
        }
        else {
          const data = await res.json();
          setMessage(data.message);
          if(res.status == 429){setDisabler(true)};
          setTimeout(()=>{
            setMessage("");
            setDisabler(false)
          },60000);
        }
    }
return (
  <main className="min-h-screen bg-slate-950 text-white flex justify-center items-start py-12">
    <div className="w-full max-w-md px-4 space-y-6">
      
      {/* Header */}
      <h1 className="text-2xl font-semibold">Register</h1>
      <p className="text-sm text-slate-400">
        Enter your credentials to create your account.
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
          <label className="text-sm text-slate-300">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={fullname}
            onChange={(e) => {setFullname(e.target.value)}}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm text-slate-300">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
          />
        </div>
        <p className="text-xs text-red-400">
          {message}
         </p>
      </div>

      {/* Login Button */}
      <button
      onClick={handleRegister}
        className={`w-full rounded-lg py-2 font-medium text-sm transition ${disabler?"bg-gray-600 hover:bg-gray-500 ":"bg-blue-600 hover:bg-blue-500"}`}
        disabled={disabler}
      >
        {disabler?"please wait for 1 min..":"Register"}
      </button>

      {/* Footer */}
      <p className="text-center text-slate-400 text-sm">
        Already have an account?{" "}
        <Link href="/login"
         className="text-blue-500 hover:underline cursor-pointer"
         >
          Login
        </Link>
      </p>

    </div>
  </main>
)
};