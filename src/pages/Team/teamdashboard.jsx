import { Component } from "react";
import verifyToken from "../utils/verifytoken";
import React from "react";

import "../../css/global.css";
import "../../css/taskcard.css"
import Fade from "react-reveal/Fade";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import StartTemplate from "./components/StartTemplate";
import { useHistory } from "react-router";
import { FadeLoader } from "react-spinners";

function TaskCard(props) {
  var convertToMonth = (deadline) => {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    deadline = deadline.split("-");
    deadline = deadline[2] + "-" + deadline[1] + "-" + deadline[0];
    var month = deadline.substring(3, 5);
    var dateF =
      deadline.substring(0, 2) +
      " " +
      months[month - 1] +
      " " +
      deadline.substring(6, 10);
    return dateF;
  };

  var [showDelete, setShowDelete] = React.useState(false);
  var [loadDelete, setLoadDelete] = React.useState(false);
  var history = useHistory();

  const checkDeadline = (deadline) => {
    var d1 = new Date(deadline);
    d1.setHours(24, 0, 0, 0);
    var d2 = new Date();
    return d1 < d2;
  }

  const deleteTask = async () => {
    setLoadDelete(true);
    await fetch(process.env.REACT_APP_API + "task/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskid: props.taskid,
        teamid: localStorage.getItem("team"),
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.message === "sucess") {
        props.refreshData();
        setLoadDelete(false);
        setShowDelete(false);
      }else{
        setLoadDelete(false);
        setShowDelete(false);
        alert("Something went wrong");
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <Fade bottom opposite duration={700}>
      <div
        onClick={() => setShowDelete(false)}
        className={`absolute ${
          showDelete ? "" : "hidden"
        } top-0 right-0 h-screen w-full z-50 flex flex-col justify-center items-center bg-gray-900 bg-opacity-80 `}
      >
        {loadDelete ? (
          <div className="flex flex-col w-full h-screen justify-center items-center">
            <FadeLoader color="#2563eb"></FadeLoader>
            <div className="text-white text-lg">Deleting Task</div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <div className="text-white text-xl font-semibold">
              Are you sure you want to delete this Task?
            </div>
            <div className="flex items-center mt-8">
              <button onClick={()=> deleteTask()} className="mr-4 px-2 py-1  bg-gradient-to-br from-red-500 to-red-600 text-white border-2 border-white border-opacity-0 hover:border-opacity-100 rounded-lg shadow-md hover:shadow-lg">
                Delete
              </button>
              <button
                onClick={() => setShowDelete(false)}
                className="px-2 py-1 bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-opacity-40 border-white hover:border-opacity-90 text-white shadow hover:shadow-lg rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="relative w-full max-w-xs p-2">
        <div
          className={`w-full max-w-xs p-4 rounded-lg hover:shadow-2xl drop-shadow-lg h-auto transform transition hover:scale-105 bg-gradient-to-br ${
            props.progress !== 100
              ? checkDeadline(props.deadline)
                ? " from-red-500 to-red-600"
                : " from-blue-500 to-blue-600 "
              : "from-green-500 to-green-600"
          } `}
        >
          <div className="flex flex-col justify-start items-start h-full opacity-100">
            <div className="flex justify-between items-center w-full">
              <span className="text-white text-sm text-opacity-70 flex justify-center items-center">
                <AccessTimeIcon fontSize="small" className="mr-3" />
                {convertToMonth(props.deadline)}
              </span>
              <button
                onClick={() => setShowDelete(true)}
                className={`text-red-300 bg-opacity-90 font-bold p-1 flex justify-center items-center bg-white rounded-lg transform transition hover:scale-110`}
              >
                <DeleteOutlineOutlinedIcon fontSize="small" />
              </button>
            </div>
            <button
              onClick={props.onClick}
              className={`bg-white ${
                props.progress === 100
                  ? "text-green-600"
                  : checkDeadline(props.deadline)
                  ? "text-red-600"
                  : "text-blue-600"
              } hover:scale-110 rounded-md transform transition flex justify-center items-center py-1 my-4`}
            >
              <KeyboardArrowLeftIcon />
              <KeyboardArrowRightIcon className=" -ml-3" />
            </button>
            <div className=" line-clamp-2 h-14 text-white font-semibold text-lg text-left mb-3">
              {props.title}
            </div>
            <div className="text-white text-opacity-50">Assigned to</div>
            <div className="text-white font-bold text-lg ">
              {props.assignedto}
            </div>
            <div className="relative w-full">
              <div className="flex mb-2 items-center justify-between">
                <div className="text-right w-full">
                  <span className="text-xs font-semibold inline-block text-white">
                    {props.progress.toFixed(0) + "%"}
                  </span>
                </div>
              </div>
              <div
                className={`overflow-hidden h-2 mb-4 text-xs flex rounded ${
                  checkDeadline(props.deadline) ? " bg-red-700" : "bg-blue-700"
                } `}
              >
                <div
                  style={{ width: props.progress + "%" }}
                  className=" shadow-none rounded-full flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default class TeamDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      loadingMessage: "Retrieving Data",
      teamid: localStorage.getItem("team"),
      teamdetails: [],
      task: [],
      showDelete: false,
    };
    console.log(localStorage.getItem("isMenuOpen"),"dashboard");
    console.log(this.state.isNavOpen,"dashboardnav");
    this.handleTaskDetailOnClick = this.handleTaskDetailOnClick.bind(this);
  }

  getData = () => {
    this.setState({
      loadingMessage: "Arranging Task",
    })
    var teamList = localStorage.getItem("teamList");
    var team = JSON.parse(teamList);
    var teamid = this.state.teamid;
    var teamdetails = team.filter((team) => team._id === teamid);
    localStorage.setItem("teamdetails", JSON.stringify(teamdetails));
    localStorage.setItem("teamname", teamdetails[0].pname);
    var task = teamdetails[0].projecttasks;
    for (var i = 0; i < task.length; i++) {
      var progress = 0;
      for (var j = 0; j < task[i].taskdata.subTasks; j++) {
        if (task[i].taskdata.subtask[j].isDone) {
          progress += 1;
        }
      }
      task[i].progress = (progress / task[i].taskdata.subTasks) * 100;
      if (task[i].taskdata.subTasks === 0) {
        if (task[i].taskdata.isDone) {
          task[i].progress = 100;
        } else {
          task[i].progress = 0;
        }
      }
    }
    var sortedTask = [];
    for (var i = 0; i < task.length; i++) {
      var deadline = new Date(task[i].taskdata.deadline);
      deadline.setHours(24, 0, 0, 0);
      var today = new Date();
      if(task[i].progress!==100 && deadline>=today){
        console.log(task[i].taskdata.taskTitle)
        sortedTask.push(task[i]);
      }
    }
    for (var i = 0; i < task.length; i++) {
      var deadline = new Date(task[i].taskdata.deadline);
      deadline.setHours(24, 0, 0, 0);
      var today = new Date();
      if (deadline <= today && task[i].progress!==100) {
        sortedTask.push(task[i]);
      }
    }
    for (var i = 0; i < task.length; i++) {
      if (task[i].progress === 100) {
        sortedTask.push(task[i]);
      }
    }

    task = sortedTask;
    return { task, teamdetails };  
    
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
      isNavOpen: localStorage.getItem("isMenuOpen") !== null ? localStorage.getItem("isMenuOpen") : false,
    });
    var p = await verifyToken();
    if (!p) {
      this.props.history.push("/login");
    }
    this.refreshData();
  }

  refreshData = async() => {
    await fetch(process.env.REACT_APP_API + "team/getteams", {
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
          setTimeout(() => {
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
                if (data.message === "No team found") {
                  this.setState({ teamList: [], isLoading: false });
                } else if (data.projects.length > 0) {
                  this.setState({ teamList: data.projects});
                  localStorage.setItem(
                    "teamList",
                    JSON.stringify(data.projects)
                  );
                  var { task, teamdetails } = this.getData();
                    this.setState({
                      teamdetails: teamdetails[0],
                      task: task,
                      isLoading: false,
                    });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }, 50);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleTaskDetailOnClick = (taskid,progress) => {
    this.props.history.push({
      pathname: "/team/task",
      state: {
        taskid: taskid,
        progress: progress
      },
    });
  };

  render() {
    return (
      <StartTemplate
        isLoading={this.state.isLoading}
        isTask={true}
        isDocs={false}
        teamName={this.state.teamdetails.pname}
        message={this.state.loadingMessage}
        isOpen={this.state.isNavOpen}
      >
        <div className="w-full h-screen flex flex-col justify-start items-start pt-8 px-8 transform transition duration-150">
          <div className="w-full flex justify-between items-center transform transition duration-200">
            <Fade top>
              <div className="text-3xl font-bold text-blue-800">Tasks</div>
            </Fade>
            <Fade right>
              <div className="w-full flex justify-end items-center">
                <button
                  onClick={() =>
                    this.props.history.push({
                      pathname: "/team/task/new",
                      state: {},
                    })
                  }
                  className="btn-bg-color px-6 text-white rounded-lg py-1 hover:shadow-lg"
                >
                  New Task
                </button>
              </div>
            </Fade>
          </div>
          <div className="w-full h-full scrollbar-hide overflow-y-scroll flex flex-wrap justify-start items-start mt-10">
            {this.state.task.length === 0 ? (
              <div className="w-full h-full flex justify-center items-center">
                <div className="text-blue-700 text-lg font-semibold">
                  No Tasks Found
                </div>
              </div>
            ) : (
              this.state.task.map((task, index) => (
                <TaskCard
                  title={task.taskdata.taskTitle}
                  assignedto={task.taskdata.assign.username}
                  status={task.status}
                  deadline={task.taskdata.deadline}
                  progress={task.progress}
                  refreshData={this.refreshData}
                  taskid={task.taskdata.task_id}
                  onClick={() =>
                    this.handleTaskDetailOnClick(
                      task.taskdata.task_id,
                      task.progress
                    )
                  }
                />
              ))
            )}
          </div>
        </div>
      </StartTemplate>
    );
  }
}
