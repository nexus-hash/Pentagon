import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

import "../../../css/toolnavbar.css";

import { createGlobalState } from "react-hooks-global-state";
import Title from "../../utils/title";

const initialState = { isOpen: false };
const { useGlobalState } = createGlobalState(initialState);


export default function TeamNavbar(props) {
  const history = useHistory();
  const [isMenuOpen, setIsMenuOpen] = useGlobalState("isOpen");
  const [logoutState, setLogoutState] = React.useState("");

  const changeMenuState = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const clipText = (text, length) => {
    if(text === null){
      return "";
    }
    if (text.length > length) {
      return text.substring(0, length - 3) + "...";
    }
    return text;
  };

  useEffect(() => {
    if (isMenuOpen) {
      setTimeout(() => {
        setLogoutState("Logout");
      }, 140);
    } else {
      setLogoutState("");
    }
  }, [isMenuOpen]);
  return (
    <div
      className={`navbar ${
        isMenuOpen ? "w-1/5 " : "w-14 bg-gray-800 rounded-tr-md rounded-br-md"
      } transform transition-all duration-500 h-screen  flex flex-col justify-start shadow-2xl items-start`}
    >
      <button
        className={`${
          isMenuOpen
            ? "ml-2"
            : "text-gray-400 hover:text-white hover:scale-105 "
        } transform transition-all px-2 pt-4 py-2`}
        onClick={changeMenuState}
      >
        {!isMenuOpen ? (
          <MenuIcon fontSize="large" />
        ) : (
          <div className="w-full flex space-x-3 items-center">
            <div className="w-full">
            <Title
              width="1.5rem"
              fontColor=""
              isTeamNav={true}
              className="px-2"
            ></Title>
            </div>
            <MenuOpenIcon
              fontSize="large"
              className="hover:shadow-lg p-1 shadow-md rounded-lg bg-gray-700 text-gray-200 hover:text-white"
            />
          </div>
        )}
      </button>
      <Link
        to="/dashboard"
        className={`flex justify-start w-full ${
          isMenuOpen ? "px-4" : "px-2"
        }  py-2 mb-2 items-center rounded-lg hover:shadow-md`}
      >
        <div
          className={`p-1 border-2 ${
            isMenuOpen
              ? "border-gray-800"
              : "border-gray-400 text-gray-400 hover:text-white hover:border-white"
          }  rounded-full h-auto flex mr-4 justify-center items-center`}
        >
          <ArrowBackOutlinedIcon fontSize="small" />
        </div>
        <div
          className={`text-base ${isMenuOpen ? "" : "hidden"} text-gray-800`}
        >
          Back to All Projects
        </div>
      </Link>
      <div
        className={`transform transition-all duration-200 ${
          isMenuOpen ? "w-full" : " w-14 justify-center flex"
        } bg-gradient-to-bl from-blue-400 via-blue-500 to-blue-600 px-2 py-2 flex items-center text-lg font-semibold text-white`}
        style={{ height: isMenuOpen ? "14rem" : "80%" }}
      >
        {isMenuOpen ? (
          <span className={`transform transition-all duration-200`}>
            {props.teamName || localStorage.getItem("teamname")}
          </span>
        ) : (
          <span
            className={`text-center transform nav-text -rotate-180 transition-all duration-200`}
            style={{
              width: isMenuOpen ? "" : "",
              height: "28%",
            }}
          >
            {clipText(props.teamName || localStorage.getItem("teamname"), 45)}
          </span>
        )}
      </div>
      <div className="w-full flex flex-col justify-start items-start px-1 mt-4 space-y-2">
        <button
          onClick={() => (props.isTask ? null : history.push("/team"))}
          className={`px-3 py-2 rounded-lg ${
            props.isTask
              ? isMenuOpen
                ? "bg-blue-300 bg-opacity-60 "
                : " bg-gradient-to-br from-blue-400 to-blue-500 text-white"
              : isMenuOpen
              ? "hover:bg-blue-300 hover:bg-opacity-60"
              : "bg-gradient-to-br hover:from-blue-400 hover:to-blue-500 hover:text-white text-gray-400"
          } w-full items-start justify-start flex `}
        >
          <AssignmentIcon className="mr-2" />
          <div className={`${isMenuOpen ? "" : "hidden"}`}>Task List</div>
        </button>
        <button
          onClick={() => (props.isDocs ? null : history.push("/team/docs"))}
          className={`px-3 py-2 rounded-lg ${
            props.isDocs
              ? isMenuOpen
                ? "bg-blue-300 bg-opacity-60 "
                : " bg-gradient-to-br from-blue-400 to-blue-500 text-white"
              : isMenuOpen
              ? "hover:bg-blue-300 hover:bg-opacity-60"
              : "bg-gradient-to-br hover:from-blue-400 hover:to-blue-500 hover:text-white text-gray-400"
          } w-full items-start justify-start flex truncate`}
        >
          <InsertDriveFileIcon className="mr-2" />
          <div className={`${isMenuOpen ? "" : "hidden"}`}>
            Reference Materials
          </div>
        </button>
        <button
          onClick={() =>
            props.isSettings ? null : history.push("/team/settings")
          }
          className={`px-3 py-2 rounded-lg ${
            props.isSettings
              ? isMenuOpen
                ? "bg-blue-300 bg-opacity-60 "
                : " bg-gradient-to-br from-blue-400 to-blue-500 text-white"
              : isMenuOpen
              ? "bg-blue-300 bg-opacity-0 hover:bg-opacity-60"
              : " text-gray-400 bg-gradient-to-br hover:from-blue-400 hover:to-blue-500 hover:text-white"
          } w-full items-start justify-start flex`}
        >
          <SettingsIcon className="mr-2" />
          <div className={`${isMenuOpen ? "" : "hidden"}`}>Settings</div>
        </button>
      </div>
      <div
        className={`h-full w-full flex justify-center items-end py-6 ${
          isMenuOpen ? "px-4" : "px-1"
        }`}
      >
        <button
          onClick={() => history.push("/logout")}
          className="bg-gradient-to-br from-red-400 to-red-500 w-full py-2 text-white text-lg rounded-md"
        >
          {logoutState}
          <LogoutIcon className={`${isMenuOpen ? "ml-4" : ""}`} />
        </button>
      </div>
    </div>
  );
}
