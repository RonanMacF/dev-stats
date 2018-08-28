import React from "react";

const SummaryInfo = ({
  fullname,
  username,
  aviurl,
  profileurl,
  location,
  followersnum,
  followingnum,
  reposnum,
  company,
  website
}) => {
  return (
    <div className="summary-stats">
      <div className="row content-row">
        <h2>
          {fullname}
          <span className="smallname">
            (@
            <a href={profileurl} target="_blank">
              {username}
            </a>
            )
          </span>
        </h2>
      </div>
      <div className="row">
        <div className="col-md-4">
          <a href={profileurl} target="_blank">
            <img src={aviurl} alt={username} className="profile-pic" />
          </a>
        </div>
        <div className="col-md-8">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Location: {location}</li>
            <li className="list-group-item">Company: {company}</li>
            <li className="list-group-item">Website: {website}</li>
            <li className="list-group-item">
              Followers: {followersnum} - Following: {followingnum}
            </li>
            <li className="list-group-item">Repos: {reposnum}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default SummaryInfo;
