import { Component } from "react";
import TeamNavbar from "./components/teamnavbar";

import { FadeLoader } from "react-spinners";
import TeamLoader from "./components/TeamLoader";
import StartTemplate from "./components/StartTemplate";

export default class TeamSettings extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
    }
  }
  async componentDidMount() {
    console.log(localStorage.getItem("team"),"team");
    if(localStorage.getItem('team') === null){
      this.props.history.push('/login');
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
            <h1 className="text-3xl text-blue-800 font-bold">Settings</h1>
          </div>
        </div>
      </StartTemplate>
    );
  }
}
