import { Component } from "react";
import StartTemplate from "../components/StartTemplate";

export default class DeleteTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {},
      team: {},
      project: {},
      isLoading: false,
    };
  }

  componentDidMount() {}
  render() {
    return(
      <StartTemplate isLoading={this.state.isLoading} isTask={true}>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-3xl text-blue-800 font-bold mb-4">Delete Task</h1>
          <p className="text-lg text-gray-900 ">Are you sure you want to delete this task?</p>
          <div className="w-full justify-center items-center flex mt-6">
          <button className="mr-4 px-2 py-1  bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg">Confirm</button>
          <button onClick={()=>this.props.history.goBack()} className="px-2 py-1 bg-white border-2 border-opacity-40 border-gray-600 hover:border-opacity-90 shadow hover:shadow-lg rounded-lg">Cancel</button>
          </div>
        </div>
      </StartTemplate>
    )
  }
}