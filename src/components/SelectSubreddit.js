import React from "react";

const SelectSubreddit = ({ subreddits, current, onSelectSubreddit }) => (
    <select
        value={current}
        onChange={(e) => onSelectSubreddit(e.target.value)}
        className="custom-select">
        {subreddits.map((subreddit, index) => <option key={index} value={subreddit}>{subreddit}</option>)}
    </select>
);

export default SelectSubreddit;