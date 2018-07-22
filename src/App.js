import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import "./App.css";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-4">
              <h1 className="text-center">middle</h1>
            </div>
            <div className="col-md-4" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
