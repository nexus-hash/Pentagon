import { Component } from "react";
import { Link } from "react-router-dom";

import "./css/signup.css";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

class signup extends Component{

  constructor(props){
    super(props);
    this.state={
      loginMessage:"",
      usernameMessage:"",
      passwordMatch: "",
      name:"",
      username:"",
      email:"",
      password:"",
      confirmPassword:""
    }
    this.handleVisibilityClick = this.handleVisibilityClick.bind(this);
    this.handleUsernameChange  = this.handleUsernameChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleUserRegistrationOnClick = this.handleUserRegistrationOnClick.bind(this);
  }

  handleVisibilityClick(){
    var visibleButton = document.getElementById('visible');
    var visibleOffButton = document.getElementById('notVisible');
    var passwordInputField = document.getElementById('password');
    if(passwordInputField.type === "password"){
      visibleButton.className +=" hidden";
      visibleOffButton.className-="hidden";
      passwordInputField.type = "text";
    }
    else{
      visibleButton.className -= "hidden";
      visibleOffButton.className += " hidden";
      passwordInputField.type = "password";
    }
  }

  handleNameChange (event){
    this.setState({
      name: event.target.value
    })
  }

  handleUsernameChange (event){
    this.setState({
      username: event.target.value,
    });
  }

  handlePasswordChange(event){
    var submitButton = document.getElementById('submitButton');
    this.setState({
      password: event.target.value,
    });

    if (this.state.confirmPassword === event.target.value) {
      this.setState({
        passwordMatch: "",
      });
      submitButton.removeAttribute('disabled')
    } else {
      this.setState({
        passwordMatch: "Confirm Password and Password does not match.",
      });
    }
  }

  handleConfirmPasswordChange(event){
    
    this.setState({
      confirmPassword: event.target.value,
    });
    
    if(this.state.password === event.target.value){
      this.setState({
        passwordMatch:"",
      });
    }else{
      this.setState({
        passwordMatch:"Confirm Password and Password does not match.",
      });
      
    }
  }

  handleEmailChange (event){
    this.setState({
      email: event.target.value,
    });
  }

  handleUserRegistrationOnClick(){
    console.log("Allowed");
  }

  render(){
    return (
      <div className="app-bg-color w-full sm:h-screen overflow-y-scroll h-auto sm:overflow-hidden flex flex-col justify-between items-center lg:space-y-0 space-y-10">
        <div className="w-full lg:h-16 flex justify-center items-center ">
          <div className="w-full max-w-7xl py-3 2xl:px-0 px-4 flex justify-start items-center font-serrif tracking-wider font-bg-color lg:text-4xl text-3xl">
            PENTAGON
          </div>
        </div>
        <form className="xl:w-1/3 lg:w-1/2 sm:w-3/4 max-w-7xl w-full lg:p-0 px-6 h-auto flex flex-col justify-between space-y-2 items-center">
            <div className="lg:text-3xl text-2xl sm:font-mono font-serif font-bg-color font-semibold tracking-wide lg:mb-2">
              Introduce Yourself
            </div>
            <div className="text-red-700 font-medium lg:text-lg text-sm">
              {this.loginMessage}
            </div>

            <input
              type="text"
              placeholder="Username"
              className="w-full bg-white px-4 py-2 rounded-lg border-2 border-gray-100 focus:shadow-xl focus:outline-none focus:border-transparent"
              onChange={this.handleUsernameChange}
              value={this.state.username}
              required
            ></input>
            <font className="text-green-600 w-full lg:text-sm text-xs text-left">
              {this.usernameMessage}
            </font>
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-white px-4 py-2 rounded-lg border-2 border-gray-100 mb-1 focus:shadow-xl focus:outline-none focus:border-transparent"
              onChange={this.handleNameChange}
              value={this.state.name}
              required
            ></input>
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-white px-4 py-2 rounded-lg border-2 border-gray-100 mb-1 focus:shadow-xl focus:outline-none focus:border-transparent"
              onChange={this.handleEmailChange}
              value={this.state.email}
              required
            ></input>
            <div className="w-full bg-white flex justify-center pr-2 items-center border-2 rounded-lg border-gray-100 mb-1 ">
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="px-4 py-2 w-full focus:shadow-xl focus:outline-none focus:border-transparent rounded-lg"
                onChange={this.handlePasswordChange}
                value={this.state.password}
                required
              ></input>
              <div id="visible" className="">
                <VisibilityIcon
                  className="cursor-pointer hover:"
                  id="eyeIcon"
                  onClick={this.handleVisibilityClick}
                ></VisibilityIcon>
              </div>
              <div id="notVisible" className="hidden">
                <VisibilityOffIcon
                  className="cursor-pointer hover:shadow-md"
                  id="eyeIcon"
                  onClick={this.handleVisibilityClick}
                ></VisibilityOffIcon>
              </div>
            </div>
            <div className="w-full sm:spcae-y-0 space-y-1">
              <div className="w-full px-2 sm:flex justify-start items-center sm:tracking-tight sm:space-x-1 space-y-1 lg:space-y-0 text-sm">
                <div className="text-green-600 sm:w-1/2 w-full flex items-center">
                  <CheckCircleIcon
                    id="schar"
                    fontSize="small"
                    className="text-red-600 mr-1"
                  ></CheckCircleIcon>
                  {"   "}
                  At least one special character
                </div>
                <div className="text-green-600 sm:w-1/2 flex items-center">
                  <CheckCircleIcon
                    id="calphabet"
                    fontSize="small"
                    className="text-red-600 mr-1"
                  ></CheckCircleIcon>
                  {"   "}
                  Minimum one capital alphabet
                </div>
              </div>
              <div className="w-full px-2 sm:flex justify-start items-center sm:tracking-tight sm:space-x-1 space-y-1 lg:space-y-0 text-sm">
                <div className="text-green-600 w-1/2 flex items-center">
                  <CheckCircleIcon
                    id="num"
                    fontSize="small"
                    className="text-red-600 mr-1"
                  ></CheckCircleIcon>
                  {"   "}
                  At least one number
                </div>
                <div className="text-green-600 w-1/2 flex items-center">
                  <CheckCircleIcon
                    id="minchar"
                    fontSize="small"
                    className="text-red-600 mr-1"
                  ></CheckCircleIcon>
                  {"   "}
                  Minimum 8 characters
                </div>
              </div>
            </div>
            <div className="w-full px-2 flex justify-start items-center space-x-4 text-xs"></div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-white px-4 py-2 rounded-lg border-2 border-gray-100 focus:shadow-xl focus:outline-none focus:border-transparent"
              onChange={this.handleConfirmPasswordChange}
              value={this.state.confirmPassword}
              required
            ></input>
            <div className="text-red-600 w-full px-2 lg:text-xs text-sm text-left">
              {this.state.passwordMatch}
            </div>
            <div></div>
            <button
              onClick={this.handleUserRegistrationOnClick}
              id="submitButton"
              type="submit"
              className="w-full py-2 rounded-lg text-center btn-bg-color-not-allowed text-white hover:shadow-lg cursor-not-allowed"
            >
              Sign Up
            </button>
            <div className="w-full py-2 flex justify-between items-center">
              <Link
                to="/login"
                className="w-full py-2 border-2 text-center border-gray-400 font-bg-color rounded-lg text-sm"
              >
                Login?
              </Link>
            </div>
        </form>
        <div className="h-20 w-full "></div>
      </div>
    );
  }
}

export default signup;