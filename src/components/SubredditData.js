import React from "react";
import LoadingCircle from "./LoadingCircle";

const SubredditData = ({ subredditData, onUpdateClick, updating }) => {
    const updateButton = updating
        ? <LoadingCircle />
        : <button className="btn btn-sm btn-primary" onClick={onUpdateClick}>Update</button>

    return (
        <>
            <div className="row" style={{ height: "2.5rem" }}>
                <div className="col-auto d-flex align-items-center">
                    <p className="m-0">Last updated at {subredditData.lastUpdated.toLocaleString("ru")}</p>
                </div>
                <div className="col d-flex align-items-center p-0">
                    {updateButton}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <ul>
                        {subredditData.data.map((item, index) => <li key={index}>{item.title}</li>)}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SubredditData;