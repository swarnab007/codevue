"use client";
import Image from "next/image";
import React from "react";

const Agents = () => {
  return (
    <div className="flex justify-center items-center mt-12">
    <div className="call-view p-6">
      {/* AI Interviewer Card */}
      <div className="card-interviewer">
        <div className="avatar">
          <Image
            src="/ai-avatar.png"
            alt="AI Interviewer"
            width={100}
            height={100}
            className="rounded-full object-cover z-20"
          />
          <span className="animate-speak" />
        </div>
        <h3 className="text-xl font-semibold text-blue-500 mt-4">AI Interviewer</h3>
      </div>

      {/* User Profile Card */}
      <div className="card-border">
        <div className="card-content">
          <Image
            src="/user.png"
            alt="User Profile"
            width={100}
            height={100}
            className="rounded-full object-cover size-[100px]"
          />
          <h3 className="text-xl font-semibold text-blue-500 mt-4">You</h3>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Agents;