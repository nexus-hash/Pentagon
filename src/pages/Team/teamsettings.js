import { Component } from "react";

import StartTemplate from "./components/StartTemplate";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Fade from "react-reveal";

function UserCard(props) {
  return (
    <Fade bottom>
      <div className="flex w-auto justify-between items-center px-4 py-2 border-2 border-blue-400 rounded-lg mr-4 mb-4">
        <div className="truncate w-32">{props.name}</div>
        <button
          className={`${
            props.isAdmin ? "hidden" : ""
          } tracking-tight bg-blue-500 w-1/2 text-white text-opacity-70 hover:text-opacity-100 rounded-lg px-1 py-0.5 ml-4 text-sm`}
        >
          Promote
        </button>
      </div>
    </Fade>
  );
}

export default class TeamSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      joinCode: "Hello Code",
      admins: [
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
      ],
      members: [
        {
          name: "John DoeM",
          user_id: "12345",
        },
        {
          name: "Johny Aspiro Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
        {
          name: "John Doe",
          user_id: "12345",
        },
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
  render() {
    return (
      <StartTemplate isLoading={this.state.isLoading} isSettings={true}>
        <div className="w-full h-full p-8 flex flex-col justify-start items-start">
          <div className="w-full">
            <Fade top>
            <h1 className="text-3xl text-blue-800 font-bold">Settings</h1>
            </Fade>
            <div className="flex justify-between items-center w-full">
              <h2 className="text-2xl font-serif tracking-wide">
                Project Name
              </h2>
              <Fade>
                <div className="flex flex-col items-start bg-blue-600 text-white rounded-lg py-2 px-3 shadow-lg">
                  <label className="text-sm font-semibold text-white text-opacity-60">
                    Join Code
                  </label>
                  <div className="flex">
                    <div className="mr-2">1234-1234-1234</div>
                    <button
                      className="focus:text-opacity-100 text-opacity-75 transform transition hover:scale-105"
                      onClick={() =>
                        navigator.clipboard.writeText(this.state.joinCode)
                      }
                    >
                      <ContentCopyIcon />
                    </button>
                  </div>
                </div>
              </Fade>
            </div>        
            <button className="pl-4 pr-2 py-2 bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-lg hover:scale-105 shadow-lg mb-6 mt-6 transform transition flex items-center">
              <div className="mr-2">Read Project Description and Goal</div>
              <ArrowForwardIosIcon fontSize="small" />
            </button>
            <div className="text-lg font-bold tracking-wide">Admins</div>
            <Fade bottom>
            <div className="w-full mt-2 h-14 overflow-y-scroll flex flex-wrap justify-start items-center">
              {this.state.admins.map((admin, index) => (
                <UserCard isAdmin={true} name={admin.name} />
              ))}
            </div>
            </Fade>
            <Fade>
            <div className="text-lg font-bold tracking-wide">Members</div>
            <div className="w-full mt-2 overflow-y-scroll flex flex-wrap justify-start items-center">
              {this.state.members.map((member, index) => (
                <UserCard name={member.name} isAdmin={false} />
              ))}
            </div>
            </Fade>
          </div>
        </div>
      </StartTemplate>
    );
  }
}
