import React from "react";

import TeamNavbar from "./teamnavbar";
import TeamLoader from "./TeamLoader";

export default function StartTemplate(props) {
  return (
    <div className="w-full h-full flex justify-start items-start overflow-hidden">
        <TeamNavbar isTask={props.isTask} isOpen={props.isOpen} isDocs={props.isDocs} isSettings={props.isSettings} teamName={props.teamName} />
        <main className="bg-gray-50 w-full h-screen shadow-2xl">
          {props.isLoading ? (
            <TeamLoader message={props.message}/>
          ) : (
            props.children
          )}
        </main>
    </div>
  )
}