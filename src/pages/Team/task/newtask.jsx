import { Component } from "react";
import BackButton from "../components/BackButton";
import StartTemplate from "../components/StartTemplate";
//import '../../../css/global.css';

import Fade from 'react-reveal/Fade';

export default class NewTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      subTasks: 0,
      subTaskTitle: Array(100).fill(''),
      subHide: Array(100).fill(''),
      subHidden: -1,
      teamMembers: [],
    };
    this.handleNewSubTask = this.handleNewSubTask.bind(this);
    this.handleSubTaskChange = this.handleSubTaskChange.bind(this);
    this.handleSubTaskDelete = this.handleSubTaskDelete.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    var teamMembers = localStorage.getItem("teamdetails");
    teamMembers = JSON.parse(teamMembers)[0].projectmembers;
    console.log(teamMembers);
    this.setState({ teamMembers: teamMembers });
    this.setState({ isLoading: false });
  }

  handleNewSubTask = () => {
    this.setState({
      subTasks: this.state.subTasks + 1,
    });
  }

  handleSubTaskChange = (e) => {
    var Subtask = this.state.subTaskTitle;
    console.log(e.target.id);
    Subtask[e.target.id] = e.target.value;
    this.setState({
      subTaskTitle: Subtask,
    });
    console.log(this.state.subTaskTitle);
  }

  handleSubTaskDelete = (e) => {
    var Subtask = this.state.subTaskTitle;
    Subtask.splice(e.target.id, 1);
    this.setState({
      subHidden: e.target.id,
    });
    setTimeout(()=>{
      this.setState({
      subTaskTitle: Subtask,
      subTasks: this.state.subTasks - 1,
    });}, 1);
  }

  render(){
    return (
      <StartTemplate isLoading={this.state.isLoading} isTask={true}>
        <div className="w-full h-full p-6 flex flex-col justify-start items-start ">
          <Fade top>
          <BackButton this={this}></BackButton>
          <div className="w-full flex flex-col justify-start items-start mt-6">
            <div className="w-full flex justify-start items-start">
              <div className="w-1/2 flex flex-col">
                <label className="mb-2 text-blue-700">Assign to</label>
                <select className="w-2/3 px-4 border-2 shadow-lg rounded-lg py-2 overflow-y-scroll">
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
                  type="date"
                  className="px-4 py-2 w-2/3 rounded-lg shadow-lg  border-2 placeholder-gray-500"
                  placeholder="DD/MM/YYYY"
                ></input>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col mt-6">
            <label className="mb-2 text-blue-700">Task Title</label>
            <input
              type="text"
              className="w-1/2 px-4 py-2 rounded-lg shadow-lg border-2"
              placeholder="Enter Task Title"
            ></input>
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
          <div className="w-full h-full flex flex-col overflow-y-scroll scrollbar-hide  py-4 px-2">
            {this.state.subTasks===0?(
              <div className="w-full flex flex-col justify-center items-center h-full">
                <div className="text-green-600 font-semibold text-lg">You can create Task with no Subtask</div>
                </div>
            ):[...Array(this.state.subTasks)].map((item, index) => {
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
            })}
          </div>
          <Fade bottom>
          <div className="w-full flex justify-end items-center">
            <button className="bg-gradient-to-tr from-blue-500 to-blue-400 py-2 px-4 rounded-lg text-white">Create Task</button>
          </div>
          </Fade>
        </div>
      </StartTemplate>
    );
  }
}