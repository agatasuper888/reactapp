import React from "react";
import classNames from "classnames";


function ProgressBar({ className = "", percent = 33, big = false, color = null }) {
    let progressClassName = classNames(
        "progress",
        className,
        {
            "progress--big": big,
            "progress--color-red": color === "red"
        }
    );
    return (
        <div className={progressClassName}>
            <div className="progress__bar" style={{ width: `${percent}%` }}></div>
        </div>
    );
}
export default ProgressBar 