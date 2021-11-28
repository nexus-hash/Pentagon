import { Component } from "react";

import "../../../css/global.css";

import BackButton from "../components/BackButton";

import Fade from "react-reveal/Fade";
import StartTemplate from "../components/StartTemplate";

export default class TaskDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      loadingMessage: "",
      taskid:
        this.props.location.state === undefined
          ? ""
          : this.props.location.state.taskid,
      progress:
        this.props.location.state === undefined
          ? ""
          : this.props.location.state.progress,
      taskDeadLine: "",
      taskAssignedTo: "",
      userid: "",
      materials: "",
      taskName: "",
      isDone: false,
      isGone: false,
      subTasks: [],
      isNavOpen:
        localStorage.getItem("isMenuOpen") !== null
          ? localStorage.getItem("isMenuOpen")
          : false,
    };

    this.handleCheck = this.handleCheck.bind(this);
    this.checkRemainingTime = this.checkRemainingTime.bind(this);
    this.handleGlobalCheck = this.handleGlobalCheck.bind(this);
    this.doUpdate = this.doUpdate.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    if (this.props.location.state === undefined) {
      this.props.history.push("/team");
    } else {
      var task = JSON.parse(localStorage.getItem("teamList")).filter(
        (team) => team._id === localStorage.getItem("team")
      )[0].projecttasks;
      var taskdetails =
        task[
          task.findIndex((task) => task.taskdata.task_id === this.state.taskid)
        ];
      var d1 = new Date(taskdetails.taskdata.deadline);
      var d2 = new Date();
      d1.setHours(24,0,0,0);
      var isGone = d1 < d2;
      this.setState({
        taskDeadLine: taskdetails.taskdata.deadline,
        isGone: isGone,
        taskAssignedTo: taskdetails.taskdata.assign.username,
        taskName: taskdetails.taskdata.taskTitle,
        subTasks: taskdetails.taskdata.subtask,
        materials: taskdetails.taskdata.materialFolder,
        isDone: taskdetails.taskdata.isDone,
        userid: taskdetails.taskdata.assign.userid,
        isLoading: false,
      });
    }
  }

  handleCheck = (e) => {
    var sub = this.state.subTasks;
    if(this.state.isDone && !e.target.checked){
      this.setState({isDone: false});
    }
    sub[e.target.id].isDone = e.target.checked;
    var allDone = true;
    sub.forEach((subtask) => {
      if (!subtask.isDone) {
        allDone = false;
      }
    })
    var progress = allDone ? 100 : Math.floor(sub.filter((subtask) => subtask.isDone).length / sub.length * 100);
    this.setState({
      subTasks: sub,
      progress: progress,
      isDone: allDone,
    });
  };

  handleGlobalCheck = (e) => {
    var sub = this.state.subTasks;
    sub.forEach((subtask) => {
      subtask.isDone = e.target.checked;
    });
    this.setState({
      progress: e.target.checked ? 100 : 0,
      subTasks: sub,
      isDone: e.target.checked,
    });
  };

  doUpdate = async () => {
    this.setState({isLoading: true,loadingMessage: "Updating..."});
    var taskdata = {taskdata:{
      task_id: this.state.taskid,
      taskTitle: this.state.taskName,
      deadline: this.state.taskDeadLine,
      assign: {
        username: this.state.taskAssignedTo,
        userid: this.state.userid,
      },
      subtask: this.state.subTasks,
      materialFolder: this.state.materials,
      isDone: this.state.isDone,
      subTasks: this.state.subTasks.length,
    }}
    await fetch(process.env.REACT_APP_API + "task/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskdata: taskdata,
        teamid: localStorage.getItem("team"),
        taskid: this.state.taskid,
        userid: this.state.userid,
      }),
    })
    this.setState({isLoading: false,loadingMessage: "Updating..."});
  }

  checkRemainingTime = (date) => {
    var d1 = date.split("-");
    d1 = d1[1] + "/" + d1[2] + "/" + d1[0];
    var d2 = new Date();
    d1 = new Date(d1);
    var diff = Math.floor((d1.getTime() - d2.getTime()) / (1000 * 3600 * 24));
    return diff + 1;
  };

  render() {
    return (
      <StartTemplate
        isLoading={this.state.isLoading}
        isTask={true}
        message={this.state.loadingMessage}
        isOpen={this.state.isNavOpen}
      >
        <div className="w-full h-full flex flex-col justify-start items-start p-8">
          <Fade top>
            <div className="w-full flex justify-between items-center">
              <BackButton this={this} />
              <div className="w-full flex truncate justify-center items-center text-3xl font-bold text-blue-800 mx-4">
                {this.state.taskName}
              </div>
              <button
                onClick={this.doUpdate}
                className="w-auto btn-bg-color hover:shadow-lg hover:border-opacity-100 border-2 border-red-800 transform transition hover:scale-105 border-opacity-0 text-white rounded-xl py-1 px-4"
              >
                <span>Update</span>
              </button>
            </div>
          </Fade>
          <div className="w-full mt-4 flex justify-between items-center ">
            <div className=" text-justify line-clamp-2  overflow-y-scroll w-1/2">
              Reference Materials : {this.state.materials}
            </div>
            <div>
              {this.state.isDone
                ? "Mark all as Incomplete"
                : "Mark all as completed"}
              <input
                type="checkbox"
                className="ml-2 form-checkbox h-4 w-4 rounded text-blue-500"
                checked={this.state.isDone}
                onChange={this.handleGlobalCheck}
              />
            </div>
          </div>
          <div
            className={`w-full flex flex-col justify-between items-center mt-6 ${
              this.state.isGone ? "bg-red-200" : "bg-blue-200"
            } rounded-lg p-4`}
          >
            <div className="w-full flex justify-between items-center">
              <div className="text-gray-500">
                Assigned To{"  "}
                <span className="text-gray-800 text-lg font-semibold rounded-lg p-2 bg-white ml-2 shadow-lg">
                  {this.state.taskAssignedTo}
                </span>
              </div>
              <div className="flex w-auto justify-end items-center text-gray-500">
                <div>Due Date</div>
                <input
                  type="date"
                  className="bg-white ml-4 px-2 py-2 border-none rounded-lg shadow-lg text-blue-700"
                  value={this.state.taskDeadLine}
                  onChange={(e) => {
                    this.checkRemainingTime(e.target.value) < 0
                      ? this.setState({ isGone: true })
                      : this.setState({ isGone: false });
                    this.setState({ taskDeadLine: e.target.value });
                  }}
                ></input>
              </div>
            </div>
            <div className="mt-4 w-full flex justify-between items-center">
              <div className="relative w-1/3">
                <div className="flex mb-2 items-center justify-between">
                  <div className="text-left w-full">
                    <span className="text-sm font-semibold inline-block text-gray-600">
                      Progress
                    </span>
                  </div>
                  <div className="text-right w-full">
                    <span className="text-sm font-semibold inline-block text-gray-600">
                      {this.state.progress.toFixed(0) + "%"}
                    </span>
                  </div>
                </div>
                <div
                  className={`overflow-hidden h-2 mb-4 text-xs flex rounded ${"bg-white"
                  }`}
                >
                  <div
                    style={{ width: this.state.progress + "%" }}
                    className={`shadow-none rounded-full flex flex-col text-center whitespace-nowrap text-white justify-center ${
                      this.state.isGone ? "bg-red-700" : "bg-blue-800"
                    }`}
                  ></div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-gray-500">Time Remaining</div>
                <span className="bg-white ml-4 px-2 py-2 rounded-lg shadow-lg text-blue-700 mr-4">
                  {this.checkRemainingTime(this.state.taskDeadLine) === 0
                    ? "Today"
                    : this.checkRemainingTime(this.state.taskDeadLine) < 0
                    ? "Over Due"
                    : this.checkRemainingTime(this.state.taskDeadLine) +
                      " Days"}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col justify-start items-start mt-6">
            <h2 className="text-lg font-semibold">Sub Tasks</h2>
            <div class="w-full flex justify-between items-center text-center space-x-2 text-white">
              <div className="w-2/12 bg-gradient-to-br from-blue-500 to-blue-600 py-2 rounded-md">
                Sl No.
              </div>
              <div className="w-10/12 bg-gradient-to-br from-blue-500 to-blue-600 py-2 rounded-md">
                Sub Task
              </div>
              <div className="w-2/12 bg-gradient-to-br from-blue-500 to-blue-600 py-2 rounded-md">
                Sl No.
              </div>
            </div>
            <div
              className="w-full flex flex-col justify-start items-start overflow-y-scroll py-2"
              style={{ height: "57%" }}
            >
              {this.state.subTasks.map((subtask, index) => {
                return (
                  <div className="w-full h-auto max-h-32 flex justify-start items-center space-x-2 mb-3">
                    <div className="w-2/12 h-full max-h-32 flex justify-center items-center py-2 rounded-md px-4 border-2 border-black border-opacity-10 ">
                      {index + 1}
                    </div>
                    <div className="w-10/12 py-2 max-h-32 overflow-y-scroll rounded-md text-justify px-4 border-2 border-black border-opacity-10">
                      {subtask.subtask}
                    </div>
                    <div className="w-2/12 h-full max-h-32 flex justify-center items-center py-2 rounded-md px-4 border-2 border-black border-opacity-10">
                      <input
                        type="checkbox"
                        checked={subtask.isDone}
                        onChange={this.handleCheck}
                        className="form-checkbox h-4 w-4 rounded text-blue-500"
                        id={index}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </StartTemplate>
    );
  }
}
