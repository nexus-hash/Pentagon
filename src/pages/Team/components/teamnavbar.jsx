import React from "react";
import { Link } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import {useHistory} from "react-router-dom";

export default function TeamNavbar(props) {
  const history = useHistory();
  return (
      <div className="navbar w-1/5 h-screen bg-white flex flex-col justify-start shadow-2xl items-start">
        <Link
          to="/dashboard"
          className="flex justify-start w-full px-4 py-4 items-center"
        >
          <div className="p-1 border-2 border-gray-800 rounded-full h-auto flex mr-4 justify-center items-center">
            <ArrowBackOutlinedIcon fontSize="small" />
          </div>
          <div className="text-base text-gray-800">Back to All Projects</div>
        </Link>
        <div className="w-full bg-gradient-to-bl from-blue-400 via-blue-500 to-blue-600 px-4 py-14 flex items-center text-lg font-semibold text-white">
          {props.teamName || localStorage.getItem("teamname")}
        </div>
        <div className="w-full flex flex-col justify-start items-start px-1 mt-4 space-y-2">
          <button
            onClick={() => (props.isTask ? null : history.push("/team"))}
            className={`px-3 py-2 rounded-lg ${
              props.isTask ? "bg-blue-300 bg-opacity-60" : "hover:bg-blue-300 hover:bg-opacity-60"
            } w-full items-start justify-start flex`}
          >
            <AssignmentIcon className="mr-2" />
            Task List
          </button>
          <button
            onClick={() => (props.isDocs ? null : history.push("/team/docs"))}
            className={`px-3 py-2 rounded-lg ${
              props.isDocs
                ? "bg-blue-300 bg-opacity-60"
                : "hover:bg-blue-300 hover:bg-opacity-60"
            } w-full items-start justify-start flex truncate`}
          >
            <InsertDriveFileIcon className="mr-2" />
            Reference Materials
          </button>
          <button
            onClick={() => (props.isSettings ? null : history.push("/team/settings"))}
            className={`px-3 py-2 rounded-lg ${
              props.isSettings
                ? "bg-blue-300 bg-opacity-60"
                : "hover:bg-blue-300 hover:bg-opacity-60"
            } w-full items-start justify-start flex`}
          >
            <SettingsIcon className="mr-2" />
            Settings
          </button>
        </div>
        <div className="h-full w-full flex justify-center items-end py-6 px-4">
          <button
            onClick={() => history.push("/logout")}
            className="btn-bg-color w-full py-2 text-white text-lg rounded-md"
          >
            Logout
            <LogoutIcon className="ml-4" />
          </button>
        </div>
      </div>
  );
}
