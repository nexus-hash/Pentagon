import React from "react";

import "../../css/global.css";
import InputField from "../Authentication/components/inputField";

function CreateProject(props) {

  var [projecttitle, setProjecttitle] = React.useState("");
  var TitleOnChange = (e) => {
    setProjecttitle(e.target.value);
  }

  return (
    <div>
      <div className=" font-bold text-gray-50 text-2xl mb-2">
        Create a New Project
      </div>
      <div className=" btn-bg-dark rounded-lg mb-3 px-2 py-2">
        <div className=" text-white text-xl">
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
        css="w-full btn-bg-dark px-4 py-2 rounded-lg focus:shadow-xl placeholder-gray-200 focus:outline-none text-gray-100 focus:border-transparent"
        onChange={TitleOnChange}
        value={projecttitle}
      ></InputField>
    </div>
  );
}

export default CreateProject;
