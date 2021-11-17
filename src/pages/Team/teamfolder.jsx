import { Component } from "react";

import AddIcon from "@mui/icons-material/Add";
import Fade from "react-reveal";
import BackButton from "./components/BackButton";
import StartTemplate from "./components/StartTemplate";
import { LinkPreview } from "@dhaiwat10/react-link-preview";

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
    };
  }
  componentDidMount() {
    if (this.props.location.state === undefined) {
      this.props.history.push("/login");
    }
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
          <div className="w-full h-full flex flex-wrap overflow-y-scroll p-6 scrollbar-hide">
            {this.state.url.length === 0 ? (
              <div className="w-full h-full flex justify-center items-center font-semibold tracking-wide font-serif text-green-600">
                Added links to materials will be displayed here
              </div>):(
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
                        
                      />
                    </div>
                    </Fade>
                  );
                } )
              )}
          </div>
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
