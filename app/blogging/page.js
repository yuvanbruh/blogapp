"use client";
import React, { useState, useEffect } from "react";
const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/written");

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();
        console.log("Fetched blogs:", data); // Debugging output
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="text-white">Loading blogs...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!blogs.length) {
    return <div className="text-white">No blogs found.</div>;
  }

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-4xl font-semibold text-white mb-8">Your Blogs</h1>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article
              key={blog._id}
              className="flex flex-col bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-semibold text-white">
                {blog.title}
              </h2>
              <p className="mt-2 text-gray-400">{blog.content}</p>
              <div className="mt-4 text-sm text-gray-500">
                Written by {blog.email || "Anonymous"}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
