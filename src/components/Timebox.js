import React from "react";
function Timebox({ title, totalTimeInMinutes, onDelete, onEdit }) {
    if (totalTimeInMinutes <= 0) {
        throw new Error("Całkowity czas musi być większy niż zero")
    }
    return (
        <div className="Timebox">
            <h3>{title} - {totalTimeInMinutes} min.</h3>
            <button onClick={onDelete} >Usuń</button>
            <button onClick={onEdit} >Zmień</button>
        </div>
    )
}
export default Timebox;