import { Component } from 'react';
import './css/welcome.css';
import WelcomePageImage from "./assets/welcomePageImage.png";
import Database from "./assets/Database.svg";
import trackProgress from "./assets/trackProgress.svg";
import Collaboration from "./assets/collaboration.svg";


class WelcomePage extends Component{

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
                  <div className="lg:w-32 w-20 lg:px-7 px-5 lg:py-1 flex justify-center items-center lg:mr-6 mr-2 border-b-2 border-white border-opacity-0 hover:border-opacity-100">
                    <button className="text-white lg:text-xl text-center text-sm w-full">
                      Features
                    </button>
                  </div>
                  <div className="lg:w-32 w-20 lg:px-7 px-5 lg:py-1 flex justify-center items-center border-b-2 border-white border-opacity-0 hover:border-opacity-100 lg:mr-8 mr-2">
                    <button className="text-white lg:text-xl text-sm w-32  ">
                      Data
                    </button>
                  </div>
                  <button className="lg:w-32 w-20 lg:px-7 px-5 lg:py-1 py-1 tracking-wide rounded-full btn-bg-color flex justify-center items-center ">
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
          <div className="max-w-6xl w-screen app-bg-color flex-col justify-center items-center mt-20">
            
            <div className="lg:text-4xl text-xl font-bg-color text-center font-black mb-14">
              Features
            </div>
            <div className="lg:flex max-w-6xl lg:justify-start lg:items-center">
              <div className="lg:w-1/3 flex flex-col justify-start items-center p-5">
                <img
                  alt="Collaboration"
                  src={Collaboration}
                  className="lg:w-1/4 w-1/6 mb-6"
                ></img>
                <font className="font-bg-color font-bold lg:text-2xl text-lg mb-2">
                  Collaborate
                </font>
                <p className="w-full font-bg-color lg:text-lg text-sm text-center">
                  Collaborate with teammates to get the work{" "}
                </p>
              </div>
              <div className="lg:w-1/3 flex flex-col justify-start items-center p-5">
                <img
                  alt="Collaboration"
                  src={Database}
                  className=" lg:w-1/4 w-1/6 mb-7"
                ></img>
                <font className="font-bg-color font-bold lg:text-2xl text-lg mb-2">
                  File Storage
                </font>
                <p className="w-full font-bg-color lg:text-lg text-sm text-center">
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
                <font className="font-bg-color font-bold lg:text-2xl text-lg text-center mb-2">
                  Track Progress
                </font>
                <p className="w-full font-bg-color lg:text-lg text-sm text-center">
                  Track your and the team’s progress status in one go.
                </p>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }

}

export default WelcomePage;