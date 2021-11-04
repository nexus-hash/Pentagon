import { Component } from "react";

import "../../css/global.css";
import Title from "../utils/title";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Dialogue from "../utils/dialogue";
import CreateProject from "./createproject";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import JoinProject from "./joinproject";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      counter: 0,
      createProjectDialogueState: false,
      createProjectOpen: false,
      joinProjectOpen: false,
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCreateProjectOpen = this.handleCreateProjectOpen.bind(this);
    this.handleCreateProjectClose = this.handleCreateProjectClose.bind(this);
    this.handleJoinProjectOpen = this.handleJoinProjectOpen.bind(this);
    this.handleJoinProjectClose = this.handleJoinProjectClose.bind(this);
    this.handleNone = this.handleNone.bind(this);
    this.handleLogoutOnClick = this.handleLogoutOnClick.bind(this);

  }

  componentDidMount() {
    console.log(localStorage.getItem("token"));
    if(!localStorage.getItem("token")){
      this.props.history.push("/login");
    }
    var authtoken = localStorage.getItem("token");
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

  handleJoinProjectOpen = () => {
    this.setState({ joinProjectOpen: true });
  }

  handleJoinProjectClose = (e) => {
    this.setState({ joinProjectOpen: false });
    e.stopPropagation();
  }

  handleClose = () => {
    this.setState({ createProjectDialogueState: false });
  };


  handleNone = (e) => {
    e.preventDefault();
    console.log("none");
  }

  handleLogoutOnClick = (e) => {
    this.props.history.push("/logout");
  }

  render() {
    var open = Boolean(this.state.anchorEl);
    return (
      <div className="flex flex-col justify-start items-center">
        <div className="w-full flex justify-between nav-bg-color fixed items-center lg:px-12 px-4">
          <div className="flex items-center py-3 space-x-3">
            <button className="flex lg:hidden">
              <VisibilityOffIcon></VisibilityOffIcon>
            </button>
            <Title width="2.25rem" color="#FFFFFF"></Title>
          </div>
          <div>
          <Button className="lg:flex hidden" onClick={this.handleShowProjectsClick} aria-controls="basic-menu" aria-haspopup="true" aria-expanded={open?true:undefined}>All Projects</Button>
          <Menu
        id="basic-menu"
        anchorEl={this.state.anchorEl}
        open={open}
        onClose={this.handleShowProjectsClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={this.handleShowProjectsClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleShowProjectsClose}>My account</MenuItem>
        <MenuItem onClick={this.handleShowProjectsClose}>Logout</MenuItem>
      </Menu>
        </div>
          <div>
            <button
              className="lg:flex hidden font-bg-color px-1 py-4 border-b-4 border-opacity-0 border-pink-600 lg:hover:border-opacity-100"
              onClick={this.handleCreateProjectOpen}
            >
              Create Project
            </button>
          </div>
          <button onClick = {this.handleJoinProjectOpen} className="lg:flex hidden">Join Project</button>
          <div className="w-5/12 items-end justify-end flex">
            <button onClick={this.handleLogoutOnClick}>Logout</button>

          </div>
        </div>
        <div className="w-full overflow-y-scroll bg-white flex flex-col justify-center items-start">
          <Dialogue open={this.state.createProjectOpen} handleClose = {this.handleCreateProjectClose} handlesub = {this.handleNone}>
          <CreateProject></CreateProject>
          </Dialogue>
          <Dialogue open={this.state.joinProjectOpen} handleClose = {this.handleJoinProjectClose} handlesub  = {this.handleNone}>
            <JoinProject></JoinProject>
          </Dialogue>
        </div>
      </div>
    );
  }
}

export default Dashboard;