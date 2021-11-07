import {Component} from 'react';
import verifyToken from '../utils/verifytoken';
import { Link } from 'react-router-dom';
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Logo from "../../assets/pentlogolight.svg";
import Fade from  'react-reveal/Fade';

import '../../css/global.css';

export default class TeamDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      teamid: this.props.teamid,
    }
  }

  async componentDidMount() {
    console.log(localStorage.getItem('team'));
    var p = await verifyToken();
    if(!p){
      this.props.history.push('/login');
    }
  }
  render() {
    return (
      <div className="w-full h-full flex justify-start items-start">
        <Fade left cascade>
        <div className="w-1/5 h-screen nav-bg-color flex flex-col justify-start items-center py-6 px-4 rounded-tr-xl rounded-br-xl">
          <Link
            to="/dashboard"
            className="flex justify-start w-full items-center mb-4"
          >
            <div className="p-1 border-2 border-gray-800 rounded-full h-auto flex mr-4 justify-center items-center">
              <ArrowBackOutlinedIcon fontSize="small" />
            </div>
            <div className="text-base text-gray-800">Back to All Projects</div>
          </Link>
          <img
            alt="Pentagon Logo"
            src={Logo}
            style={{
              width: "4rem",
            }}
            className="mr-2"
          />
          <button>Task List</button>
          <button>Project Materials and Documents</button>
          <button>Settings</button>
        </div>
        </Fade>
        <h1>Team Dashboard</h1>
      </div>
    );
  } 
}