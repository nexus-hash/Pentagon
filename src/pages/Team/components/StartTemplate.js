import React from "react";

import TeamNavbar from "./teamnavbar";
import TeamLoader from "./TeamLoader";

export default function StartTemplate(props) {
  return (
    <div className="w-full h-full flex justify-start items-start">
        <TeamNavbar isTask={props.isTask} isDocs={props.isDocs} isSettings={props.isSettings} />
        <main className="bg-gray-50 w-4/5 h-screen shadow-2xl">
          {props.isLoading ? (
            <TeamLoader />
          ) : (
            props.children
          )}
        </main>
    </div>
  )
}