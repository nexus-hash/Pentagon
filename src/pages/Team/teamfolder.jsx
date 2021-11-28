import { Component } from "react";

import "../../css/global.css";

import AddIcon from "@mui/icons-material/Add";
import Fade from "react-reveal";
import BackButton from "./components/BackButton";
import StartTemplate from "./components/StartTemplate";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import { FadeLoader } from "react-spinners";

function FallBackCard(props){
  const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}
  return (
      <a
        href={props.url}
        onClick={() => openInNewTab(props.url)}
        className="flex flex-col justify-between w-full hover:shadow-lg px-2 py-2 line-clamp-1 items-start"
      >
        <div className="h-1/3 w-full bg-gray-300"></div>
        <div className="line-clamp-2">{props.url}</div>
      </a>
  );
}

export default class MaterialFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      folderName:
        this.props.location.state === undefined
          ? ""
          : this.props.location.state.FolderName,
      url: this.props.location.state === undefined ? [] : this.props.location.state.FolderContents,
      FolderID: this.props.location.state === undefined ? "" : this.props.location.state.FolderID,
      newUrl: "",
      showDelete: false,
      dialogueLoader: false,
    };

    this.handleAddUrl = this.handleAddUrl.bind(this);
    this.checkForm = this.checkForm.bind(this);
    this.handleUrlOnChange = this.handleUrlOnChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    if (this.props.location.state === undefined) {
      this.props.history.push("/login");
    }
  }

  handleUrlOnChange = (e) => {
    this.setState({ newUrl: e.target.value });
  }

  isValidURL = (string) => {
        var res = string.match(new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g));
        return (res !== null)
    };
  checkForm = () => {
    return (this.isValidURL(this.state.newUrl))
  }

  handleAddUrl = async () => {
    if(this.checkForm()){
      this.setState({
        isLoading: true,
      });
      await fetch(process.env.REACT_APP_API + "material/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: this.state.newUrl,
          folderid: this.state.FolderID,
          teamid: localStorage.getItem("team"),
        })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "success"){
            this.setState({
              url: data.updatedData,
              newUrl: "",
              isLoading: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
    else{
      alert("Invalid Url");
    }
  }

  handleDelete = async () => {
    this.setState({ dialogueLoader: true });
    await fetch(process.env.REACT_APP_API + "material/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        folderid: this.state.FolderID,
        teamid: localStorage.getItem("team"),
      })
    }).then((res) => res.json())
      .then((data) => {
        if (data.message === "sucess") {
          this.props.history.push("/team/docs");
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ dialogueLoader: false });
      })
  }

  render() {
    return (
      <StartTemplate isLoading={this.state.isLoading} isDocs={true}>
        <div className="w-full h-full flex flex-col justify-start items start">
          <div
            className={`absolute ${
              this.state.showDelete ? "" : "hidden"
            } top-0 right-0 h-screen w-full z-50 flex flex-col justify-center items-center bg-gray-900 bg-opacity-80 `}
          >
            {this.state.dialogueLoader ? (
              <div className="flex flex-col w-full h-screen justify-center items-center">
                <FadeLoader color="#2563eb"></FadeLoader>
              </div>
            ) : (
              <div className="flex flex-col w-full h-screen justify-center items-center">
                <div className="text-white text-xl font-semibold">
                  Are you sure you want to delete this folder?
                </div>
                <div className="flex items-center mt-8">
                  <button
                    onClick={this.handleDelete}
                    className="mr-4 px-2 py-1  bg-gradient-to-br from-red-500 to-red-600 text-white border-2 border-white border-opacity-0 hover:border-opacity-100 rounded-lg shadow-md hover:shadow-lg"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => this.setState({ showDelete: false })}
                    className="px-2 py-1 bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-opacity-40 border-white hover:border-opacity-90 text-white shadow hover:shadow-lg rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          <Fade top>
            <div className="w-full flex justify-between items-center px-4 pt-4 ">
              <BackButton this={this} />
              <div className="w-full flex justify-center items-center">
                <h1 className="w-1/2 truncate text-3xl font-bold flex justify-center items-center text-blue-800">
                  {this.state.folderName}
                </h1>
              </div>
              <button
                onClick={() => {
                  this.setState({ showDelete: true });
                }}
                className="px-4 py-2 btn-bg-color text-white hover:bg-red-700 rounded-lg hover:shadow-md"
              >
                Delete
              </button>
            </div>
          </Fade>
          <div className="w-full h-full flex flex-wrap overflow-y-scroll p-6 scrollbar-hide">
            {this.state.url.length === 0 ? (
              <div className="w-full h-full flex justify-center items-center font-semibold text-xl tracking-wide text-green-600">
                Added links will be displayed here, No links added yet
              </div>
            ) : (
              this.state.url.map((url, index) => {
                console.log(url, "url");
                return (
                  <Fade bottom>
                    <div className="w-1/4 px-2 mb-4">
                      <LinkPreview
                        url={url}
                        className="w-full hover:shadow-lg px-2 py-2 line-clamp-1"
                        openInNewTab={true}
                        descriptionLength="25"
                        imageHeight="8rem"
                        fallback={FallBackCard}
                      />
                    </div>
                  </Fade>
                );
              })
            )}
          </div>
          <div className="w-full h-auto p-2 flex items-center justify-between ">
            <Fade bottom>
              <input
                type="url"
                className="outline-none w-full text-lg py-2 mr-4 rounded-lg border-2 px-4 focus:shadow-xl"
                placeholder="Enter New Url"
                value={this.state.newUrl}
                onChange={this.handleUrlOnChange}
                required
              ></input>
              <button
                onClick={() => this.handleAddUrl()}
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
