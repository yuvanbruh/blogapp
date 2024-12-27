"use client";
const posts = [
    {
      id: 1,
      title: 'Boost your conversion rate',
      href: '#',
      description:
        "Welcome to our blog, a place where we share insightful articles on a variety of topics. From practical tips and industry trends to thought-provoking discussions, our goal is to offer valuable content that helps you stay informed and inspired. Whether you're looking to grow your business, improve your skills, or just enjoy some fresh perspectives, our blog provides expert advice and engaging stories. Join us as we explore ideas that matter, all while keeping things interesting and relevant to today’s world.",
      datetime: '2020-03-16',
      category: { title: 'Marketing', href: '#' },
      author: {
        name: 'Sofia Copolla',
        role: 'Co-Founder / CTO',
        href: '#',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    // More posts can be added here if needed
  ];
  
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
// import { Router } from "next/navigation";
export default function WriteBlogWithPosts() {
    // const router= Router();
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {

    const postData = {
      ...data,
      email: session?.user?.email,
      name: session?.user?.name,
    };

    console.log(data); // You can see the form data in the console

    // Simulate API call
    try {
      const response = await fetch("/api/written", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();
      console.log(result); // Log response from the server

      if (response.ok) {
        alert("Blog post submitted successfully");
      } else {
        alert("Failed to submit blog post");
      }
    } catch (error) {
      console.error("Error submitting blog post:", error);
      alert("Error submitting blog post");
    }
//     if(data){
// router.push("/thanks")
//     }
  };

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col lg:flex-row gap-16">
        {/* Left Column: Blog Writing Form */}
        <div className="w-full lg:w-1/2 bg-gray-800 p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-semibold text-white mb-6">Write Your Blog Post</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-lg font-medium text-gray-300 mb-2">Title</label>
              <input
                {...register("title", { required: "Title is required" })}
                placeholder="Enter the title of your blog"
                type="text"
                className="w-full p-4 rounded-lg border border-gray-600 text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all bg-gray-700"
              />
              {errors.title && <span className="text-red-500">{errors.title.message}</span>}
            </div>

            {/* Content Textarea */}
            <div>
              <label htmlFor="content" className="block text-lg font-medium text-gray-300 mb-2">Content</label>
              <textarea
                {...register("content", { required: "Content is required" })}
                placeholder="Write the content of your blog here"
                rows="10"
                className="w-full p-4 rounded-lg border border-gray-600 text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all bg-gray-700"
              />
              {errors.content && <span className="text-red-500">{errors.content.message}</span>}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className={`w-full md:w-auto py-3 px-6 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md focus:outline-none transition duration-300 ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Publish Blog'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Blog Post Previews */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">From the Blog</h2>
          <p className="mt-2 text-lg text-gray-300">Learn how to grow your business with our expert advice.</p>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-1 xl:grid-cols-2">
            {posts.map((post) => (
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-400">
                    {post.date}
                  </time>
                  <a
                    href={post.category.href}
                    className="relative z-10 rounded-full bg-gray-700 px-3 py-1.5 font-medium text-gray-200 hover:bg-gray-600"
                  >
                    {post.category.title}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold text-white group-hover:text-gray-300">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm text-gray-400">{post.description}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img alt="" src={post.author.imageUrl} className="w-10 h-10 rounded-full" />
                  <div className="text-sm">
                    <p className="font-semibold text-white">
                      <a href={post.author.href}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                    <p className="text-gray-400">{post.author.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
