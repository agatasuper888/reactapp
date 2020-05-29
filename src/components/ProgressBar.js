import React from "react";

function ProgressBar({ className = "", percent = 33, big = false, color = null }) {
    let progressClassName = "progress " + className;
    if (big) {
        progressClassName += " progress--big"
    }
    if (color === "red") {
        progressClassName += " progress--color-red"
    }
    return (
        <div className={progressClassName}>
            <div className="progress__bar" style={{ width: `${percent}%` }}></div>
        </div>
    );
}
export default ProgressBar 