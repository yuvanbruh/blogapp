"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto py-24 px-6 sm:py-32">
          <div className="relative bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 lg:flex lg:gap-x-20 lg:px-24">
            <div className="text-center lg:text-left lg:py-32">
              <h2 className="text-2xl  font-thin font-sans text-white sm:text-4xl ">
              You can be the master of your fate, captain of your soul, but you have to realize that life is coming from you, not at you
              </h2>
              <p className="mt-6 text-lg text-gray-300">
                unlock your blogging capabilities using yuv blog 
              </p>
              <div className="mt-10 flex gap-x-6 justify-center lg:justify-start">
                <a
                  href="/blog"
                  className="bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm"
                >
                  Get started
                </a>
                <a href="#" className="text-sm font-semibold text-white">
                  Learn more →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}




