import React from "react";

const SummaryInfo = ({
  fullname,
  username,
  aviurl,
  profileurl,
  location,
  followersnum,
  followingnum,
  reposnum
}) => {
  return (
    <div>
      <h2>
        {this.state.fullname}{" "}
        <span className="smallname">
          (@<a href={this.state.profileurl} target="_blank">
            {this.state.username}
          </a>)
        </span>
      </h2>
    </div>
  );
};
export default SummaryInfo;
