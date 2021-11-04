import React from "react";

import { FadeLoader } from "react-spinners";
import InputField from "../Authentication/components/inputField";

export default function JoinProject() {

  var [isLoading , setIsLoading] = React.useState(false);
  var [message, setMessage] = React.useState("Joining Project");
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

  return (
    <div>
      <div
        className={`w-full h-80 flex flex-col ${
          !isLoading ? "hidden" : null
        } justify-center items-center text-white`}
      >
        <FadeLoader color={"#fefefe"}></FadeLoader>
        <div className="font-semibold font-sans">{message}</div>
      </div>
      <div hidden={isLoading}>
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
            <li>
              Ask the project admin for access code.
            </li>
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
            
            disabled={!checkForm()}
            style={{ cursor: !checkForm() ? "not-allowed" : "pointer" }}
            className="px-5 py-1 rounded-lg nav-bg-color border-2 text-gray-800 group-hover: border-red-50"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}