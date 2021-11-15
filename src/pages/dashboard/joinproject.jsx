import React from "react";

import { FadeLoader } from "react-spinners";
import InputField from "../Authentication/components/inputField";

export default function JoinProject(props) {

  var [isLoading , setIsLoading] = React.useState(false);
  var [message, setMessage] = React.useState("");
  var [isJoin, setIsJoin] = React.useState(false);
  var [loadingMessage, setLoadingMessage] = React.useState("Checking Code Validity");
  var [accessCode, setAccessCode] = React.useState("");

  var accessCodeOnChange = (e) => {
    setAccessCode(e.target.value);
  }

  var checkForm = () => {
    if(accessCode.length === 14){
      return true;
    }
    return false;
  }

  var joinProject = () => {
    setIsLoading(true);
    fetch(process.env.REACT_APP_API+"team/join",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        joinId: accessCode,
        uid: localStorage.getItem("uid"),
        uname: localStorage.getItem("uname"),
      })
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.acknowledge === "You have joined the team") {
        setMessage("You have joined the project successfully");
        fetch(process.env.REACT_APP_API + "team/getteams", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: localStorage.getItem("uid"),
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.projects.length > 0) {
              localStorage.setItem("teamList", JSON.stringify(data.projects));
              setIsJoin(true);
              setIsLoading(false);
            }
          })
          .catch((err) => {
            console.log(err);
            setIsJoin(false);
            setIsLoading(false);
          });
        setIsLoading(false);
      } else if (data.acknowledge === "Already member") {
        setIsJoin(true);
        setMessage("Already a member of the project");
        setIsLoading(false);
      } else {
        setMessage("Project not found");
        setIsJoin(true);
        setIsLoading(false);
      }
      setTimeout(() => {
        setIsJoin(false);
        props.reload();
      } , 3000);
    })
    .catch((err) => {
      setMessage("Project Joining Failed");
      setIsJoin(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsJoin(false);
        props.reload();
      }, 3000);
    })
  }

  return (
    <div>
      <div
        className={`w-full h-80 flex flex-col ${
          !isLoading ? "hidden" : null
        } justify-center items-center text-white`}
      >
        <FadeLoader color={"#fefefe"}></FadeLoader>
        <div className="font-semibold font-sans">{loadingMessage}</div>
      </div>
      <div
        className={`w-full h-80 flex flex-col ${
          !isJoin ? "hidden" : null
        } justify-center items-center text-white`}
      >
        <FadeLoader color={"#fefefe"}></FadeLoader>
        <div className="font-semibold font-sans">{message}</div>
      </div>
      <div hidden={isLoading?true:isJoin}>
        <div className=" font-bold text-gray-50 text-2xl mb-2">
          Join a Project
        </div>
        <div className=" btn-bg-dark rounded-lg mb-3 px-2 py-2">
          <div className=" text-white text-lg">
            Please fill the form to join an existing project:
          </div>
          <ul className="text-white list-disc px-4 py-2">
            <li>
              Project access code can be found in the project settings section.
            </li>
            <li>Ask the project admin for access code.</li>
          </ul>
        </div>

        <InputField
          placeholder="Enter 14 Character Project Access Code"
          css="w-full nav-bg-color px-4 py-2 rounded-lg focus:shadow-xl placeholder-gray-600 focus:outline-none text-black focus:border-transparent"
          onChange={accessCodeOnChange}
          value={accessCode}
        ></InputField>
        <div className=" w-full h-36 flex justify-end mt-2 items-end space-x-3">
          <button
            onClick={joinProject}
            disabled={!checkForm()}
            style={{ cursor: !checkForm() ? "not-allowed" : "pointer" }}
            className="px-5 py-1 rounded-lg bg-blue-500 text-white border-2 group-hover: border-red-50"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}