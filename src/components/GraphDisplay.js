import React, { Component } from "react";
import Axios from "axios";

class GraphDisplay extends Component {
  constructor(props) {
    super(props);
  }

  createGraph() {
    let url = "";
    var dataset = this.props.repos;

    var h = 600;
    var w = 500;
    //Create SVG element

    var svg = d3
      .select("div#chart")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    //     var xScale = d3
    //       .scaleOrdinal()
    //       .domain(
    //         dataset.map(function(d) {
    //           return d.key;
    //         })
    //       )
    //       .rangeRoundBands([100, w], 0.05);

    //     var yScale = d3
    //       .scaleLinear()
    //       .domain([
    //         0,
    //         d3.max(dataset, function(d) {
    //           return d.value;
    //         })
    //       ])
    //       .range([h, 70]);

    //     // define the x axis
    //     var xAxis = d3.svg
    //       .axis()
    //       .scale(xScale)
    //       .orient("bottom");

    //     // define the y axis
    //     var yAxis = d3.svg
    //       .axis()
    //       .scale(yScale)
    //       .orient("left");
  }

  render() {
    this.createGraph();
    return <div />;
  }
}

export default GraphDisplay;
