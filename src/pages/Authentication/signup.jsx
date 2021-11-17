import { Component } from "react";

import "../../css/signup.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Loader from "../utils/Loader";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import SubmitButton from "./components/Submit";
import SecondaryButton from "./components/SecondaryButton";
import InputField from "./components/inputField";
import PasswordValidationIdentifier from "./components/Password_Indicator";
import { PropagateLoader } from "react-spinners";
import { Alert, Snackbar } from "@mui/material";

import sha256 from "sha256";

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
      isSendLoading: false,
      snackbarOpen: false,
      errorsnackbarOpen: false,
      seconds: 0,
      oneNumColor: "#DC2626",
      oneCapColor: "#DC2626",
      oneSpecialColor: "#DC2626",
      lengthEightColor: "#DC2626",
      cursor: "not-allowed",
      btnBg: 0.6,
      buttonState: true,
      codeButtonColor: 0.3,
      visibleButtonClass: "",
      visibleOffButtonClass: "hidden",
      codeButtonState: false,
      loadingMessage:"",
    };
    this.timer = 0;
    this.handleVisibilityClick = this.handleVisibilityClick.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleUserRegistrationOnClick = this.handleUserRegistrationOnClick.bind(this);
    this.checkSubmissionForm = this.checkSubmissionForm.bind(this);
    this.handleVerificationCodeChange = this.handleVerificationCodeChange.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.sendCode = this.sendCode.bind(this);
    this.handleSnacbarOpen = this.handleSnacbarOpen.bind(this);
    this.handleSnacbarClose = this.handleSnacbarClose.bind(this);
    this.handleErrorSnacbarOpen = this.handleErrorSnacbarOpen.bind(this);
  }

  componentDidMount() {
    var authtoken = localStorage.getItem("token");
    console.log(authtoken);
    if(authtoken){
    console.log(authtoken);
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
          cursor: "pointer",
        });
      } else {
        this.setState({
          btnBg: 0.6,
          cursor: "not-allowed",
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
    // Call the API to check username availability

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

  async handleUserRegistrationOnClick() {
    this.setState({
      loadingMessage:"Introducing You to Pentagon",
      isLoading: true,
    });
    var data = {
      name: this.state.name,
      username: this.state.username,
      password: sha256(this.state.password),
      email: this.state.email,
      code: this.state.verificationCode,
    };
    try{
    await fetch(process.env.REACT_APP_API+"auth/signup",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      this.setState({
        isLoading: false,
        codeMessage: "Something went wrong. Please try again later.",
      })
      this.handleErrorSnacbarOpen();
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Successfully Signed Up") {
        this.setState({
          loadingMessage:"Hello "+this.state.name+"!",
          codeMessage: "Sucessful Signup",
        });
        this.handleSnacbarOpen();
        setTimeout(() => {
          this.props.history.push("/login");
        }, 2000);
      }else if(data.message === "Invalid Code"){
        this.setState({
          isLoading: false,
          codeMessage: "Invalid Code",
        });
        this.handleErrorSnacbarOpen();
      }else if (data.message === "User already Signed Up") {
        this.setState({
          isLoading: false,
          codeMessage: "User already Signed Up. Try login Option...",
        });
        this.handleErrorSnacbarOpen();
      } else {
        this.setState({
          isLoading: false,
          codeMessage: "Error Signing Up",
        });
        this.handleErrorSnacbarOpen();
      }
    })
  }catch(error){
    this.setState({
      isLoading: false,
      codeMessage: "Error Connecting to Server",
    })
    this.handleErrorSnacbarOpen();
   }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.

    let seconds = this.state.seconds - 1;
    let message = "Resend (" + seconds + ")";
    this.setState({
      seconds: seconds,
      code: message,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      this.setState({
        code: "Resend",
        codeButtonColor: 1,
        codeButtonState: false,
      });
      clearInterval(this.timer);
      this.timer = 0;
    }
  }
  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  async sendCode() {
    this.setState({
      isSendLoading: true,
    });
    if (
      this.state.emailCheck &&
      (this.state.code === "Send Code" || this.state.code === "Resend")
    ) {
      await this.setState({
        seconds: 60,
        code: "Resend (60)",
        codeButtonColor: 0.7,
        codeButtonState: true,
      });
      this.startTimer();

      try{
      await fetch(process.env.REACT_APP_API + "auth/sendCode", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          type: "signup",
          need: "want to sign up",
        }),
      })
        .catch((error) => {
          console.log(error);
          this.setState({
            codeMessage: "Error Sending Code try again",
            isSendLoading: false,
          });
          this.handleErrorSnacbarOpen();
          return;
        })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Error in sending code") {
            this.setState({
              isSendLoading:false,
              codeMessage: "Error Sending Code try again",
            });
            this.handleErrorSnacbarOpen();
          } else if (data.message === "Code sent successfully") {
            this.setState({
              isSendLoading:false,
              codeMessage: "Code sent successfully",
            })
            this.handleSnacbarOpen();
          } else if (data.message === "User with the email already exists") {
            this.setState({
              isSendLoading:false,
              loginMessage:
                "User with the email already exists. Try Login option ..",
            });
          }
        });
      }catch(error){
        this.setState({
          codeMessage: "Error Connecting to the Server",
          isSendLoading: false,
        });
        this.handleErrorSnacbarOpen();
      }
    } else if (this.state.seconds > 0) {
      this.setState({
        isSendLoading: false,
      })
      return;
    } else {
      this.setState({
        code: "Mail Please",
        isSendLoading: false,
        codeMessage: "Enter a valid Email ID",
      });
      this.handleErrorSnacbarOpen();
      setTimeout(() => {
        this.setState({
          code: "Send Code",
        });
      }, 2000);
    }
  }

  handleSnacbarOpen() {
    this.setState({
      snackbarOpen: true,
    });
  }

  handleErrorSnacbarOpen() {
    this.setState({
      errorSnackbarOpen: true,
    });
  }

  handleSnacbarClose(){
    this.setState({
      snackbarOpen: false,
      errorSnackbarOpen: false,
    });
  }

  render() {
    let body;
    let sendCodeLoader;
    if (this.state.isSendLoading) {
      sendCodeLoader = (
        <div className="h-10">
          <PropagateLoader color={"#EB5757"} size={13} />
        </div>
      );
    } else {
      sendCodeLoader = (
        <div className="text-red-700 font-medium lg:text-base text-sm">
          {this.state.loginMessage}
        </div>
      );
    }
    if (this.state.isLoading) {
      body = <Loader message={this.state.loadingMessage} />;
    } else {
      body = (
        <div className="xl:w-1/3 lg:w-1/2 sm:w-3/4 max-w-7xl w-full lg:p-0 px-6 h-auto flex flex-col justify-between space-y-2 items-center">
          <div className="lg:text-3xl text-2xl sm:font-mono font-serif font-bg-color font-semibold tracking-wide lg:mb-2">
            Introduce Yourself
          </div>
          {sendCodeLoader}
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
                className="px-4 py-2 w-full focus:shadow-xl border-none focus:outline-none focus:border-transparent rounded-lg"
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
              <div id="notVisible" className={this.state.visibleOffButtonClass}>
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
          <PasswordValidationIdentifier
            oneCapColor={this.state.oneCapColor}
            lengthEightColor={this.state.lengthEightColor}
            oneNumColor={this.state.oneNumColor}
            oneSpecialColor={this.state.oneSpecialColor}
          ></PasswordValidationIdentifier>
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
          <SubmitButton
            title="Sign Up"
            btnState={this.state.buttonState}
            btnbg={this.state.btnBg}
            cursor={this.state.cursor}
            onClick={this.handleUserRegistrationOnClick}
          ></SubmitButton>
          <div className="w-full py-2 flex justify-between items-center">
            <SecondaryButton
              Width="100%"
              path="/login"
              title="Login"
            ></SecondaryButton>
          </div>
        </div>
      );
    }

    return (
      <div className="app-bg-color w-full sm:h-screen overflow-y-scroll h-auto sm:overflow-hidden flex flex-col justify-between items-center lg:space-y-0 space-y-10">
        <Snackbar
          open={this.state.snackbarOpen}
          autoHideDuration={5000}
          onClose={this.handleSnacbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            style={{ border: "1px solid green" }}
            onClose={this.state.handleSnacbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {" "}
            {this.state.codeMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.errorSnackbarOpen}
          autoHideDuration={5000}
          onClose={this.handleSnacbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            style={{ border: "1px solid red"}}
            onClose={this.state.handleSnacbarClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {" "}
            {this.state.codeMessage}
          </Alert>
        </Snackbar>
        <Navbar></Navbar>
        {body}
        <div className="h-20 w-full ">
          <Footer></Footer>
        </div>
      </div>
    );
  }
}


export default signup;