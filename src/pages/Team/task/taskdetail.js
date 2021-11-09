import { Component } from "react";

import '../../../css/global.css';

import BackButton from "../components/BackButton";
import TeamLoader from "../components/TeamLoader";
import TeamNavbar from "../components/teamnavbar";

import Fade from "react-reveal/Fade";
import StartTemplate from "../components/StartTemplate";

export default class TaskDetails extends Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: false,
    }
  }

  render(){
    return (
      <StartTemplate isLoading={this.state.isLoading} isTask={true}>
        <div className="w-full h-full flex flex-col justify-start items-start p-8">
          <Fade top>
            <div className="w-full flex justify-between items-center">
              <BackButton this={this} />
              <div className="w-full flex justify-center items-center text-3xl font-bold text-blue-800">
                Task
              </div>
              <button className="w-auto btn-bg-color text-white rounded-xl py-1 px-4">
                <span>Update</span>
              </button>
            </div>
          </Fade>
          <div className="w-full flex flex-col justify-between items-center mt-6 bg-blue-200 rounded-lg p-4">
            <div className="w-full flex justify-between items-center">
              <div className="text-gray-500">
                Assigned To{"  "}
                <span className="text-gray-800 text-lg font-semibold rounded-lg p-2 bg-white ml-2 shadow-lg">
                  Nexus
                </span>
              </div>
              <div className="text-gray-500">
                Due Date
                <span className="bg-white ml-4 px-2 py-2 rounded-lg shadow-lg text-blue-700">
                  20 December 2021
                </span>
              </div>
            </div>
            <div className="mt-4">
              <span className="bg-white ml-4 px-2 py-2 rounded-lg shadow-lg text-blue-700 mr-4">
                30 Days
              </span>
              Till Deadline
            </div>
          </div>
        </div>
      </StartTemplate>
    );
  }
}