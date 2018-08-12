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
        {fullname}
        <span className="smallname">
          (@<a href={profileurl} target="_blank">
            {username}
          </a>)
        </span>
      </h2>
    </div>
  );
};
export default SummaryInfo;
