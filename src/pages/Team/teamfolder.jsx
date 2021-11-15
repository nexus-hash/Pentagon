import { Component } from "react";

import AddIcon from "@mui/icons-material/Add";
import Fade from "react-reveal";
import BackButton from "./components/BackButton";
import StartTemplate from "./components/StartTemplate";

export default class MaterialFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      folderName: this.props.location.state === undefined ? "" : this.props.location.state.FolderName,
    };
  }
  componentDidMount() {
    if (this.props.location.state === undefined) {
      this.props.history.push("/login");
    }
    var team = JSON.parse(localStorage.getItem("teamdetails"));
    console.log(team, "team");

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
                  {this.state.folderName}
                </h1>
              </div>
            </div>
          </Fade>
          <div className="w-full h-full"></div>
          <div className="w-full h-auto p-2 flex items-center justify-between ">
            <Fade bottom>
              <form className="w-full h-auto p-2 flex items-center justify-between rounded-xl">
                <input
                  type="url"
                  className="outline-none w-full text-lg py-2 mr-4 rounded-lg border-2 px-4 focus:shadow-xl"
                  placeholder="Enter New Url"
                  required
                ></input>
                <button
                  onClick={() => null}
                  className="p-1 rounded-full bg-gradient-to-tl text-white bg-blue-700 border-2 border-gray-200 hover:shadow-xl"
                >
                  <AddIcon fontSize="large"></AddIcon>
                </button>
              </form>
            </Fade>
          </div>
        </div>
      </StartTemplate>
    );
  }
}
