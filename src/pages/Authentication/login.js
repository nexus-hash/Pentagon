import { Component } from "react";

import "../../css/login.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Navbar from "./components/Navbar";
import SubmitButton from "./components/Submit";
import SecondaryButton from "./components/SecondaryButton";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginMessage: "",
      visibleButtonClass: "",
      visibleOffButtonClass: "hidden",
      passwordFieldType: "password",
      btnState: true,
      btnbg: 0.6,
    };

    this.handleVisibilityClick = this.handleVisibilityClick.bind(this);
  }

  checkFormValidation() {
    
  }

  handleVisibilityClick() {
    if (this.state.passwordFieldType === "password") {
      this.setState({
        visibleButtonClass: "hidden",
        visibleOffButtonClass: "",
        passwordFieldType: "text",
      });
    } else {
      this.setState({
        visibleButtonClass: "",
        visibleOffButtonClass: "hidden",
        passwordFieldType: "password",
      });
    }
  }

  render() {
    return (
      <div className="app-bg-color w-full h-screen overflow-hidden flex flex-col justify-between items-center">
        <Navbar></Navbar>
        <div className="lg:w-1/3 sm:w-3/4 w-full lg:p-0 px-12 h-auto flex flex-col justify-between space-y-2 items-center">
          <div className="lg:text-3xl text-2xl font-mono font-bg-color font-semibold tracking-wide lg:mb-2">
            Provide Your Credential
          </div>
          <div className="text-red-700 font-medium lg:text-lg text-sm">
            {this.state.loginMessage}
          </div>
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white px-4 py-2 rounded-lg border-2 border-gray-100 focus:shadow-xl focus:outline-none focus:border-red-200 focus:border-opacity-30"
            required
          ></input>
          <div className="w-full bg-white flex justify-center pr-2 items-center border-2 rounded-lg border-gray-100 mb-1 ">
            <input
              id="password"
              type={this.state.passwordFieldType}
              placeholder="Password"
              className="px-4 py-2 w-full focus:shadow-xl focus:outline-none focus:border-transparent rounded-lg"
              onChange={this.handlePasswordChange}
              value={this.state.password}
              required
            ></input>
            <div id="visible" className={this.state.visibleButtonClass}>
              <VisibilityIcon
                className="cursor-pointer"
                id="eyeIcon"
                onClick={this.handleVisibilityClick}
              ></VisibilityIcon>
            </div>
            <div id="notVisible" className={this.state.visibleOffButtonClass}>
              <VisibilityOffIcon
                className="cursor-pointer "
                id="eyeIcon"
                onClick={this.handleVisibilityClick}
              ></VisibilityOffIcon>
            </div>
          </div>
          <div className="w-full px-2 flex justify-start items-center space-x-4 text-xs"></div>
          <div></div>
          <SubmitButton
            title="Authenticate"
            btnState={this.state.btnState}
            btnbg={this.state.btnbg}
          ></SubmitButton>
          <div className="w-full py-2 flex justify-between items-center">
            <SecondaryButton
              path="/forgotpassword"
              title="Forgot Password?"
              Width="50%"
            ></SecondaryButton>
            <SecondaryButton path="/signup" title="Sign Up?" Width = "50%"></SecondaryButton>
          </div>
        </div>
        <div className="h-20 w-full "></div>
      </div>
    );
  }
}

export default login;
