import React from "react";


import { v4 as uuidv4 } from 'uuid';

import Clock from "./Clock";
import ProgressBar from "./ProgressBar";
import Timebox from "./Timebox";
import TimeboxEditor from "./TimeboxEditor";
import Error from "./Error";

class CurrentTimebox extends React.Component {
    constructor(props) {
        super(props);
        console.count("constructor")
        this.state = {
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        }



        this.handleStart = this.handleStart.bind(this)
        this.handleStop = this.handleStop.bind(this)
        this.togglePause = this.togglePause.bind(this)
        this.intervalId = null;
    }
    componentWillMount() {
        console.count("componentWillMounth");
    }
    componentDidMount() {
        console.count("componentDidMounth");
    }
    componentDidUpdate() {
        console.count("componentDidUpdate");
    }
    componentWillUnmount() {
        console.count("componentWillUnmount");
        this.stopTimer();
    }
    handleStart(event) {
        this.setState({
            isRunning: true
        })
        this.startTimer();
    }
    handleStop(event) {
        this.setState({
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        })
        this.stopTimer();

    }
    startTimer() {
        if (this.intervalId === null) {
            this.intervalId = window.setInterval(
                () => {
                    console.log("timer works")
                    this.setState(
                        (prevState) => ({ elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1 })
                    )
                },
                100
            );
        }
    }

    stopTimer() {
        window.clearInterval(this.intervalId);
        this.intervalId = null;

    }
    togglePause() {
        this.setState(
            function (prevState) {
                console.count("setState")

                const isPaused = !prevState.isPaused;
                if (isPaused) {
                    this.stopTimer();
                } else {
                    this.startTimer();
                }
                return {
                    isPaused,
                    pausesCount: isPaused ? prevState.pausesCount + 1 : prevState.pausesCount
                }
            }
        )
    }
    render() {
        console.count("render")

        const { isPaused, isRunning, pausesCount, elapsedTimeInSeconds } = this.state;
        const { title, totalTimeInMinutes, isEditable, onEdit } = this.props;
        const totalTimeInSeconds = totalTimeInMinutes * 60;
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
        const minutesLeft = Math.floor(timeLeftInSeconds / 60);
        const secondsLeft = Math.floor(timeLeftInSeconds % 60);
        const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;

        return (
            <div className={`CurrentTimebox ${isEditable ? "inactive" : ""}`}>
                <h1>{title}</h1>
                <Clock minutes={minutesLeft} seconds={secondsLeft} className={isPaused ? "inactive" : ""} />
                <ProgressBar
                    percent={progressInPercent} className={isPaused ? "inactive" : ""}
                    color="red"
                    big
                />
                <button onClick={onEdit} disabled={isEditable}>Edytuj</button>
                <button onClick={this.handleStart} disabled={isRunning}>Start</button>
                <button onClick={this.handleStop} disabled={!isRunning}>Stop</button>
                <button onClick={this.togglePause} disabled={!isRunning}>{isPaused ? "Wznów" : "Pauzuj"}</button>
            Liczba przerw: {pausesCount}
            </div>
        )
    }
}
class EditableTimebox extends React.Component {
    state = {
        title: "Uczę się wyciągać stan w górę!",
        totalTimeInMinutes: 20,
        isEditable: true
    }
    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    }
    handleTotalTimeInMinutesChange = (event) => {
        this.setState({ totalTimeInMinutes: event.target.value });
    }
    handleConfirm = () => {
        this.setState({ isEditable: false });
    }
    handleEdit = () => {
        this.setState({ isEditable: true });
    }
    render() {
        const { title, totalTimeInMinutes, isEditable } = this.state;
        return (
            <>
                <React.StrictMode>
                    {isEditable ? (
                        <TimeboxEditor
                            title={title}
                            totalTimeInMinutes={totalTimeInMinutes}
                            isEditable={isEditable}
                            onConfirm={this.handleConfirm}
                            onTitleChange={this.handleTitleChange}
                            onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
                        />
                    ) : (
                            <CurrentTimebox
                                isEditable={isEditable}
                                title={title}
                                totalTimeInMinutes={totalTimeInMinutes}
                                onEdit={this.handleEdit}
                            />
                        )}
                </React.StrictMode>
            </>
        )
    }
}
class TimeboxCreator extends React.Component {
    state = {
        title: "",
        totalTimeInMinutes: ""
    }
    handleTitleChange = (event) => {
        this.setState({ title: event.target.value })
    }
    handleTotalTimeInMinutesChange = (event) => {
        this.setState({ totalTimeInMinutes: event.target.value })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onCreate({
            id: uuidv4(),
            title: this.state.title,
            totalTimeInMinutes: this.state.totalTimeInMinutes
        });
        this.setState({ title: "", totalTimeInMinutes: "" })
    }
    render() {

        return (
            <form onSubmit={this.handleSubmit} className="TimeboxCreator">
                <label>
                    Co robisz?
                <input
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                        type="text" />
                </label><br />
                <label>
                    Ile minut?
                <input
                        value={this.state.totalTimeInMinutes}
                        onChange={this.handleTotalTimeInMinutesChange}
                        type="number"
                    />
                </label><br />
                <button
                >Dodaj timebox</button>
            </form>

        )
    }
}

class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            { id: "a", title: "Uczę się list", totalTimeInMinutes: 25 },
            { id: "b", title: "Uczę się formularzy", totalTimeInMinutes: 15 },
            { id: "c", title: "Uczę się żyć", totalTimeInMinutes: 5 },
        ],
        hasError: false
    }

    addTimebox = (timebox) => {
        this.setState(prevState => {
            const timeboxes = [timebox, ...prevState.timeboxes];
            return { timeboxes };
        })
    }
    removeTimebox = (indexToRemove) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove);
            return { timeboxes };
        })
    }
    updateTimebox = (indexToUpdate, updatedTimebox) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.map((timebox, index) =>
                index === indexToUpdate ? updatedTimebox : timebox
            )
            return { timeboxes };
        })
    }
    handleCreate = (createdTimebox) => {
        this.addTimebox(createdTimebox);
    }
    render() {
        return (
            <>
                <TimeboxCreator onCreate={this.handleCreate} />
                <Error message="Coś się wykrzaczyło :(">
                    {this.state.timeboxes.map((timebox, index) => (
                        <Timebox
                            key={timebox.id}
                            title={timebox.title} totalTimeInMinutes={timebox.totalTimeInMinutes}
                            onDelete={() => this.removeTimebox(index)}
                            onEdit={() => this.updateTimebox(index, { ...timebox, title: "Updated timebox" })}
                        />
                    ))}
                </Error>
            </>
        )

    }
}

export { EditableTimebox, TimeboxList };