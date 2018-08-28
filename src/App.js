import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SummaryInfo from "./components/SummaryInfo";
import Calendar from "./components/Calendar";
import * as d3 from "./d3.min";
import RepoList from "./components/RepoList";

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
      repos: [],
      graphInitialised: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onRepoClick = this.onRepoClick.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onRepoClick(e) {
    let repo = e.target.outerText;
    axios
      .get(
        `https://api.github.com/repos/${this.state.username}/${repo}/languages`
      )
      .then(res => {
        var data = res.data;
        var dataset = [];

        // loop through data object and append items to li
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            // ensure it is key from data, not prototype being used

            // code to display language counts as list - not used at moment
            // $("#langDetails").append("<li>" + key + ": " + data[key] + "</li>");

            // push items into dataset array
            var item = {};
            item.key = key;
            item.value = data[key];
            dataset.push(item);
          }
        }

        var margin = { top: 70, right: 20, bottom: 60, left: 100 };
        var w = 600 - margin.left - margin.right;
        var h = 500 - margin.top - margin.bottom;
        var svg = d3.select("div#chart").select("svg");

        // define the x scale
        var xScale = d3.scale
          .ordinal()
          .domain(
            dataset.map(function(d) {
              return d.key;
            })
          )
          .rangeRoundBands([margin.left, w], 0.05);

        // define the x axis
        var xAxis = d3.svg
          .axis()
          .scale(xScale)
          .orient("bottom");

        // define the y scale
        var yScale = d3.scale
          .linear()
          .domain([
            0,
            d3.max(dataset, function(d) {
              return d.value;
            })
          ])
          .range([h, margin.top]);

        // define the y axis
        var yAxis = d3.svg
          .axis()
          .scale(yScale)
          .orient("left");

        xScale
          .domain(
            dataset.map(function(d) {
              return d.key;
            })
          )
          .rangeRoundBands([margin.left, w], 0.05);

        // update the y scale
        yScale
          .domain([
            0,
            d3.max(dataset, function(d) {
              return d.value;
            })
          ])
          .range([h, margin.top]);

        // update the x axis
        xAxis.scale(xScale).orient("bottom");

        // update the y axis
        yAxis.scale(yScale).orient("left");

        console.log(Object.values(dataset), "bar");
        //Create bars and labels
        var bars = svg.selectAll("rect").data(Object.values(dataset));

        // add new bars
        bars
          .enter()
          .append("rect")
          .classed("test", true)
          .attr("x", function(d, i) {
            return xScale(d.key);
          })
          .attr("y", function(d) {
            return yScale(d.value);
          })
          .attr("width", xScale.rangeBand())
          .attr("height", function(d) {
            return h - yScale(d.value);
          })
          .attr("fill", "steelblue");

        //remove bars as necessary
        bars
          .exit()
          .transition()
          .duration(500)
          .attr("x", w)
          .remove();

        // update the bars
        bars
          .transition()
          .duration(750)
          .attr("x", function(d, i) {
            return xScale(d.key);
          })
          .attr("y", function(d) {
            return yScale(d.value);
          })
          .attr("width", xScale.rangeBand())
          .attr("height", function(d) {
            return h - yScale(d.value);
          });

        // update the x axis
        svg
          .select(".xaxis")
          .transition()
          .duration(750)
          .call(xAxis);

        // update the y axis
        svg
          .select(".yaxis")
          .transition()
          .duration(750)
          .call(yAxis);

        // update the title
        svg.select(".chartTitle").text(repo);

        // add tooltip
        bars
          .on("mouseover", function(d) {
            // add blank tooltip
            svg.append("text").attr("id", "tooltip");

            // get the x and y coords
            var xPosition =
              parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
            var yPosition = parseFloat(d3.select(this).attr("y")) + 18;

            // add the tooltip
            svg
              .select("#tooltip")
              .attr("x", xPosition)
              .attr("y", function() {
                // if value is less than 10% of max, show tooltip above bar
                var mx = d3.max(dataset, function(d) {
                  return d.value;
                });
                if (d.value < 0.1 * mx) {
                  return yPosition - 22;
                } else {
                  return yPosition;
                }
              })
              .attr("text-anchor", "middle")
              .attr("fill", function() {
                // if value is less than 10% of max, make tooltip black
                var mx = d3.max(dataset, function(d) {
                  return d.value;
                });
                if (d.value < 0.1 * mx) {
                  return "black";
                } else {
                  return "white";
                }
              })
              .attr("font-family", "sans-serif")
              .attr("font-size", "12px")
              .text(d.value);
          })
          .on("mouseout", function() {
            d3.select("#tooltip").remove();
          });
      });
  }

  initaliseGraph() {
    // setup for the d3 chart
    // basic SVG setup
    var dataset = [];
    var margin = { top: 70, right: 20, bottom: 60, left: 100 };
    var w = 600 - margin.left - margin.right;
    var h = 500 - margin.top - margin.bottom;

    d3.select("svg").remove();
    //Create SVG element
    var svg = d3
      .select("div#chart")
      .append("svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom);

    // define the x scale
    var xScale = d3.scale
      .ordinal()
      .domain(Object.keys(dataset))
      .rangeRoundBands([margin.left, w], 0.05);

    // define the x axis
    var xAxis = d3.svg
      .axis()
      .scale(xScale)
      .orient("bottom");

    // define the y scale
    var yScale = d3.scale
      .linear()
      .domain([0, d3.max(Object.values(dataset))])
      .range([h, margin.top]);

    // define the y axis
    var yAxis = d3.svg
      .axis()
      .scale(yScale)
      .orient("left");

    // draw the x axis
    svg
      .append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + h + ")")
      .call(xAxis);

    // draw the y axis
    svg
      .append("g")
      .attr("class", "yaxis")
      .attr("transform", "translate(" + margin.left + ",0)")
      .call(yAxis);

    // add the x axis label
    svg
      .append("text")
      .attr("class", "x axis label")
      .attr("text-anchor", "middle")
      .attr(
        "transform",
        "translate(" + w / 2 + "," + (h + margin.bottom / 2 + 10) + ")"
      )
      .text("Language");

    // add the y axis label
    svg
      .append("text")
      .attr("class", "y axis label")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(15," + h / 2 + ")rotate(-90)")
      .text("Number of characters");

    // add a title to the chart
    svg
      .append("text")
      .attr("class", "chartTitle")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + w / 2 + ",20)")
      .text("GitHub Repo");
  }

  onSearchClick(e) {
    e.preventDefault();
    let username = this.state.buttonValue;
    const requri = `https://api.github.com/users/${username}`;
    const repouri = `https://api.github.com/users/${username}/repos`;

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
        this.setState({ company: res.data.company });
        this.setState({ website: res.data.blog });
        this.setState({ repos: [] });
      }
    });

    axios.get(repouri).then(res => {
      res.data.map(repo => this.state.repos.push(repo.name));
      this.setState({ displayValue: true });
      this.initaliseGraph();
    });

    if (!this.state.graphInitialised) {
      this.setState({ graphInitialised: true });
    }
  }

  render() {
    let summaryStats = "";
    let calendar = "";
    let repoGraphData = "";
    let chart = "";
    if (this.state.displayValue) {
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

      chart = <div id="chart" />;
      repoGraphData = (
        <div>
          <h3>Respository Breakdown</h3>
          <RepoList repos={this.state.repos} onClick={this.onRepoClick} />
        </div>
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
          <div className="row content-row">
            <div className="col-xs-12 col-md-4 offset-md-2">
              {repoGraphData}
            </div>
            <div className="col-xs-12 col-md-4">
              <div id="chart" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
