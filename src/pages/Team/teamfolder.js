import { Component } from "react";

import TeamNavbar from "./components/teamnavbar";
import { FadeLoader } from "react-spinners";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import Fade from "react-reveal";

export default class MaterialFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      folderName: this.props.location.state.FolderName,
    };
    console.log(this.props.location.state.FolderName);
  }
  render() {
    return (
      <div className="w-full h-full flex justify-start items-start overflow-hidden">
        <TeamNavbar isDocs={true} />
        <main className="bg-gray-50 w-4/5 h-screen shadow-2xl">
          {this.state.isLoading ? (
            <div className="h-screen flex justify-center items-center text-blue-300 w-full">
              <FadeLoader color="#2563eb" />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col justify-start items start">
              <Fade top>
                <div className="w-full flex justify-between items-center px-4 pt-4">
                  <button
                    onClick={() => this.props.history.goBack()}
                    className="p-1 rounded-full border-2 border-black flex items-center justify-center"
                  >
                    <ArrowBackIcon />
                  </button>
                  <div className="w-full flex justify-center items-center">
                    <h1 className="w-1/2 truncate text-3xl font-bold flex justify-center items-center text-blue-800">
                      {this.state.folderName}
                    </h1>
                  </div>
                </div>
              </Fade>
              <div className="w-full h-full">

              </div>
              <div className="w-full h-auto p-2 flex items-center justify-between bg-blue-50">
                <Fade bottom>
                <form className="w-full h-auto p-2 flex items-center justify-between rounded-xl" >
                  <input
                    type="url"
                    className="outline-none w-full text-lg py-2 mr-4 rounded-lg border-2 px-4 focus:shadow-xl"
                    placeholder="Enter the Url"
                    required
                  ></input>
                  <button className="p-1 rounded-full bg-gradient-to-tl text-blue-700 bg-gray-50 border-2 border-gray-200 hover:shadow-xl">
                    <AddIcon fontSize="large"></AddIcon>
                  </button>
                </form>
                </Fade>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }
}
