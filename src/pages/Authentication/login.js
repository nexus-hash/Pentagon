import { Component } from "react";

import "../../css/login.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Navbar from "./components/Navbar";
import SubmitButton from "./components/Submit";
import SecondaryButton from "./components/SecondaryButton";
import Loader from "../utils/Loader";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginMessage: "",
      loadingMessage: "Verifying Credentials",
      visibleButtonClass: "",
      email: "",
      emailCheck: false,
      password: "",
      visibleOffButtonClass: "hidden",
      passwordFieldType: "password",
      btnState: true,
      btnbg: 0.6,
      emailMessage: "",
      isLoading: false,
    };
    console.log(localStorage.getItem("token"));
    this.handleVisibilityClick = this.handleVisibilityClick.bind(this);
    this.checkFormValidation = this.checkFormValidation.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentDidMount() {
    var authtoken = localStorage.getItem("token");
    if (authtoken) {
      fetch(process.env.REACT_APP_API + "auth/verifytoken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: authtoken,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Token is valid") {
            this.props.history.push("/dashboard");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  checkFormValidation() {
    if (this.state.emailCheck && this.state.password !== "") {
      this.setState({
        btnState: false,
        btnbg: 1,
      });
    } else {
      this.setState({
        btnState: true,
        btnbg: 0.6,
      });
    }
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
    const re =
      /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(event.target.value)) {
      this.setState({
        emailCheck: true,
        emailMessage: "",
      });
    } else {
      this.setState({
        emailCheck: false,
        emailMessage: "Enter a valid Email Id",
      });
    }
    this.checkFormValidation();
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
    this.checkFormValidation();
  };

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

  handleLoginOnClick = async () => {
    this.setState({
      isLoading: true,
    });
    await fetch(process.env.REACT_APP_API + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Login Successful" && data.token !== "") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", this.state.email);
          localStorage.setItem("uname", data.uname);
          this.setState({
            loadingMessage: "Remembering user",
          });
          setTimeout(() => {
            this.props.history.push("/dashboard");
          }, 1500);
        } else if (data.message === "Bad Auth. Invalid Credentials") {
          this.setState({
            loginMessage: "Invalid Credentials",
            isLoading: false,
          });
        } else if(data.message === "User not found"){
          this.setState({
            loginMessage: "User not found",
            isLoading: false,
          });
          setTimeout(() => {
          this.props.history.push("/signup");  
          }, 1000);
          
        }else {
          this.setState({
            loginMessage: "Server Error",
            isLoading: false,
          });
        }
      })
      .catch((err) => {
        this.setState({
          loginMessage: "Login Failed",
          isLoading: false,
        });
      });
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 3000);
  };

  render() {
    var body;
    if (this.state.isLoading) {
      body = <Loader message={this.state.loadingMessage}></Loader>;
    } else {
      body = (
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
            onChange={this.handleEmailChange}
            value={this.state.email}
            className="w-full bg-white px-4 py-2 rounded-lg border-2 border-gray-100 focus:shadow-xl focus:outline-none focus:border-red-200 focus:border-opacity-30"
            required
          ></input>
          <div className="text-red-500">{this.state.emailMessage}</div>
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
            onClick={this.handleLoginOnClick}
          ></SubmitButton>
          <div className="w-full py-2 flex justify-between items-center space-x-2">
            <SecondaryButton
              path="/forgotpassword"
              title="Forgot Password?"
              Width="50%"
            ></SecondaryButton>
            <SecondaryButton
              path="/signup"
              title="Sign Up?"
              Width="50%"
            ></SecondaryButton>
          </div>
        </div>
      );
    }

    return (
      <div className="app-bg-color w-full h-screen overflow-hidden flex flex-col justify-between items-center">
        <Navbar></Navbar>
        {body}
        <div className="h-20 w-full "></div>
      </div>
    );
  }
}

export default login;
