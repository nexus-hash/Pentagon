import { Component } from "react";
import verifyToken from "../utils/verifytoken";

import "../../css/global.css";
import TeamNavbar from "./components/teamnavbar";
import { FadeLoader } from "react-spinners";
import Fade from "react-reveal/Fade";
import CloseIcon from "@mui/icons-material/Close";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import TeamLoader from "./components/TeamLoader";
import StartTemplate from "./components/StartTemplate";

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
    var month = deadline.substring(3, 5);
    var dateF =
      deadline.substring(0, 2) +
      " " +
      months[month - 1] +
      " " +
      deadline.substring(6, 10);
    return dateF;
  };

  return (
    <Fade bottom>
      <div className="w-auto max-w-xs p-4 mr-4 mb-4 rounded-lg hover:shadow-2xl drop-shadow-lg h-auto transform transition hover:scale-105 bg-gradient-to-br from-blue-500 to-blue-600 ">
        <div className="flex flex-col justify-start items-start h-full ">
          <span className="text-white text-sm text-opacity-70 flex justify-center items-center">
            <AccessTimeIcon fontSize="small" className="mr-3" />
            {convertToMonth(props.deadline)}
          </span>
          <button onClick={props.onClick} className="bg-white rounded-md transform transition hover:scale-110 text-blue-500 flex justify-center items-center py-1 my-4">
            <KeyboardArrowLeftIcon />
            <KeyboardArrowRightIcon className=" -ml-3" />
          </button>
          <div className=" line-clamp-2 text-white font-semibold text-lg text-left mb-3">
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
                  {props.progress+"%"}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-700">
              <div
                style={{width: props.progress + "%"}}
                className=" shadow-none rounded-full flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"
              ></div>
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
      teamid: this.props.teamid,
      goal: localStorage.getItem("goal") ? localStorage.getItem("goal") : "",
      showGoal: localStorage.getItem("goal") ? false : true,
      task: [
        {
          title: "Add Search Feature in DashBoard Page",
          assignedto: "Nexus",
          status: "In Progress",
          deadline: "01/03/2021",
          progress: "50",
        },
        {
          title:
            "Add Search Feature in DashBoard Page and Compelete other task mentioned before in other tasks",
          assignedto: "Nexus",
          status: "In Progress",
          deadline: "20/10/2020",
          progress: "70",
        },
        {
          title: "Add Search Feature in DashBoard Page",
          assignedto: "Nexus",
          status: "In Progress",
          deadline: "20/10/2020",
          progress: "83",
        },
        {
          title: "Add Search Feature in DashBoard Page",
          assignedto: "Nexus",
          status: "In Progress",
          deadline: "20/10/2020",
        },
        {
          title: "Add Search Feature in DashBoard Page",
          assignedto: "Nexus",
          status: "In Progress",
          deadline: "20/10/2020",
        },
        {
          title: "Add Search Feature in DashBoard Page",
          assignedto: "Nexus",
          status: "In Progress",
          deadline: "20/10/2020",
        },
        {
          title: "Add Search Feature in DashBoard Page",
          assignedto: "Nexus",
          status: "In Progress",
          deadline: "20/10/2020",
        },
        {
          title: "Add Search Feature in DashBoard Page",
          assignedto: "Nexus",
          status: "In Progress",
          deadline: "20/10/2020",
        },
        {
          title: "Add Search Feature in DashBoard Page",
          assignedto: "Nexus",
          status: "In Progress",
          deadline: "20/10/2020",
        },
      ],
    };

    this.handleGoalCloseOnClick = this.handleGoalCloseOnClick.bind(this);
    this.handleTaskDetailOnClick = this.handleTaskDetailOnClick.bind(this);
  }

  async componentDidMount() {
    console.log(localStorage.getItem("team"));
    
      this.setState({
        isLoading: true,
      });
    var p = await verifyToken();
    if (!p) {
      this.props.history.push("/login");
    }
    this.setState({
      isLoading: false,
    });
  }

  handleGoalCloseOnClick() {
    //save using team id
    this.setState({
      goal: "hidden",
      showGoal: false,
    });
    localStorage.setItem("goal", "hidden");
  }

  handleTaskDetailOnClick = (taskid) => {
    this.props.history.push({
      pathname: "/team/task",
      state: {
        taskid: taskid,
      },
    });
  };

  render() {
    return (
      <StartTemplate isLoading={this.state.isLoading} isTask={true} isDocs={false}>
        <div className="w-full h-screen flex flex-col justify-start items-start pt-8 px-8 transform transition duration-150">
          <Fade top collapse when={this.state.showGoal}>
            <div
              className={`h-32 max-h-32 w-full bg-blue-700 rounded-lg py-1 px-4 ${this.state.goal} text-blue-100 font-semibold mb-4 shadow-inner`}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="w-full h-8 justify-center flex items-center text-xl">
                  Project Goal
                </h4>
                <button
                  onClick={this.handleGoalCloseOnClick}
                  className="text-white"
                >
                  <CloseIcon />
                </button>
              </div>
              <p className="w-full h-16 flex flex-wrap overflow-scroll scrollbar-hide text-justify break-normal">
                This project is for the simulation of Ippts algorithm using
                available technologies such as gRPC and sockets. This project is
                for the simulation of Ippts algorithm using available
                technologies such as gRPC and sockets. This project is for the
                simulation of Ippts algorithm using available technologies such
                as gRPC and sockets. This project is for the simulation of Ippts
                algorithm using available technologies such as gRPC and sockets.
                This project is for the simulation of Ippts algorithm using
                available technologies such as gRPC and sockets. This project is
                for the simulation of Ippts algorithm using available
                technologies such as gRPC and sockets. This project is for the
                simulation of Ippts algorithm using available technologies such
                as gRPC and sockets. This project is for the simulation of Ippts
                algorithm using available technologies such as gRPC and sockets.
              </p>
            </div>
          </Fade>
          <div className="w-full flex justify-between items-center transform transition duration-200">
            <Fade top>
              <div className="text-3xl font-bold text-blue-800">Tasks</div>
            </Fade>
            <Fade right>
              <div className="w-full flex justify-end items-center">
                <div className="w-auto h-auto bg-blue-300 flex rounded-full mr-4 ">
                  <input
                    type="text"
                    className=" hidden bg-blue-300 text-blue-900 py-1 px-3 rounded-full border-none outline-none"
                  ></input>
                  <button
                    className="p-1 text-blue-700 rounded-full flex justify-center items-center shadow-mg px-2 placeholder-blue-600"
                    placeholder="Search"
                  >
                    <SearchOutlinedIcon />
                  </button>
                </div>
                <button onClick={()=>this.props.history.push('/team/task/new')} className="btn-bg-color px-6 text-white rounded-lg py-1 hover:shadow-lg">
                  New Task
                </button>
              </div>
            </Fade>
          </div>
          <div className="w-full h-full scrollbar-hide overflow-y-scroll flex flex-wrap justify-start items-start mt-10">
            {this.state.task.map((task, index) => (
              <TaskCard
                title={task.title}
                assignedto={task.assignedto}
                status={task.status}
                deadline={task.deadline}
                progress={task.progress}
                onClick={() => this.handleTaskDetailOnClick(index)}
              />
            ))}
          </div>
        </div>
      </StartTemplate>
    );
  }
}
