import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SummaryInfo from "./components/SummaryInfo";
import Calendar from "./components/Calendar";

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
      company: "",
      website: "",
      displayValue: false,
      repos: []
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
        this.setState({ company: res.data.company });
        this.setState({ website: res.data.blog });
      }
    });

    axios.get(repouri).then(res => {
      this.setState({ repos: res.data });
    });
  }

  render() {
    let summaryStats = "";
    let calendar = "";
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
          company={this.state.company}
          website={this.state.website}
        />
      );
      calendar = (
        <Calendar
          username={this.state.username}
          fullname={this.state.fullname}
        />
      );
    }

    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h1 className="text-center">GitHub User Analysis</h1>
              <p>
                This Project displays data on a searched GitHub user. When a
                user is searched it will display basic information below such as
                name, location, country, website and repos. Each repository is
                further analysed below using D3 showing which languages is repo
                is composed of.
              </p>

              <p>
                Technologies used: JavaScript (React), Axios, JSON, HTML, CSS,
                GitHub API and D3.js.
              </p>
              <p>
                To begin enter a single Github username below to get information
                about the given user.
              </p>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="buttonValue"
                  id="ghusername"
                  value={this.state.buttonValue}
                  onChange={this.onChange}
                  placeholder="Github username..."
                />
                <div className="input-group-append">
                  <button
                    href="#"
                    id="ghsubmitbtn"
                    className="btn btn-primary btn-search"
                    onClick={this.onSearchClick}
                  >
                    Pull User Data
                  </button>
                </div>
              </div>
              {summaryStats}
              {calendar}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
