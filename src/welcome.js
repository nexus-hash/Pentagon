import { Component } from 'react';
import './css/welcome.css';
import WelcomePageImage from "./assets/welcomePageImage.png";
import Database from "./assets/Database.svg";
import trackProgress from "./assets/trackProgress.svg";
import Collaboration from "./assets/collaboration.svg";
import secureData from './assets/secure.svg';


class WelcomePage extends Component{

  constructor(props){
    super(props);
    this.handleFeatureOnclick = this.handleFeatureOnclick.bind();
  }

  handleFeatureOnclick(){
  }

  render(){
    return (
      <body className="app-bg-color">
        <header className="h-auto">
          <div
            className="w-screen lg:pb-24 pb-5 bg-cover"
            style={{ backgroundImage: `url(${WelcomePageImage})` }}
          >
            <div className="w-full lg:p-0 px-4 py-2">
              <div className="lg:h-12 w-full flex items-center justify-center">
                <div className="lg:h-12 w-full max-w-7xl flex justify-end items-center pt-2">
                  <div className="nav-welcome-btn-no-bg">
                    <button
                      className="text-white lg:text-xl text-center text-sm w-full"
                      id="feature"
                      onClick={this.handleFeatureOnclick}
                    >
                      Features
                    </button>
                  </div>
                  <div className="nav-welcome-btn-no-bg">
                    <button className="text-white lg:text-xl text-sm w-32  ">
                      Data
                    </button>
                  </div>
                  <button className="nav-login-btn-w-bg">
                    <div className="text-white lg:text-lg text-xs text-center lg:w-32 w-20 ">
                      LOGIN
                    </div>
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="h-auto w-full max-w-7xl flex flex-col justify-between items-center lg:px-10 lg:py-4">
                  <div className=" lg:text-8xl font-serif text-3xl tracking-widest text-white mt-10 lg:mt-40">
                    PENTAGON
                  </div>
                  <div className="lg:text-3xl text-sm text-white lg:mt-12 mt-2 text-center max-w-6xl">
                    <p>
                      The platform to help you manage all your projects at one
                      place.
                    </p>
                  </div>
                  <div className="flex justify-center items-center lg:mt-64 mt-20 w-full">
                    <button className="lg:w-52 w-28 text-white lg:border-3 border-2 py-1 lg:py-2 lg:text-lg text-xs lg:mr-40 mr-10 border-white rounded-full ">
                      Before you Start
                    </button>
                    <button className="lg:w-52 w-28 text-white btn-bg-color lg:py-3 py-2 rounded-full lg:text-lg text-xs">
                      Start Here
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="w-full flex justify-center items-center">
          <div className="feature-grid">
            <div className="sub-pg-title">Features</div>
            <div className="lg:flex max-w-7xl lg:justify-start lg:items-center">
              <div className="lg:w-1/3 flex flex-col justify-start items-center p-5">
                <img
                  alt="Collaboration"
                  src={Collaboration}
                  className="lg:w-1/4 w-1/6 mb-6"
                ></img>
                <font className="sub-card-title">Collaborate</font>
                <p className="w-full font-bg-color lg:text-lg text-sm text-center px-8">
                  Collaborate with teammates to manage and complete projects in
                  a single environment.
                </p>
              </div>
              <div className="lg:w-1/3 flex flex-col justify-start items-center p-5">
                <img
                  alt="Collaboration"
                  src={Database}
                  className=" lg:w-1/4 w-1/6 mb-7"
                ></img>
                <font className="sub-card-title">File Storage</font>
                <p className="w-full font-bg-color lg:text-lg text-sm text-center px-8">
                  Easy to store and share files related to the project and also
                  mention files specific to a task.
                </p>
              </div>
              <div className="lg:w-1/3 flex flex-col justify-start items-center p-5">
                <img
                  alt="Collaboration"
                  src={trackProgress}
                  className="lg:w-1/4 w-1/6 mb-6"
                ></img>
                <font className="sub-card-title">Track Progress</font>
                <p className="w-full font-bg-color lg:text-lg text-sm text-center px-8">
                  Track your and the team’s progress status in one go.
                </p>
              </div>
            </div>
            <div className="getting-strd">
              <div className="sub-pg-title">Getting Started</div>
              <div className="getting-strd-grid-parent">
                <ul className="getting-strd-grid">
                  <li className="getting-strd-cont">
                    SignUp If you are a new user else Login to continue to the
                    Application.
                  </li>
                  <li className="getting-strd-cont lg:mb-10">
                    Create Projects and Manage all ToDos in one place.
                  </li>
                  <li className="getting-strd-cont">
                    Upload and share Files, Links to Documents with teammates.
                  </li>
                </ul>
                <ul className="getting-strd-grid">
                  <li className="getting-strd-cont">
                    Mention Files and links related to TODOs in the TODO section
                    itself.
                  </li>
                  <li className="getting-strd-cont">
                    Plan your project from the begining and manage it in a
                    professional way.
                  </li>
                  <li className="getting-strd-cont">
                    After you finish, you can also delete the project work
                    details if you want to.
                  </li>
                </ul>
              </div>
            </div>
            <div className="data-bg-grid">
              <div className="sub-pg-title">How safe is your data?</div>
              <div className="flex justify-start items-start lg:px-0 px-8">
                <img alt="Secure Database" src={secureData} className="lg:w-auto w-16"></img>
                <div className="lg:text-2xl text-sm pl-8">
                  <p>
                    All your project details and files are safe in our database.
                    Not even we can access it due to AES 256 Encryption, you can
                    enable it while creating a project.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <div className="w-screen app-bg-color border-2 mt-10 border-red-400"></div>
          <div className="">Contact the Developers</div>
        </footer>
      </body>
    );
  }

}

export default WelcomePage;