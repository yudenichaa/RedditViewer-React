import React, { useState, useEffect } from "react";
import SelectSubreddit from "./components/SelectSubreddit";
import SubredditData from "./components/SubredditData";
import LoadingCircle from "./components/LoadingCircle";

const App = () => {
    const subreddits = ["reactjs", "frontend", "reduxjs", "nodejs", "mongodb"];

    const [selectedSubreddit, setSelectedSubreddit] = useState(subreddits[0]);
    const [postsBySubreddit, setPostsBySubreddit] = useState({});
    const [updating, setUpdating] = useState(true);

    useEffect(() => {
        if (updating) {
            (async () => {
                const data = (await (await fetch(`https://www.reddit.com/r/${selectedSubreddit}.json`)).json()).data.children;
                const onlyTitles = data.map(item => ({ title: item.data.title }));
                setUpdating(false); // set updating to false before calling setPostsBySubreddit to avoid calling useEffect twice
                setPostsBySubreddit({
                    ...postsBySubreddit,
                    [selectedSubreddit]: {
                        lastUpdated: new Date(),
                        data: onlyTitles
                    }
                });     
            })();
        }
    });

    const onUpdateClick = () => {
        setUpdating(true);
    }

    const onSelectSubreddit = (subreddit) => {
        setSelectedSubreddit(subreddit);
        if (!postsBySubreddit[subreddit]) {
            setUpdating(true);
        }
    }

    const subredditData = postsBySubreddit[selectedSubreddit]
        ? <SubredditData
            subredditData={postsBySubreddit[selectedSubreddit]}
            onUpdateClick={onUpdateClick}
            updating={updating}
        />
        : <LoadingCircle />

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2 className="text-center">Selected subreddit: {selectedSubreddit}</h2>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <SelectSubreddit
                        subreddits={subreddits}
                        current={selectedSubreddit}
                        onSelectSubreddit={onSelectSubreddit}
                    />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    {subredditData}
                </div>
            </div>
        </div>

    )
};

export default App;