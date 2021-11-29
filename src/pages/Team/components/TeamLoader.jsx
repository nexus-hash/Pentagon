import React from "react";
import { FadeLoader } from "react-spinners";

export default function TeamLoader(props) {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-blue-300 w-full">
      <FadeLoader color="#2563eb" size={30} />
      <div className="text-blue-500 mt-4 font-semibold">{props.message}</div>
    </div>
  );
}