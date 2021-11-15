import { Component } from "react";

import AddIcon from '@mui/icons-material/Add';
import FolderIcon from "@mui/icons-material/Folder";
import Fade from "react-reveal";
import StartTemplate from "./components/StartTemplate";

function FolderCard(props){
  return(
    <Fade bottom>
    <button onClick={props.onClick} className="w-auto hover:bg-blue-50 max-w-xs flex justify-between mr-3 mb-3 items-center h-12 border-2 border-blue-900 border-opacity-40 px-4 rounded-lg">
      <FolderIcon className="text-3xl mr-2 text-yellow-500" />
      <div className="truncate w-28 text-left">{props.Folder}</div>
    </button>
    </Fade>
  );
}

export default class TeamDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      folders: [],
    };
  }

  async componentDidMount() {
    console.log(localStorage.getItem("team"), "team");
    if (localStorage.getItem("team") === null) {
      this.props.history.push("/login");
    }
    var team = JSON.parse(localStorage.getItem("teamdetails"))[0];
    var folders = team.projectmaterials;
    this.setState({
      folders: folders,
      isLoading: false,
    });
  }

  handleFolderOnClick = (FolderName,FolderID,FolderContents) => {
    this.props.history.push({
      pathname: "/team/docs/content",
      state: {
        FolderName: FolderName,
        FolderID: FolderID,
        FolderContents: FolderContents
      },
    });
  };

  render() {
    return (
      <StartTemplate isLoading={this.state.isLoading} isDocs={true}>
        <div className="w-full h-full flex flex-col justify-start items-start p-8">
          <Fade top>
            <h2 className="text-3xl text-blue-800 font-bold">
              Project Reference Materials
            </h2>
          </Fade>
          <div className="w-full h-full my-2">
            <div className="py-4 flex flex-wrap w-full h-auto max-h-full scrollbar-hide">
              {this.state.folders.map((folder) => {
                return (
                  <FolderCard
                    onClick={() => this.handleFolderOnClick(folder.foldername,folder.folderid,folder.contents)}
                    Folder={folder.foldername}
                  />
                );
              })}
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <Fade bottom>
              <form className="w-full h-auto flex items-center justify-between rounded-xl">
                <input
                  type="url"
                  className="outline-none w-full text-lg py-2 mr-4 rounded-lg border-2 px-4 focus:shadow-xl"
                  placeholder="New Folder Name"
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