import React, { Component } from "react";

class Calendar extends Component {
  render(props) {
    let firstName = this.props.fullname.split(" ")[0];
    let url = `http://ghchart.rshah.org/${this.props.username}`;
    return (
      <div className="row">
        <div className="col-xs-12">
          {firstName}
          's activity
          <br />
          <img src={url} alt="" />
        </div>
      </div>
    );
  }
}

export default Calendar;
