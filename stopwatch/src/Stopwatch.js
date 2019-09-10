import React, { Component } from 'react';
import './App.css';


class Stopwatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            timeElapsed: 0,
            lapTimes: [],
            currentTime: 0,
            minLap: 0,
            maxLap: 0
        }
    }

    handleStopStart = () => {
            if (this.state.status) {
                clearInterval(this.timer);
                this.setState({status: false})
            } else {
                this.timer = setInterval(() => {
                    this.setState({ timeElapsed: this.state.timeElapsed+1 }); // updater function timer that accepts the current state and returns new state with updated time. this is because state is immutable
                },10);
                this.setState({status: true})

            }
    }

    handleLapReset = () => {
            if (this.state.status === false) {
                this.timer = this.setState({ timeElapsed : 0, lapTimes: []});
            } else {
               if(this.state.lapTimes.length === 0) {
                    this.currentTime = this.state.timeElapsed;
                    this.setState((state) => {
                        this.state.lapTimes.push(this.state.timeElapsed)
                    })
               } else {
                    const difference = this.state.timeElapsed - this.currentTime;
                    this.setState((state) => {
                        this.state.lapTimes.push(difference)
                    })
                    
                    this.currentTime = this.state.timeElapsed;
                    if (this.state.lapTimes.length > 2) {
                        this.setState({ maxLap: Math.max(...this.state.lapTimes) })
                        this.setState({ minLap: Math.min(...this.state.lapTimes) })
                    }
                }
            }
    }

    millisecondConversion = (timeElapsed) => {
        var milliseconds = timeElapsed % 100;
        var seconds = Math.floor((timeElapsed / 100) % 60);
        var minutes = Math.floor((timeElapsed / (60 * 100)) % 60);
        const pad = (time) => time < 10 ? '0' + time : time

        return pad(minutes) + ":" + pad(seconds) + "." + pad(milliseconds);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const { status, timeElapsed, lapTimes, maxLap, minLap } = this.state;
        return (
            <>
                <p>{this.millisecondConversion(timeElapsed)}ms</p>
                <button className={status ? "resetBtn" : "lapBtn"} onClick={this.handleLapReset}>{status && timeElapsed > 0 ? 'Lap' : 'Reset'}</button>
                <button className={status ? "stopBtn" : "startBtn"} onClick={this.handleStopStart} >{status ? 'Stop' : 'Start'}</button>
                {lapTimes.map((lap, index) => <ul>
                    <li key={index}>Lap {index + 1} {this.millisecondConversion(lap)}</li>
                </ul>)}
            </>
        )
    }
}

export default Stopwatch;