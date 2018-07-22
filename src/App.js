import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import axios from "axios";

import "./App.css";
import Footer from "./components/layout/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSearchClick(e) {
    e.preventDefault();

    let username = this.state.username;
    const requri = `https://api.github.com/users/${username}`;
    const repouri = `https://api.github.com/users/${username}/repos`;

    axios.get(requri).then(res => {
      if (res.message == "Not Found" || username == "") {
      }
    });
  }

  render() {
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
                name="username"
                id="ghusername"
                value={this.state.username}
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
        <Footer />
      </div>
    );
  }
}

export default App;
