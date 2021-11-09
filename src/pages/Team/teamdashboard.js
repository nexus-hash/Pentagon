import { Component } from "react";
import verifyToken from "../utils/verifytoken";

import "../../css/global.css";
import TeamNavbar from "./components/teamnavbar";
import { FadeLoader } from "react-spinners";
import Fade from "react-reveal/Fade";
import CloseIcon from "@mui/icons-material/Close";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default class TeamDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      teamid: this.props.teamid,
      goal: localStorage.getItem("goal") ? localStorage.getItem("goal") : "",
      showGoal: localStorage.getItem("goal") ? false : true,
    };

    this.handleGoalCloseOnClick = this.handleGoalCloseOnClick.bind(this);
  }

  async componentDidMount() {
    console.log(localStorage.getItem("team"));
    var p = await verifyToken();
    if (!p) {
      this.props.history.push("/login");
    }
  }

  handleGoalCloseOnClick() {
    //save using team id
    this.setState({
      goal: "hidden",
      showGoal: false,
    });
    localStorage.setItem("goal", "hidden");
  }

  render() {
    return (
      <div className="w-full h-full flex justify-start items-start">
        <TeamNavbar isTask={true} />
        <main className="bg-gray-50 w-4/5 h-screen shadow-2xl">
          {this.state.isLoading ? (
            <div className="h-screen flex justify-center items-center text-blue-300 w-full">
              <FadeLoader color="#2563eb" />
            </div>
          ) : (
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
                    available technologies such as gRPC and sockets. This
                    project is for the simulation of Ippts algorithm using
                    available technologies such as gRPC and sockets. This
                    project is for the simulation of Ippts algorithm using
                    available technologies such as gRPC and sockets. This
                    project is for the simulation of Ippts algorithm using
                    available technologies such as gRPC and sockets. This
                    project is for the simulation of Ippts algorithm using
                    available technologies such as gRPC and sockets. This
                    project is for the simulation of Ippts algorithm using
                    available technologies such as gRPC and sockets. This
                    project is for the simulation of Ippts algorithm using
                    available technologies such as gRPC and sockets. This
                    project is for the simulation of Ippts algorithm using
                    available technologies such as gRPC and sockets.
                  </p>
                </div>
              </Fade>
              <div className="w-full flex justify-between items-center transform transition duration-200">
                <Fade top>
                  <div className="text-3xl font-bold text-blue-800">Tasks</div>
                </Fade>
                <Fade right>
                  <div className="w-full flex justify-end items-center">
                    <div  className="w-auto h-auto bg-blue-300 flex rounded-full mr-4 ">
                    <input type="text" className=" hidden bg-blue-300 text-blue-900 py-1 px-3 rounded-full border-none outline-none"></input>
                    <button className="p-1 text-blue-700 rounded-full flex justify-center items-center shadow-mg px-2 placeholder-blue-600" placeholder="Search">
                      <SearchOutlinedIcon />
                    </button>
                    </div>
                    <button className="btn-bg-color px-6 text-white rounded-lg py-1">
                      New Task
                    </button>
                  </div>
                </Fade>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }
}
