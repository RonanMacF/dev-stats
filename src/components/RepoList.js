import React, { Component } from "react";

class RepoList extends Component {
  render() {
    var counter = 0;
    var reposotories = this.props.repos.map(repo => (
      <button
        className="list-group-item list-group-item-action"
        key={counter++}
        onClick={this.props.onClick}
        name={repo}
      >
        {repo}
      </button>
    ));

    return (
      <div className="col-xs-4">
        <div className="list-group">{reposotories}</div>
      </div>
    );
  }
}

export default RepoList;
