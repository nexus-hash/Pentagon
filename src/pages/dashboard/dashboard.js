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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputField from "../Authentication/components/inputField";


class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      anchorEl: null,
      counter: 0,
      createProjectDialogueState: false,
      joinProjectDialogueState: false,
    }
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleJoinProjectClickOpen = this.handleJoinProjectClickOpen.bind(this);
    this.handleJoinProjectClose = this.handleJoinProjectClose.bind(this);
    
  }

  handleClickOpen = () => {
    this.setState({ createProjectDialogueState: true });
  };

  handleClose = () => {
    this.setState({ createProjectDialogueState: false });
  };

  handleJoinProjectClickOpen = () => {
    this.setState({ joinProjectDialogueState: true});
  };

  handleJoinProjectClose = () => {
    this.setState({ joinProjectDialogueState: false });
  };
  
  handleShowProjectsClick = (event) => {
    this.setState({ anchorEl: event.currentTarget});
  };

  handleShowProjectsClose = () => {
    this.setState({ anchorEl: null});
  };

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
            className="lg:flex hidden text-white py-4 border-t-4 border-opacity-0 border-white lg:hover:border-opacity-100"
            onClick={this.handleClickOpen}
          >
            Create Project
          </button>
          <Dialog open={this.state.createProjectDialogueState} onClose={this.handleClose} className="">
            <DialogTitle>Create A New Project</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Fill up the below required details to start with your new project.
              </DialogContentText>
              <InputField placa></InputField>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>Cancel</Button>
              <Button onClick={this.handleClose}>Create</Button>
            </DialogActions>
          </Dialog>
          </div>

          <button className="lg:flex hidden text-white py-4 border-t-4 border-opacity-0 border-white lg:hover:border-opacity-100"
          onClick={this.handleJoinProjectClickOpen}>Join Project</button>
          
          <Dialog open={this.state.joinProjectDialogueState} onClose={this.handleJoinProjectClose} className="">
            <DialogTitle>Join a project with a code</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter the code to join the team.
              </DialogContentText>
              <InputField placa></InputField>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleJoinProjectClose}>Cancel</Button>
              <Button onClick={this.handleJoinProjectClose}>Join</Button>
            </DialogActions>
          </Dialog>
          
          <div className="w-5/12 items-end justify-end flex text-white">
            <button>Logout</button>
          </div>
        </div>
        <div className="w-full overflow-y-scroll bg-white flex flex-col justify-center items-start"></div>
      </div>
    );
  }
}

export default Dashboard;