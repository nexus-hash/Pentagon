import { Component } from "react";
import BackButton from "../components/BackButton";
import StartTemplate from "../components/StartTemplate";
//import '../../../css/global.css';

import Fade from "react-reveal/Fade";

export default class NewTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      taskTitle: "",
      materialFolder: "",
      assign: 0,
      subTasks: 0,
      subTaskTitle: Array(0),
      subHidden: -1,
      deadline: "",
      teamMembers: [],
      btnState: true,
      isNavOpen:
        localStorage.getItem("isMenuOpen") !== null
          ? localStorage.getItem("isMenuOpen")
          : false,
    };
    this.handleNewSubTask = this.handleNewSubTask.bind(this);
    this.handleSubTaskChange = this.handleSubTaskChange.bind(this);
    this.handleSubTaskDelete = this.handleSubTaskDelete.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTaskTitleChange = this.handleTaskTitleChange.bind(this);
    this.checkFormValidation = this.checkFormValidation.bind(this);
    this.checkotherForm = this.checkotherForm.bind(this);
    this.handleCreateTask = this.handleCreateTask.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    var teamMembers = localStorage.getItem("teamdetails");
    teamMembers = JSON.parse(teamMembers)[0].projectmembers;
    this.setState({ teamMembers: teamMembers });
    this.setState({ isLoading: false });
  }

  setMinDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;
    return today;
  }

  handleNewSubTask = () => {
    this.setState({
      subTasks: this.state.subTasks + 1,
    });
    this.checkFormValidation();
  };

  handleSubTaskChange = (e) => {
    var Subtask = this.state.subTaskTitle;
    Subtask[e.target.id] = e.target.value;
    this.setState({
      subTaskTitle: Subtask,
    });
    this.checkFormValidation();
  };

  handleSubTaskDelete = (e) => {
    var Subtask = this.state.subTaskTitle;
    Subtask.splice(e.target.id, 1);
    this.setState({
      subHidden: e.target.id,
    });
    setTimeout(() => {
      this.setState({
        subTaskTitle: Subtask,
        subTasks: this.state.subTasks - 1,
      });
    }, 1);
    this.checkFormValidation();
  };

  handleDateChange = (e) => {
    this.setState({
      deadline: e.target.value,
    });
    this.checkFormValidation();
  };

  handleTaskTitleChange = (e) => {
    this.setState({
      taskTitle: e.target.value,
    });
    this.checkFormValidation();
  };

  handleMaterialFolderChange = (e) => {
    this.setState({
      materialFolder: e.target.value,
    });
    this.checkFormValidation();
  };

  handleAssignChange = (e) => {
    this.setState({
      assign: e.target.value,
    });
    this.checkFormValidation();
  };

  checkotherForm = () => {
    if(this.state.taskTitle !=="" && this.state.materialFolder !=="" && this.state.assign !== null && this.state.deadline !== ""){
      return true;
    }
    return false;
  }

  checkFormValidation = () => {
    setTimeout(() => {
      if(this.state.subTasks === 0){
        if(!this.checkotherForm()){
          this.setState({
            btnState: true
          });
          return
        }
      } else {
        if(!this.checkotherForm() || !(this.state.subTaskTitle.length === this.state.subTasks)){
          this.setState({
            btnState: true
          });
          return
        }
        for (let i = 0; i < this.state.subTasks; i++) {
          if (this.state.subTaskTitle[i] === "") {
            this.setState({
              btnState: true,
            });
            return;
          }
        }
      }
      this.setState({
        btnState: false,
      });
      return;
    }, 100);
  };

  handleCreateTask = () => {
    this.setState({ isLoading: true });
    var subtask = [];
    for (var i = 0; i < this.state.subTaskTitle.length; i++) {
      subtask.push({
        subtask: this.state.subTaskTitle[i],
        isDone: false,
      });
    }
    var assign = {userid:this.state.teamMembers[this.state.assign].userid,username:this.state.teamMembers[this.state.assign].username};
    var task = {
      taskTitle: this.state.taskTitle,
      materialFolder: this.state.materialFolder,
      assign: assign,
      subTasks: this.state.subTasks,
      isDone: false,
      deadline: this.state.deadline,
      subtask: subtask,
    };
    fetch(process.env.REACT_APP_API + "task/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskdata: task,
        teamid:localStorage.getItem("team")
      }),
    })
    .then(res => res.json())
    .then(data => {
      if(data.message === "Task created successfully"){
        this.setState({ isLoading: false });
        this.props.history.push("/team");
      }
    })
    .catch(err => {
      console.log(err);
      this.setState({ isLoading: false });
    })
    
    console.log(task);
  };

  render() {
    return (
      <StartTemplate isLoading={this.state.isLoading} isTask={true} isOpen={this.state.isNavOpen}>
        <div className="w-full h-full p-6 flex flex-col justify-start items-start ">
          <Fade top>
            <div className="w-full flex justify-between items-center">
              <BackButton this={this}></BackButton>
              <h1 className="w-full flex justify-center items-center text-blue-800 font-bold text-3xl">
                New Task
              </h1>
            </div>
            <div className="w-full flex flex-col justify-start items-start mt-6">
              <div className="w-full flex justify-start items-start">
                <div className="w-1/2 flex flex-col">
                  <label className="mb-2 text-blue-700">Assign to</label>
                  <select
                    onChange={this.handleAssignChange}
                    className="w-2/3 px-4 border-2 shadow-lg rounded-lg py-2 overflow-y-scroll"
                  >
                    {this.state.teamMembers.map((member, index) => {
                      return (
                        <option key={index} id={member.userid} value={index}>
                          {member.username}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="w-1/2 flex flex-col">
                  <label className="mb-2 text-blue-700">Due Date</label>
                  <input
                    value={this.state.deadline}
                    onChange={this.handleDateChange}
                    type="date"
                    className="px-4 py-2 w-2/3 rounded-lg shadow-lg  border-2 placeholder-gray-500"
                    placeholder="DD/MM/YYYY"
                    
                  ></input>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between items-center mt-6">
              <div className="w-full flex flex-col">
                <label className="mb-2 text-blue-700">Task Title</label>
                <input
                  value={this.state.taskTitle}
                  onChange={this.handleTaskTitleChange}
                  type="text"
                  className="w-2/3 px-4 py-2 rounded-lg shadow-lg border-2"
                  placeholder="Enter Task Title"
                ></input>
              </div>
              <div className="w-full flex flex-col">
                <label className="mb-2 text-blue-700">Material Folder</label>
                <input
                  value={this.state.materialFolder}
                  onChange={this.handleMaterialFolderChange}
                  type="text"
                  className="w-2/3 px-4 py-2 rounded-lg shadow-lg border-2"
                  placeholder="Mention material folder name"
                ></input>
              </div>
            </div>
            <div className="w-full flex justify-between items-center mt-6">
              <button
                className="px-4 py-1 rounded-lg btn-bg-color text-white"
                onClick={this.handleNewSubTask}
              >
                Add Subtask
              </button>
            </div>
          </Fade>
          <div className="w-full h-full flex flex-col overflow-y-scroll scrollbar-hide mt-4 mb-4  py-4 px-2">
            {this.state.subTasks === 0 ? (
              <div className="w-full flex flex-col justify-center items-center h-full">
                <div className="text-green-600 font-semibold text-lg">
                  You can create Task with no Subtask
                </div>
              </div>
            ) : (
              [...Array(this.state.subTasks)].map((item, index) => {
                return (
                  <Fade
                    left
                    collapse
                    when={this.state.subHidden === index ? false : true}
                    key={index}
                  >
                    <div
                      className={`w-full flex flex-col justify-start mt-2 items-start ${
                        this.state.subHidden === index ? "hidden" : ""
                      }`}
                    >
                      <label className="mb-2 text-blue-700">
                        Subtask {index + 1}
                      </label>
                      <div className="flex w-full justify-between">
                        <input
                          value={this.state.subTaskTitle[index]}
                          onChange={this.handleSubTaskChange}
                          id={index}
                          type="text"
                          className="w-1/2 px-4 py-2 rounded-lg shadow-lg border-2"
                          placeholder="Enter Subtask"
                        ></input>
                        <button
                          onClick={this.handleSubTaskDelete}
                          id={index}
                          className="px-4 rounded-lg btn-bg-color text-sm text-white"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </Fade>
                );
              })
            )}
          </div>
          <Fade bottom>
            <div className="w-full flex justify-end items-center">
              <button
                disabled={this.state.btnState}
                style={{
                  cursor: this.state.btnState ? "not-allowed" : "pointer",
                }}
                onClick={this.handleCreateTask}
                className="bg-gradient-to-tr from-blue-500 to-blue-400 py-2 px-4 rounded-lg text-white"
              >
                Create Task
              </button>
            </div>
          </Fade>
        </div>
      </StartTemplate>
    );
  }
}
