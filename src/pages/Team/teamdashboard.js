import {Component} from 'react';
import verifyToken from '../utils/verifytoken';


import '../../css/global.css';
import TeamNavbar from './components/teamnavbar';

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
        <TeamNavbar isTask={true}/>
        <main className="bg-gray-50 w-4/5 h-screen shadow-2xl"></main>
      </div>
    );
  } 
}