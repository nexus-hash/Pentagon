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
            className="header-img"
            style={{ backgroundImage: `url(${WelcomePageImage})` }}
          >
            <div className="header-div">
              <div className="navbar-bg">
                <div className="navbar-fg">
                  <div className="navbar-btn-no-bg">
                    <button
                      className="navbar-btn-no-bg-text"
                      id="feature"
                      onClick={this.handleFeatureOnclick}
                    >
                      Features
                    </button>
                  </div>
                  <div className="navbar-btn-no-bg">
                    <button className="navbar-btn-no-bg-text">Data</button>
                  </div>
                  <button className="navbar-btn-w-bg">
                    <div className="navbar-btn-w-bg-text">LOGIN</div>
                  </button>
                </div>
              </div>
              <div className="wel-sec">
                <div className="wel-sec-div">
                  <div className="app-title">PENTAGON</div>
                  <div className="app-description">
                    <p>
                      The platform to help you manage all your projects at one
                      place.
                    </p>
                  </div>
                  <div className="header-util-sec">
                    <button className="bfr-you-strt-btn">
                      Before you Start
                    </button>
                    <button className="strt-here-btn">Start Here</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="details-section">
          <div className="feature-grid">
            <div className="sub-pg-title">Features</div>
            <div className="features-listing-section">
              <div className="feature-card">
                <img
                  alt="Collaboration"
                  src={Collaboration}
                  className="feature-sq-icons"
                ></img>
                <font className="sub-card-title">Collaborate</font>
                <p className="feature-description-text">
                  Collaborate with teammates to manage and complete projects in
                  a single environment.
                </p>
              </div>
              <div className="feature-card">
                <img
                  alt="Collaboration"
                  src={Database}
                  className=" feature-db-icon"
                ></img>
                <font className="sub-card-title">File Storage</font>
                <p className="feature-description-text">
                  Easy to store and share files related to the project and also
                  mention files specific to a task.
                </p>
              </div>
              <div className="feature-card">
                <img
                  alt="Collaboration"
                  src={trackProgress}
                  className="feature-sq-icons"
                ></img>
                <font className="sub-card-title">Track Progress</font>
                <p className="feature-description-text">
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
              <div className="data-sub-grid">
                <img
                  alt="Secure Database"
                  src={secureData}
                  className=""
                ></img>
                <div className="data-description-text">
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
          <div className="footer-line"></div>
          <div className="">Contact the Developers</div>
        </footer>
      </body>
    );
  }

}

export default WelcomePage;