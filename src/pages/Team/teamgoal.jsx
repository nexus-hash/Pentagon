import { Component } from "react";

import AddIcon from "@mui/icons-material/Add";
import Fade from "react-reveal";
import BackButton from "./components/BackButton";
import StartTemplate from "./components/StartTemplate";

export default class ProjectGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      goal:"",
    };
  }
  componentDidMount() {
    
  }

  render() {
    return (
      <StartTemplate isLoading={this.state.isLoading} isDocs={true} >
        <div className="w-full h-full flex flex-col justify-start items start">
          <Fade top>
            <div className="w-full flex justify-between items-center px-4 pt-4">
              <BackButton this={this} />
              <div>Project Goal</div>
              <div className="w-full flex justify-center items-center">
                <h1 className="w-1/2 truncate text-3xl font-bold flex justify-center items-center text-blue-800">
                  {this.state.goal}
                </h1>
              </div>
            </div>
          </Fade>
          <div className="w-full h-full"></div>
        </div>
      </StartTemplate>
    );
  }
}
