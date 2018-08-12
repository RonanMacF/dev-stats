import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SummaryInfo from "./components/SummaryInfo";
import axios from "axios";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      username: "",
      aviurl: "",
      profileurl: "",
      location: "",
      followersnum: "",
      followingnum: "",
      reposnum: "",
      buttonValue: "",
      displayValue: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSearchClick(e) {
    e.preventDefault();
    console.log("clicked");
    let username = this.state.buttonValue;
    const requri = `https://api.github.com/users/${username}`;
    const repouri = `https://api.github.com/users/${username}/repos`;

    console.log(requri);
    axios.get(requri).then(res => {
      if (res.message === "Not Found" || username === "") {
      } else {
        this.setState({ username: res.data.login });
        this.setState({ fullname: res.data.name });
        this.setState({ aviurl: res.data.avatar_url });
        this.setState({ profileurl: res.data.html_url });
        this.setState({ location: res.data.location });
        this.setState({ followersnum: res.data.followers });
        this.setState({ followingnum: res.data.following });
        this.setState({ reposnum: res.data.public_repos });
        this.setState({ displayValue: true });
      }
    });
  }

  render() {
    let summaryStats = "";
    if (this.state.displayValue) {
      console.log(this.state);
      summaryStats = (
        <SummaryInfo
          fullname={this.state.fullname}
          username={this.state.username}
          aviurl={this.state.aviurl}
          profileurl={this.state.profileurl}
          location={this.state.location}
          followersnum={this.state.followersnum}
          followingnum={this.state.followingnum}
          reposnum={this.state.reposnum}
        />
      );
    } else {
      summaryStats = "";
    }

    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
              <h1 className="text-center">middle</h1>
              <p>
                Enter a single Github username below to get information about
                the user.
              </p>

              <input
                type="text"
                name="buttonValue"
                id="ghusername"
                value={this.state.buttonValue}
                onChange={this.onChange}
                placeholder="Github username..."
              />

              <button
                href="#"
                id="ghsubmitbtn"
                className="btn btn-primary"
                onClick={this.onSearchClick}
              >
                Pull User Data
              </button>
              <div className="col-md-3" />
            </div>
          </div>
        </div>
        {summaryStats}
        <Footer />
      </div>
    );
  }
}

export default App;
