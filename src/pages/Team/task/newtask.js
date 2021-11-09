import { Component } from "react";
import StartTemplate from "../components/StartTemplate";

export default class NewTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }
  render(){
    return(
      <StartTemplate isLoading={this.state.isLoading} isTask={true}>

      </StartTemplate>
    )
  }
}