import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { FadeLoader } from "react-spinners";

import "../../css/global.css";
import InputField from "../Authentication/components/inputField";

function CreateProject(props) {
  var history = useHistory();
  var [projecttitle, setProjecttitle] = React.useState("");
  var [projectdescription, setProjectdescription] = React.useState("");
  var TitleOnChange = (e) => {
    setProjecttitle(e.target.value);
  }
  var DescriptionOnChange = (e) => {
    setProjectdescription(e.target.value);
  }
  var [isLoading , setIsLoading] = React.useState(false);
  var [isCreated, setIsCreated] = React.useState(false);
  var [message , setMessage] = React.useState("");
  var [loadingMessage , setLoadingMessage] = React.useState("Creating new Project");

  var resetForm = () => {
    setProjecttitle("");
    setProjectdescription("");
  }

  var handleCreateProject = () => {
      setIsLoading(true);
      var uid = localStorage.getItem("uid")
      fetch(process.env.REACT_APP_API+"team/create",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
          pname: projecttitle,
          pdesc: projectdescription,
          uid: uid,
          uname: localStorage.getItem("uname")
        })
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data.acknowledge === "success"){
          setMessage("Project Created Successfully");
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
                setIsCreated(true);
                setIsLoading(false);
              }
            })
            .catch((err) => {
              console.log(err);
              setIsCreated(false);
              setIsLoading(false);
            });
          
        }else if(data.acknowledge === "failure"){
          setMessage("Project Creation Failed");
          setIsCreated(true);
          setIsLoading(false);
        }else{
          setMessage("Project Creation Failed");
          setIsCreated(true);
          setIsLoading(false);
          setTimeout(() => {
            setIsCreated(false);
            setIsLoading(false);
            resetForm();
          }, 2000);
        }
        setTimeout(() => {
          setIsCreated(false);
          setIsLoading(false);
          resetForm();
          props.reload();
          history.push("/dashboard");
        }, 2000);
      })
      .catch((err) => {
        setMessage("Project Creation Failed");
        setIsCreated(true);
        setIsLoading(false);
        setTimeout(() => {
          setIsCreated(false);
          setIsLoading(false);
          resetForm();
        }, 2000);
      })
  }

  var checkForm = ()=>{
    if(projecttitle.length < 4 || projectdescription === ""){
      return false;
    }
    return true;
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
          !isCreated ? "hidden" : null
        } justify-center items-center text-white`}
      >
        <div className="font-semibold font-sans">{message}</div>
      </div>
      <div hidden={isLoading?true:isCreated}>
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
              Mention some Description/Goal of your project.
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
          placeholder="Enter the Description/Goal"
          rows="3"
          onChange={DescriptionOnChange}
          value={projectdescription}
        />
        <div className=" w-full flex justify-end mt-2 items-end space-x-3">
          <button
            onClick={handleCreateProject}
            disabled={!checkForm()}
            style={{ cursor: !checkForm() ? "not-allowed" : "pointer" }}
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
