import { Component } from "react";

import AddIcon from "@mui/icons-material/Add";
import FolderIcon from "@mui/icons-material/Folder";
import Fade from "react-reveal";
import StartTemplate from "./components/StartTemplate";
import loadData from "../../data/loaddata";
import { Alert, Snackbar } from "@mui/material";

function FolderCard(props) {
  return (
    <Fade bottom>
      <button
        onDoubleClick={props.onClick}
        className="w-auto hover:bg-blue-50 max-w-xs flex justify-between mr-3 mb-3 items-center h-12 border-2 border-blue-900 border-opacity-40 px-4 rounded-lg"
      >
        <FolderIcon className="text-3xl mr-2 text-yellow-500" />
        <div className="truncate w-32 text-left">{props.Folder}</div>
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
      newfolder: "",
      snackbarOpen: false,
      codeMessage: "",
      handleErrorSnacbarClose: false,
      codeErrorMessage: "",
      snackbarErrorOpen: false,
    };

    this.handleNewFolderOnChange = this.handleNewFolderOnChange.bind(this);
    this.handleFolderOnClick = this.handleFolderOnClick.bind(this);
    this.handleNewFolder = this.handleNewFolder.bind(this);
    this.handleSnacbarClose = this.handleSnacbarClose.bind(this);
    this.handleSnacbarOpen = this.handleSnacbarOpen.bind(this);
    this.handleErrorSnacbarClose = this.handleErrorSnacbarClose.bind(this);
    this.handleErrorSnacbarOpen = this.handleErrorSnacbarOpen.bind(this);
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    if (localStorage.getItem("team") === null) {
      this.props.history.push("/login");
    }
    await fetch(process.env.REACT_APP_API + "material", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teamid: localStorage.getItem("team"),
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "success") {
        this.setState({
          folders: data.folders,
          isLoading: false,
        });
      }
    })
    .catch((err) => {
      this.setState({
        codeErrorMessage: "Error fetching data",
        isLoading: false,
        snackbarErrorOpen: true,
      });
    })
  }

  handleNewFolderOnChange = (e) => {
    this.setState({ newfolder: e.target.value });
  };

  handleFolderOnClick = (FolderName, FolderID, FolderContents) => {
    this.props.history.push({
      pathname: "/team/docs/content",
      state: {
        FolderName: FolderName,
        FolderID: FolderID,
        FolderContents: FolderContents,
      },
    });
  };

  handleNewFolder = async () => {
    this.setState({ isLoading: true });
    if (this.state.newfolder === "") {
      console.log("No Folder Name");
      return;
    } else {
      console.log("New Folder Name: ", this.state.newfolder);
      var foldername = this.state.newfolder;
      var teamid = localStorage.getItem("team");
      var fetchdata;
      await fetch(process.env.REACT_APP_API + "material/newfolder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foldername: foldername,
          teamid: teamid,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          fetchdata = data;
        })
        .catch((err) => {
          this.setState({
            isLoading: false,
          });
          this.handleErrorSnacbarOpen("Failed to Create a new Folder");
          return;
        });
      if (fetchdata !== undefined) {
        if (fetchdata.message === "Folder added successfully") {
          await loadData();
          var team = JSON.parse(localStorage.getItem("teamdetails"))[0];
          var folders = team.projectmaterials;
          this.setState({
            folders: folders,
            isLoading: false,
          });
          this.handleSnacbarOpen("Folder Created Successfully");
        }
        if (fetchdata.message === "Error creating folder") {
          this.setState({
            isLoading: false,
          });
          this.handleErrorSnacbarOpen("Failed to Create a new Folder");
        }
      }
    }
  };

  handleSnacbarOpen = (message) => {
    this.setState({
      snackbarOpen: true,
      codeMessage: message,
    });
  };

  handleSnacbarClose = () => {
    this.setState({
      snackbarOpen: false,
    });
  };

  handleErrorSnacbarOpen = (message) => {
    this.setState({
      snackbarOpen: true,
      codeErrorMessage: message,
    });
  };

  handleErrorSnacbarClose = () => {
    this.setState({
      snackbarOpen: false,
    });
  };

  render() {
    return (
      <StartTemplate isLoading={this.state.isLoading} isDocs={true}>
        <Snackbar
          open={this.state.snackbarOpen}
          autoHideDuration={5000}
          onClose={this.handleSnacbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            style={{ border: "1px solid green" }}
            onClose={this.handleSnacbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {" "}
            {this.state.codeMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.snackbarErrorOpen}
          autoHideDuration={5000}
          onClose={this.handleErrorSnacbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            style={{ border: "1px solid red" }}
            onClose={this.state.handleErrorSnacbarClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {" "}
            {this.state.codeErrorMessage}
          </Alert>
        </Snackbar>
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
                    onClick={() =>
                      this.handleFolderOnClick(
                        folder.foldername,
                        folder.folderid,
                        folder.contents
                      )
                    }
                    Folder={folder.foldername}
                  />
                );
              })}
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <Fade bottom>
              <input
                type="text"
                className="outline-none w-full text-lg py-2 mr-4 rounded-lg border-2 px-4 focus:shadow-xl"
                placeholder="New Folder Name"
                value={this.state.newfolder}
                onChange={this.handleNewFolderOnChange}
                required
              ></input>
              <button
                onClick={this.handleNewFolder}
                className="p-1 rounded-full bg-gradient-to-tl text-white bg-blue-700 border-2 border-gray-200 hover:shadow-xl"
              >
                <AddIcon fontSize="large"></AddIcon>
              </button>
            </Fade>
          </div>
        </div>
      </StartTemplate>
    );
  }
}
