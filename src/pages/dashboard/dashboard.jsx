import { Component } from "react";

import "../../css/global.css";
import Title from "../utils/title";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Dialogue from "../utils/dialogue.jsx";
import CreateProject from "./createproject";
import JoinProject from "./joinproject";
import verifyToken from "../utils/verifytoken";
import Fade from "react-reveal/Fade";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { FadeLoader } from "react-spinners";
function TeamCard(props) {
  return (
    <Fade bottom>
      <button
        onClick={props.onClick}
        className={`w-full h-12 border-2 border-opacity-20 transform transition hover:scale-110 duration-200 border-blue-700 shadow-lg bg-white px-4 rounded-xl flex justify-between items-center`}
      >
        <div className="h-14 items-center flex w-2/3">
          <div className=" truncate overflow-ellipsis text-gray-800 text-lg ">
            {props.name}
          </div>
        </div>
        <div>
          <div className="p-1 bg-blue-500 bg-opacity-30 hover:scale-110 transform transition duration-500 ease-in-out text-blue-700 rounded-full flex justify-center items-center">
            <ArrowForwardIosOutlinedIcon fontSize="small" />
          </div>
        </div>
      </button>
    </Fade>
  );
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      anchorEl: null,
      counter: 0,
      createProjectDialogueState: false,
      createProjectOpen: false,
      joinProjectOpen: false,
      teamList:
        localStorage.getItem("teamList") === null
          ? []
          : JSON.parse(localStorage.getItem("teamList")),
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCreateProjectOpen = this.handleCreateProjectOpen.bind(this);
    this.handleCreateProjectClose = this.handleCreateProjectClose.bind(this);
    this.handleJoinProjectOpen = this.handleJoinProjectOpen.bind(this);
    this.handleJoinProjectClose = this.handleJoinProjectClose.bind(this);
    this.handleNone = this.handleNone.bind(this);
    this.handleLogoutOnClick = this.handleLogoutOnClick.bind(this);
    this.handleTeamClick = this.handleTeamClick.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    var p = await verifyToken();
    if (!p) {
      this.props.history.push("/login");
    }
    if (localStorage.getItem("teamList") === null) {
      console.log("no team");
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
            this.setState({ teamList: data.projects, isLoading: false });
            localStorage.setItem("teamList", JSON.stringify(data.projects));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({ isLoading: false });
    }
  }

  refreshPage = () => {
    this.setState({
      teamList:
        localStorage.getItem("teamList") === null
          ? []
          : JSON.parse(localStorage.getItem("teamList")),
      isLoading: true,
      createProjectOpen: false,
      joinProjectOpen: false,
    });
    this.setState({ isLoading: false });
  };

  handleClickOpen = () => {
    this.setState({ createProjectDialogueState: true });
  };

  handleCreateProjectOpen = () => {
    this.setState({ createProjectOpen: true });
  };

  handleCreateProjectClose = (e) => {
    this.setState({ createProjectOpen: false });
    e.stopPropagation();
  };

  handleJoinProjectOpen = () => {
    this.setState({ joinProjectOpen: true });
  };

  handleJoinProjectClose = (e) => {
    this.setState({ joinProjectOpen: false });
    e.stopPropagation();
  };

  handleClose = () => {
    this.setState({ createProjectDialogueState: false });
  };

  handleNone = (e) => {
    e.preventDefault();
    console.log("none");
  };

  handleLogoutOnClick = (e) => {
    this.props.history.push("/logout");
  };

  handleTeamClick = async (teamid) => {
    await localStorage.setItem("team", teamid);
    this.props.history.push("/team");
  };

  render() {
    var open = Boolean(this.state.anchorEl);
    return (
      <div
        className={`flex flex-col h-screen justify-start items-center overflow-hidden `}
      >
        <Fade top>
          <header
            style={{ height: "7%" }}
            className="w-full rounded-b-md flex justify-between bg-gradient-to-r from-indigo-400 text-gray-100 to-blue-500  sticky z-50 shadow-xl top-0  items-center lg:px-12 px-4"
          >
            <div className="flex items-center py-3 space-x-3">
              <button className="flex lg:hidden">
                <VisibilityOffIcon></VisibilityOffIcon>
              </button>
              <Title
                width="2.25rem"
                fontColor="#FFFFFF"
                color="#FFFFFF"
              ></Title>
            </div>

            <button className="lg:flex text-gray-100 hidden px-1 py-4 border-b-4 border-opacity-0 border-gray-50 lg:hover:border-opacity-100">
              Assigned Work
            </button>

            <div>
              <button
                className="lg:flex hidden text-gray-100 px-1 py-4 border-b-4 border-opacity-0 border-gray-50 lg:hover:border-opacity-100"
                onClick={this.handleCreateProjectOpen}
              >
                Create Project
              </button>
            </div>

            <button
              onClick={this.handleJoinProjectOpen}
              className="lg:flex hidden text-gray-100 px-1 py-4 border-b-4 border-opacity-0 border-gray-50 lg:hover:border-opacity-100"
            >
              Join Project
            </button>

            <div className="w-5/12 items-end justify-end flex">
              <button
                onClick={this.handleLogoutOnClick}
                className="transform transition duration-100 hover:text-red-400 hover:scale-110"
              >
                Logout
              </button>
            </div>
          </header>
        </Fade>

        <div style={{ height: "93%" }} className=" w-full ">
          {this.state.isLoading ? (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <FadeLoader color="#2563eb" />
              <div className="text-blue-500 font-semibold mt-4">Retrieving Data</div>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-50 flex flex-row justify-center items-start">
              <div className="w-3/12 h-full px-6 py-6">
                <Fade left>
                  <div className="w-full flex flex-col items-center h-full justify-start rounded-xl pt-4 space-y-2">
                    <Fade top>
                      <div className=" w-full flex justify-between items-center px-4 ">
                        <div className="font-serrif font-bold text-lg text-blue-800">
                          {localStorage.getItem("uname")
                            ? localStorage
                                .getItem("uname")
                                .charAt(0)
                                .toUpperCase() +
                              localStorage.getItem("uname").slice(1)
                            : ""}
                          's Projects
                        </div>
                        <button
                          onClick={this.handleCreateProjectOpen}
                          className="btn-bg-color px-2 py-1 rounded-lg text-white font-semibold"
                        >
                          New
                        </button>
                      </div>
                    </Fade>

                    <div className="w-full h-auto space-y-2 px-4 pb-4 overflow-y-scroll scrollbar-hide">
                      {this.state.teamList.length ? (
                        this.state.teamList.map((team, index) => {
                          return (
                            <TeamCard
                              name={team.pname}
                              onClick={() => this.handleTeamClick(team._id)}
                              index={index}
                            ></TeamCard>
                          );
                        })
                      ) : (
                        <Fade clear>
                          <div className="text-center text-base h-16 flex justify-center items-center text-opacity-40 text-gray-600 font-bold">
                            No Projects Create one
                          </div>
                        </Fade>
                      )}
                    </div>
                  </div>
                </Fade>
              </div>

              <div className="w-9/12 h-full p-6 flex flex-col justify-start items-center">
                <Fade top>
                  <div className="w-full h-1/2 border-2 z-0 rounded-2xl flex flex-col justify-start p-4 font-serrif font-bold items-center">
                    <div className="text-xl z-0 text-blue-800">
                      Recent Tasks
                    </div>
                    <div className="text-xl text-blue-900 text-opacity-50 h-full flex justify-center items-center">
                      This feature will be available soon
                    </div>
                  </div>
                </Fade>

                <Fade bottom>
                  <div className="w-full h-1/2 border-2 mt-4 rounded-2xl flex flex-col justify-start p-4 font-serrif font-bold text-xl text-blue-800 items-center">
                    <div>Recent Completed Tasks</div>
                    <div className="text-xl text-blue-900 text-opacity-50 h-full flex justify-center items-center">
                      This feature will be available soon
                    </div>
                  </div>
                </Fade>
              </div>
            </div>
          )}
        </div>

        <Dialogue
          open={this.state.createProjectOpen}
          handleClose={this.handleCreateProjectClose}
          handlesub={this.handleNone}
        >
          <CreateProject reload={this.refreshPage}></CreateProject>
        </Dialogue>
        <Dialogue
          open={this.state.joinProjectOpen}
          handleClose={this.handleJoinProjectClose}
          handlesub={this.handleNone}
        >
          <JoinProject reload={this.refreshPage}></JoinProject>
        </Dialogue>
      </div>
    );
  }
}

export default Dashboard;
