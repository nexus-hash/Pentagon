import {Component} from 'react';
import verifyToken from '../utils/verifytoken';

export default class TeamDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      teamid: this.props.teamid,
    }
  }

  componentDidMount() {
    if(!verifyToken()){
      this.props.history.push('/login');
    }
  }
  render() {
    return (
      <div>
        <h1>Team Dashboard</h1>
      </div>
    );
  } 
}