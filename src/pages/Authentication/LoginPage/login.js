import { Component } from "react";
import { Link } from "react-router-dom";

import '../../../css/login.css';

class login extends Component{

  render(){
    return (
      <div className="app-bg-color w-full h-screen overflow-hidden flex flex-col justify-between items-center">
        <div className="w-full lg:h-16 flex justify-center items-center">
          <div className="w-full max-w-7xl py-3 2xl:px-0 px-4 flex justify-start items-center font-serrif tracking-wider font-bg-color lg:text-4xl text-3xl">
            PENTAGON
          </div>
        </div>
        <div className="lg:w-1/3 sm:w-3/4 w-full lg:p-0 px-12 h-auto flex flex-col justify-between space-y-2 items-center">
          <div className="lg:text-3xl text-2xl font-mono font-bg-color font-semibold tracking-wide lg:mb-2">
            Provide Your Credential
          </div>
          <div className="text-red-700 font-medium lg:text-lg text-sm">
            {this.loginMessage}
          </div>
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white px-4 py-2 rounded-lg border-2 border-gray-100 focus:shadow-xl focus:outline-none focus:border-red-200 focus:border-opacity-30"
            required
          ></input>
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-white px-4 py-2 rounded-lg border-2 border-gray-100 focus:shadow-xl focus:outline-none focus:border-red-200 focus:border-opacity-30"
            required
          ></input>
          <div className="w-full px-2 flex justify-start items-center space-x-4 text-xs"></div>
          <div className="text-green-600 w-full px-2 lg:text-xs text-xs text-left">
            {this.passwordMatch}
          </div>
          <div></div>
          <button className="w-full py-2 rounded-lg text-center btn-bg-color text-white hover:shadow-lg">
            Authenticate
          </button>
          <div className="w-full py-2 flex justify-between items-center">
            <Link to='/forgotpassword' className="w-1/2 py-2 text-center border-2 border-gray-400 font-bg-color rounded-lg text-sm mr-1">
              Forgot Password?
            </Link>
            <Link to='/signup' className="w-1/2 py-2 text-center border-2 border-gray-400 font-bg-color rounded-lg text-sm">
              Sign Up?
            </Link>
          </div>
        </div>
        <div className="h-20 w-full "></div>
      </div>
    );
  }
}

export default login;