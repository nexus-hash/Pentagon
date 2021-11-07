import React, { useEffect } from "react";
import { FadeLoader } from "react-spinners";

import "../../css/global.css";
import InputField from "../Authentication/components/inputField";

function CreateProject(props) {

  var [projecttitle, setProjecttitle] = React.useState("");
  var [projectdescription, setProjectdescription] = React.useState("");
  var TitleOnChange = (e) => {
    setProjecttitle(e.target.value);
  }
  var DescriptionOnChange = (e) => {
    setProjectdescription(e.target.value);
  }
  var [isLoading , setIsLoading] = React.useState(false);
  var [message , setMessage] = React.useState("Creating new Project");

  var handleCreateProject = () => {
      setIsLoading(true);
      setTimeout(() => {
        console.log("false");
        setIsLoading(false);
      }, 4000);
  }

  var checkForm = ()=>{
    if(projecttitle.length < 4 || projectdescription === ""){
      return false;
    }
    return true;
  }

  return (
    <div>
      <div className={`w-full h-80 flex flex-col ${!isLoading?"hidden":null} justify-center items-center text-white`}>
        <FadeLoader color={"#fefefe"}></FadeLoader>
        <div className="font-semibold font-sans">{message}</div>
      </div>
      <div hidden={isLoading}>
      <div className=" font-bold text-gray-50 text-2xl mb-2">
        Create a New Project
      </div>
      <div className=" btn-bg-dark rounded-lg mb-3 px-2 py-2">
        <div className=" text-white text-lg">
          Please fill the form to create a new project:
        </div>
        <ul className="text-white list-disc px-4 py-2">
          <li>
            The project title is required and should be more than 3 character.
          </li>
          <li>
            Description is optional and should be less than 100 character.
          </li>
        </ul>
      </div>

      <InputField
        placeholder="Enter the Title"
        css="w-full nav-bg-color px-4 py-2 rounded-lg focus:shadow-xl placeholder-gray-600 focus:outline-none text-black focus:border-transparent"
        onChange={TitleOnChange}
        value={projecttitle}
      ></InputField>
      <textarea
        className="w-full nav-bg-color px-4 py-2 rounded-lg focus:shadow-xl placeholder-gray-600 focus:outline-none text-black focus:border-transparent mt-4"
        placeholder="Enter the Description"
        rows="3"
        onChange={DescriptionOnChange}
        value={projectdescription}
      />
      <div className=" w-full flex justify-end mt-2 items-end space-x-3">
        <button
          onClick={handleCreateProject}
          disabled={!checkForm()}
          style={{cursor:!checkForm()?"not-allowed":"pointer"}}
          className="px-5 py-1 rounded-lg nav-bg-color border-2  text-gray-800 group-hover: border-red-50"
        >
          Create
        </button>
      </div>
      </div>
    </div>
  );
}

export default CreateProject;
