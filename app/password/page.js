
"use client"
import { useForm } from "react-hook-form"
import { useSession } from "next-auth/react"
export default function App() {
  const {data:session}=useSession();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors ,isSubmitting},
  } = useForm()

  const onSubmit = async(data) =>{

    const userData={
      ...data,
      email: session?.user?.email,
      name: session?.user?.name,
    }


  console.log(data)
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulates a 2-second delay
  let r= await fetch("/api/username",{method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(userData)
  })
  const result = await r.json();
  console.log(result);

}

  // console.log(watch("example")) 

  return (
    <>
    {isSubmitting && <div className="bg-red-950  ">LOading</div> }
<div className="flex h-screen items-center justify-center">
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username", { required: true })}  placeholder="username" type="text" name="username" id="" className="bg-blue-950 " />
      <br />
      <input {...register("password", { required: true })} placeholder="password" type="password" name="password" id="" className="bg-blue-950 " />
      <br />
      {errors.exampleRequired && <span>This field is required</span>}
      <input type="submit" disabled={isSubmitting}  value="submit" />

    </form>
    </div>
    </>
  )
 
}