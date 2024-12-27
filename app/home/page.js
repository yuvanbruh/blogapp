"use client";
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/navigation';
export default function App() {
  const router= useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    
    const userData = {
      ...data,
      email: session?.user?.email,
      name: session?.user?.name,
    };

    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulates a 2-second delay
    let r = await fetch("/api/username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await r.json();
    console.log(result);

    if(data){
      router.push("/insertData")
    }
  };

  const { data: session, status } = useSession();
  const [useData, setUserData] = useState(null);
  useEffect(() => {
    if (status === "authenticated") {
      setUserData(session?.user || null);
    }
  }, [status, useData]);

  if (status === "loading") {
    return <div>Loading user info...</div>;
  }

  if (!session) {
    return <div>You are not logged in</div>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {isSubmitting && <div className="bg-gray-500 text-white p-2 text-center">Loading...</div>}
  
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              {...register("username", { required: true })}
              placeholder="Enter your username"
              type="text"
              name="username"
              id="username"
              className="text-blue-950 font-medium w-full p-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md hover:shadow-lg transition-all"
            />
            {errors.username && <span className="text-black-500 text-sm">This field is required</span>}
          </div>
  
          <div>
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              {...register("password", { required: true })}
              placeholder="Enter your password"
              type="password"
              name="password"
              id="password"
              className="text-blue-950 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md hover:shadow-lg transition-all"
            />
            {errors.password && <span className="text-red-500 text-sm">This field is required</span>}
          </div>
  
          <div>
            <input
              type="submit"
              disabled={isSubmitting}
              value="Submit"
              className="w-full p-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 disabled:bg-gray-400"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
