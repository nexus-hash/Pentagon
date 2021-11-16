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
      goal: "",
    };
  }
  componentDidMount() {
    this.setState({
      goal: this.props.location.state.goal,
    });
  }

  render() {
    return (
      <StartTemplate isLoading={this.state.isLoading} isDocs={true}>
        <div className="w-full h-full flex flex-col justify-start items start">
          <Fade top>
            <div className="w-full flex justify-between items-center px-4 pt-4">
              <BackButton this={this} />
              <div className="w-full flex justify-center items-center">
                <h1 className="w-1/2 truncate text-3xl font-bold flex justify-center items-center text-blue-800">
                  Project Goal
                </h1>
              </div>
            </div>
          </Fade>
          <div className="w-full h-full p-6 text-lg tracking-wide break-normal overflow-y-scroll text-justify">
            <pre>
              <code>{this.state.goal}</code>
            </pre>
          </div>
        </div>
      </StartTemplate>
    );
  }
}
