import { Component } from "react";

import "../../css/global.css";
import Logo from "../../assets/pentagon.png";

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      counter: 0
    }
  }

  render() {
    return (
      <div className="flex flex-col justify-start items-center">
        <div className="w-full flex justify-between nav-bg-color items-center py-3 px-12">
          <div className="flex justify-between items-center w-32">
          <img alt="Pentagon Logo" src={Logo} className="h-8 text-white" />
          <h1>PENTAGON</h1></div>
          <button className="">Projects</button>
          <button>Create Project</button>
          <button>Join Project</button>
          <div className="w-5/12 items-end justify-end flex">
            <button>Logout</button>
          </div>
        </div>
        <div className="h-auto w-full overflow-y-scroll app-bg-color flex justify-start items-center"></div>
      </div>
    );
  }
}

export default Dashboard;