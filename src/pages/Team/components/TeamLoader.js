import React from "react";
import { FadeLoader } from "react-spinners";

export default function TeamLoader() {
  return (
    <div className="h-screen flex justify-center items-center text-blue-300 w-full">
      <FadeLoader color="#2563eb" />
    </div>
  );
}