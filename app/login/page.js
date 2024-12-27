
"use client";

import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [providers, setProviders] = useState(null);
  // const router= useRouter();

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);
  const handleSignin= async(providerId)=>{
    await signIn(providerId,{callbackUrl:"/home"})
  }

  return (
    <div className="flex items-center justify-center h-screen">
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name} className="m-4">
            <button
              onClick={() => handleSignin(provider.id)}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
    </div>
  );
}
// import React from 'react'

// const page = () => {
//   return (
//     <div>
//       this is login
//     </div>
//   )
// }

// export default page
