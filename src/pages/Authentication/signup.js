import { Component } from "react";

import "../../css/signup.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Loader from "../utils/Loader";
import Navbar from "./components/Navbar";
import SubmitButton from "./components/Submit";
import SecondaryButton from "./components/SecondaryButton";
import InputField from "./components/inputField";
import CircularIndicator from "./components/circularIndicator";

class signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginMessage: "",
      usernameMessage: "",
      emailMessage: "",
      passwordMatch: "",
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      verificationCode: "",
      codeMessage: "",
      code: "Send Code",
      passwordFieldType: "password",
      oneNum: false,
      oneCap: false,
      oneSpecial: false,
      lengthEight: false,
      emailCheck: false,
      isLoading: false,
      seconds: 0,
      oneNumColor: "#DC2626",
      oneCapColor: "#DC2626",
      oneSpecialColor: "#DC2626",
      lengthEightColor: "#DC2626",
      btnBg: 0.6,
      buttonState: true,
      codeButtonColor:.3,
      visibleButtonClass: "",
      visibleOffButtonClass: "hidden",
      codeButtonState: false,
    };
    this.timer = 0;
    this.handleVisibilityClick = this.handleVisibilityClick.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange =
      this.handleConfirmPasswordChange.bind(this);
    this.handleUserRegistrationOnClick =
      this.handleUserRegistrationOnClick.bind(this);
    this.checkSubmissionForm = this.checkSubmissionForm.bind(this);
    this.handleVerificationCodeChange =
      this.handleVerificationCodeChange.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.sendCode = this.sendCode.bind(this);
  }

  checkSubmissionForm() {
    setTimeout(() => {
      if (
        this.state.oneCap &&
        this.state.oneNum &&
        this.state.oneSpecial &&
        this.state.lengthEight &&
        this.state.passwordMatch === "" &&
        this.state.usernameMessage === "" &&
        this.state.username !== "" &&
        this.state.email !== "" &&
        this.state.name !== "" &&
        this.state.emailCheck &&
        this.state.verificationCode >= 100000 &&
        this.state.verificationCode <= 999999
      ) {
        this.setState({
          btnBg: 1,
        });
        this.setState({
          buttonState: false,
        });
      } else {
        this.setState({
          btnBg: 0.6,
        });
        this.setState({
          buttonState: true,
        });
      }
    }, 100);
  }

  handleVerificationCodeChange(event) {
    this.setState({
      verificationCode: event.target.value,
    });
    this.checkSubmissionForm();
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

  handleNameChange(event) {
    this.setState({
      name: event.target.value,
    });
    this.checkSubmissionForm();
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
    this.checkSubmissionForm();
  }

  handlePasswordChange(event) {
    var capitalAlphabet = new RegExp("^(?=.*[A-Z])");
    var oneNumeric = new RegExp("^(?=.*\\d)");
    var specialChar = new RegExp("^(?=.*[-+_!@#$%^&*., ?])+");

    this.setState({
      password: event.target.value,
    });

    if (event.target.value.length > 7) {
      this.setState({
        lengthEight: true,
      });
      if (this.state.lengthEightColor === "#DC2626") {
        this.setState({
          lengthEightColor: "#059669",
        });
      }
    } else {
      this.setState({
        lengthEight: false,
      });
      if (this.state.lengthEightColor === "#059669") {
        this.setState({
          lengthEightColor: "#DC2626",
        });
      }
    }

    if (capitalAlphabet.test(event.target.value)) {
      this.setState({
        oneCap: true,
      });
      if (this.state.oneCapColor === "#DC2626") {
        this.setState({
          oneCapColor: "#059669",
        });
      }
    } else {
      this.setState({
        oneCap: false,
      });
      if (this.state.oneCapColor === "#059669") {
        this.setState({
          oneCapColor: "#DC2626",
        });
      }
    }

    if (oneNumeric.test(event.target.value)) {
      this.setState({
        oneNum: true,
      });
      if (this.state.oneNumColor === "#DC2626") {
        this.setState({
          oneNumColor: "#059669",
        });
      }
    } else {
      this.setState({
        oneNum: false,
      });
      if (this.state.oneNumColor === "#059669") {
        this.setState({
          oneNumColor: "#DC2626",
        });
      }
    }

    if (specialChar.test(event.target.value)) {
      this.setState({
        oneSpecial: true,
      });
      if (this.state.oneSpecialColor === "#DC2626") {
        this.setState({
          oneSpecialColor: "#059669",
        });
      }
    } else {
      this.setState({
        oneSpecial: false,
      });
      if (this.state.oneSpecialColor === "#059669") {
        this.setState({
          oneSpecialColor: "#DC2626",
        });
      }
    }

    if (this.state.confirmPassword === event.target.value) {
      this.setState({
        passwordMatch: "",
      });
    } else {
      this.setState({
        passwordMatch: "Confirm Password and Password does not match.",
      });
    }
    this.checkSubmissionForm();
  }

  handleConfirmPasswordChange(event) {
    this.setState({
      confirmPassword: event.target.value,
    });

    if (this.state.password === event.target.value) {
      this.setState({
        passwordMatch: "",
      });
    } else {
      this.setState({
        passwordMatch: "Confirm Password and Password does not match.",
      });
    }
    this.checkSubmissionForm();
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value,
    });
    const re =
      /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(event.target.value)) {
      this.setState({
        emailCheck: true,
        emailMessage: "",
        codeButtonColor: 1,
      });
    } else {
      this.setState({
        emailCheck: false,
        emailMessage: "Enter a valid Email Id",
        codeButtonColor: 0.3,
      });
    }
    this.checkSubmissionForm();
  }

  handleUserRegistrationOnClick() {
    this.setState({
      isLoading: true,
    });
    console.log("Allowed");
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    
    let seconds = this.state.seconds - 1;
    let message = "Resend ("+seconds+ ")";
    this.setState({
      seconds: seconds,
      code: message,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      this.setState({
        code: "Send Again",
        codeButtonColor:1,
        codeButtonState: false,
      });
      clearInterval(this.timer);
      this.timer=0;
    }
  }
  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  async sendCode() {
    if (this.state.emailCheck && (this.state.code === "Send Code" || this.state.code === "Send Again")) {
      await this.setState({
        seconds: 60,
        code: "Resend (60)",
        codeButtonColor: .7,
        codeButtonState: true,
      });
      this.startTimer();
      
      this.setState({
        codeMessage: "Code has been sent to your mail ID",
      });
    } else if(this.state.seconds>0){
      return;
    }else{
      this.setState({
        code: "Mail Please",
      });
      setTimeout(() => {
        this.setState({
          code: "Send Code",
        });
      }, 4000);
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Loader message="Introducing you to Pentagon" />;
    } else {
      return (
        <div className="app-bg-color w-full sm:h-screen overflow-y-scroll h-auto sm:overflow-hidden flex flex-col justify-between items-center lg:space-y-0 space-y-10">
          <Navbar></Navbar>
          <form className="xl:w-1/3 lg:w-1/2 sm:w-3/4 max-w-7xl w-full lg:p-0 px-6 h-auto flex flex-col justify-between space-y-2 items-center">
            <div className="lg:text-3xl text-2xl sm:font-mono font-serif font-bg-color font-semibold tracking-wide lg:mb-2">
              Introduce Yourself
            </div>
            <div className="text-red-700 font-medium lg:text-lg text-sm">
              {this.loginMessage}
            </div>
            <InputField
              onChange={this.handleUsernameChange}
              value={this.state.username}
              placeholder="Username"
            ></InputField>
            <font className="text-green-600 w-full lg:text-sm text-xs text-left">
              {this.state.usernameMessage}
            </font>
            <InputField
              onChange={this.handleNameChange}
              value={this.state.name}
              placeholder="Name"
            ></InputField>
            <InputField
              onChange={this.handleEmailChange}
              value={this.state.email}
              placeholder="Email"
            ></InputField>
            <font className="text-red-600 w-full lg:text-sm text-xs text-left px-2">
              {this.state.emailMessage}
            </font>
            <div className="w-full flex flex-row h-auto">
              <div className="w-1/2 bg-white flex justify-center pr-2 items-center border-2 rounded-lg border-gray-100 mb-1 mr-1">
                <input
                  id="password"
                  type={this.state.passwordFieldType}
                  placeholder="Password"
                  className="px-4 py-2 w-full focus:shadow-xl focus:outline-none focus:border-transparent rounded-lg"
                  onChange={this.handlePasswordChange}
                  value={this.state.password}
                ></input>
                <div id="visible" className={this.state.visibleButtonClass}>
                  <VisibilityIcon
                    className="cursor-pointer"
                    id="eyeIcon"
                    onClick={this.handleVisibilityClick}
                  ></VisibilityIcon>
                </div>
                <div
                  id="notVisible"
                  className={this.state.visibleOffButtonClass}
                >
                  <VisibilityOffIcon
                    className="cursor-pointer "
                    id="eyeIcon"
                    onClick={this.handleVisibilityClick}
                  ></VisibilityOffIcon>
                </div>
              </div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-1/2 bg-white h-11 px-4 py-2 rounded-lg border-2 border-gray-100 focus:shadow-xl focus:outline-none focus:border-transparent"
                onChange={this.handleConfirmPasswordChange}
                value={this.state.confirmPassword}
              ></input>
            </div>
            <div className="text-red-600 w-full px-2 lg:text-xs text-sm text-left">
              {this.state.passwordMatch}
            </div>

            <div className="w-full sm:spcae-y-0 space-y-1">
              <div className="w-full px-2 sm:flex justify-start items-center sm:tracking-tight sm:space-x-1 space-y-1 lg:space-y-0 text-sm">
                <div className="text-green-600 sm:w-1/2 w-full flex items-center">
                  <CircularIndicator
                    color={this.state.oneSpecialColor}
                  ></CircularIndicator>
                  {"   "}
                  At least one special character
                </div>
                <div className="text-green-600 sm:w-1/2 flex items-center">
                  <CircularIndicator
                    color={this.state.oneCapColor}
                  ></CircularIndicator>
                  {"   "}
                  Minimum one capital alphabet
                </div>
              </div>
              <div className="w-full px-2 sm:flex justify-start items-center sm:tracking-tight sm:space-x-1 space-y-1 lg:space-y-0 text-sm">
                <div className="text-green-600 w-1/2 flex items-center">
                  <CircularIndicator
                    color={this.state.oneNumColor}
                  ></CircularIndicator>
                  {"   "}
                  At least one number
                </div>
                <div className="text-green-600 w-1/2 flex items-center">
                  <CircularIndicator
                    color={this.state.lengthEightColor}
                  ></CircularIndicator>
                  {"   "}
                  Minimum 8 characters
                </div>
              </div>
            </div>
            <div className="w-full flex flex-row justify-center items-center">
              <input
                type="number"
                placeholder="Verification Code"
                className=" w-9/12 bg-white px-4 py-2 rounded-lg border-2 border-gray-100 focus:shadow-xl focus:outline-none focus:border-transparent"
                onChange={this.handleVerificationCodeChange}
                value={this.state.verificationCode}
              ></input>
              <div
                onClick={this.sendCode}
                className="cursor-pointer w-3/12 items-center py-2 text-center border-2 border-gray-100 rounded-lg text-sm"
                disabled={this.state.codeButtonState}
                style={{ opacity: this.state.codeButtonColor }}
              >
                {this.state.code}
              </div>
            </div>
            <div className="w-full sm:space-y-0 space-y-1">
              {this.state.codeMessage}
            </div>
            <SubmitButton
              title="Sign Up"
              btnState={this.state.buttonState}
              btnbg={this.state.btnBg}
            ></SubmitButton>
            <div className="w-full py-2 flex justify-between items-center">
              <SecondaryButton
                Width="100%"
                path="/login"
                title="Login"
              ></SecondaryButton>
            </div>
          </form>
          <div className="h-20 w-full "></div>
        </div>
      );
    }
  }
}

export default signup;