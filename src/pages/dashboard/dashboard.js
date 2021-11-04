import { Component } from "react";

import "../../css/global.css";
import Title from "../utils/title";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Dialogue from "../utils/dialogue";
import CreateProject from "./createproject";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      createProjectDialogueState: false,
      createProjectOpen: false,
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCreateProjectOpen = this.handleCreateProjectOpen.bind(this);
    this.handleCreateProjectClose = this.handleCreateProjectClose.bind(this);
    this.handleNone = this.handleNone.bind(this);
    this.handleLogoutOnClick = this.handleLogoutOnClick.bind(this);
  }

  componentDidMount() {
    console.log(localStorage.getItem("token"));
    if(!localStorage.getItem("token")){
      this.props.history.push("/login");
    }
    var authtoken = localStorage.getItem("token");
    console.log(authtoken);
    fetch(process.env.REACT_APP_API + "auth/verifytoken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: authtoken,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Token is not valid") {
          this.props.history.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

  handleClose = () => {
    this.setState({ createProjectDialogueState: false });
  };

  handleNone = (e) => {
    e.preventDefault();
    console.log("none");
  }

  handleLogoutOnClick = (e) => {
    console.log("logout");
    localStorage.removeItem("token");
    this.props.history.push("/logout");
  }

  render() {
    return (
      <div className="flex flex-col justify-start items-center">
        <div className="w-full flex justify-between nav-bg-color fixed items-center lg:px-12 px-4">
          <div className="flex items-center py-3 space-x-3">
            <button className="flex lg:hidden">
              <VisibilityOffIcon></VisibilityOffIcon>
            </button>
            <Title width="2.25rem" color="#FFFFFF"></Title>
          </div>
          <button className="lg:flex hidden">Projects</button>
          <div>
            <button
              className="lg:flex hidden font-bg-color px-1 py-4 border-b-4 border-opacity-0 border-pink-600 lg:hover:border-opacity-100"
              onClick={this.handleCreateProjectOpen}
            >
              Create Project
            </button>
          </div>
          <button className="lg:flex hidden">Join Project</button>
          <div className="w-5/12 items-end justify-end flex">
            <button onClick={this.handleLogoutOnClick}>Logout</button>
          </div>
        </div>
        <div className="w-full overflow-y-scroll bg-white flex flex-col justify-center items-start">
          <Dialogue open={this.state.createProjectOpen} handleClose = {this.handleCreateProjectClose} handlesub = {this.handleNone}>
          <CreateProject></CreateProject>
          </Dialogue>
        </div>
      </div>
    );
  }
}

export default Dashboard;