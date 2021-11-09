import { Component } from "react";
import TeamNavbar from "./components/teamnavbar";

import { FadeLoader } from "react-spinners";

export default class TeamSettings extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
    }
  }
  render() {
    return (
      <div className="w-full h-full flex justify-start items-start">
        <TeamNavbar isSettings={true} />
        <main className="bg-gray-50 w-4/5 h-screen shadow-2xl">
          {this.state.isLoading ? (
            <div className="h-screen flex justify-center items-center text-blue-300 w-full">
              <FadeLoader color="#2563eb" />
            </div>
          ) : (
            <div className="w-full h-full p-4 flex flex-col justify-start items-start">
              <div className="w-full">
                 <h1 className="text-3xl text-blue-800 font-bold">Settings</h1> 
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }
}
