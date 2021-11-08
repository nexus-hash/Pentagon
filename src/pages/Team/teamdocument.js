import { Component } from "react";
import TeamNavbar from "./components/teamnavbar";

export default class TeamDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  render() {
    return (
      <div className="w-full h-full flex justify-start items-start">
        <TeamNavbar isDocs={true} />
        <main className="bg-gray-50 w-4/5 h-screen shadow-2xl"></main>
      </div>
    );
  }
}