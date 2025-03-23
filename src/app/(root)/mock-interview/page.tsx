"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

function MockInterviews() {
  const { user } = useUser();
  console.log(user);

  return (
    <div className="container py-8">
      <div className="max-w-[980px] mx-auto">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="border border-gray-700 rounded-lg p-10 bg-black/30 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-indigo-400">
                Get Interview-Ready with AI-Powered Practice & Feedback
              </h1>
              <p className="text-muted-foreground text-lg mt-8">
                Practice real interview questions & get instant feedback
              </p>
              <Button asChild className="mt-6">
                <Link href="/interview">Start an Interview</Link>
              </Button>
            </div>

            {/* Image */}
            <div className="flex-1">
              <Image
                src="/robot.webp" // Ensure the image is in the `public` folder
                alt="robo-dude"
                width={400}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Previous Interviews Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-indigo-400">Your Interviews</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {/* Render previous interviews here */}
            <div className="border border-gray-700 rounded-lg p-6 bg-black/30">
              <h3 className="text-xl font-semibold text-indigo-400">
                Interview #1
              </h3>
              <p className="text-muted-foreground mt-2">Completed on 10/10/2023</p>
              <Button variant="outline" className="mt-4 w-full">
                View Details
              </Button>
            </div>
            {/* Add more interview cards */}
          </div>
        </section>

        {/* Upcoming Interviews Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-indigo-400">Take Interviews</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {/* Render upcoming interviews here */}
            <div className="border border-gray-700 rounded-lg p-6 bg-black/30">
              <h3 className="text-xl font-semibold text-indigo-400">
                Mock Interview
              </h3>
              <p className="text-muted-foreground mt-2">Practice your skills</p>
              <Button className="mt-4 w-full">Start Now</Button>
            </div>
            {/* Add more interview cards */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default MockInterviews;