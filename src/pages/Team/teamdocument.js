import { Component } from "react";
import TeamNavbar from "./components/teamnavbar";

import { FadeLoader } from "react-spinners";
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from "@mui/icons-material/Folder";
import Fade from "react-reveal";

function FolderCard(props){
  return(
    <Fade bottom>
    <button onClick={props.onClick} className="w-auto max-w-xs flex justify-between mr-3 mb-3 items-center h-12 border-2 border-blue-900 border-opacity-40 px-4 rounded-lg">
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
      folders: [
        "The infinite length folder",
        "Folder 2",
        "Folder 3",
        "Folder 4",
        "Folder 5",
        "Folder 6",
        "Folder 7",
      ],
    };
  }

  async componentDidMount() {
    console.log(localStorage.getItem("team"), "team");
    if (localStorage.getItem("team") === null) {
      this.props.history.push("/login");
    }
    this.setState({
      isLoading: false,
    });
  }

  handleFolderOnClick = (FolderName) => {
    console.log(FolderName);
    this.props.history.push({
      pathname: "/team/docs/content",
      state: {
        FolderName: FolderName,
      },
    });
  };

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
            <div className="w-full h-full flex flex-col justify-start items-start p-8">
              <Fade top>
                <h2 className="text-3xl text-blue-800 font-bold">
                  Project Reference Materials
                </h2>
              </Fade>
              <div className="w-full h-full my-2">
                <div className="py-4 flex flex-wrap w-full h-auto">
                  {this.state.folders.map((folder) => {
                    return (
                      <FolderCard
                        onClick={() => this.handleFolderOnClick(folder)}
                        Folder={folder}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="w-full flex justify-center items-center">
                <Fade bottom>
                  <button className="p-2 rounded-full bg-gradient-to-tl text-white hover:shadow-xl from-blue-500 to-blue-700">
                    <AddIcon fontSize="large"></AddIcon>
                  </button>
                </Fade>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }
}