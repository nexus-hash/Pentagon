import { Component } from "react";

import "../../css/global.css";
import Title from "../utils/title";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputField from "../Authentication/components/inputField";


class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      counter: 0,
      createProjectDialogueState: false,
    }
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ createProjectDialogueState: true });
  };

  handleClose = () => {
    this.setState({ createProjectDialogueState: false });
  };

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
            className="lg:flex hidden font-bg-color py-4 border-b-4 border-opacity-0 border-pink-600 lg:hover:border-opacity-100"
            onClick={this.handleClickOpen}
          >
            Create Project
          </button>
          <Dialog open={this.state.createProjectDialogueState} onClose={this.handleClose} className="">
            <DialogTitle>Create a New Project</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Fill up the below required Details to start with your new project
              </DialogContentText>
              <InputField placa></InputField>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>Cancel</Button>
              <Button onClick={this.handleClose}>Subscribe</Button>
            </DialogActions>
          </Dialog></div>
          <button className="lg:flex hidden">Join Project</button>
          <div className="w-5/12 items-end justify-end flex">
            <button>Logout</button>
          </div>
        </div>
        <div className="w-full overflow-y-scroll bg-white flex flex-col justify-center items-start"></div>
      </div>
    );
  }
}

export default Dashboard;