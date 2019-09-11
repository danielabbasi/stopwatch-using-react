import React, { Component } from 'react';
import './App.css';
import classNames from 'classnames';


class Stopwatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            timeElapsed: 0,
            lapTimes: [],
            currentTime: 0,
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
                this.timer = this.setState({ timeElapsed : 0, lapTimes: [], currentTime: 0});
            } else {
               if(this.state.lapTimes.length === 0) {
                    this.currentTime = this.state.timeElapsed;
                    this.setState((state) => {
                        this.state.lapTimes.push(this.state.timeElapsed)
                    })
               } else {
                    const difference = this.state.timeElapsed - this.state.currentTime;
                    this.setState((state) => {
                        state.lapTimes.push(difference);
                        
                    })
                    this.setState({ currentTime: this.state.timeElapsed})
                }
            }
    }

    findMinMax = (laps) => {
            const maxLap = Math.max(...this.state.lapTimes)
            const minLap = Math.min(...this.state.lapTimes)
            if (maxLap === laps && this.state.lapTimes.length > 2) {
                return "maxLap"
            } else if (minLap === laps && this.state.lapTimes.length > 2) {
                return "minLap"           
        } else {
            return "lapList"
        }
    }

    topRowTimer = () => {
        if (this.state.lapTimes.length === 0) {
            return this.state.timeElapsed;    
        } else {
            console.log(this.state.currentTime)
            return this.state.timeElapsed - this.state.currentTime;
        }
        
        // if (this.state.lapTimes === 0) {
        //     console.log("jo")
        //     return this.state.timeElapsed;
        // }
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
        const { status, timeElapsed, lapTimes } = this.state;
        return (
            <>
                <p className="timer">{this.millisecondConversion(timeElapsed)}</p>
                <div className="container">
                <button className={status ? "resetBtn" : "lapBtn"} onClick={this.handleLapReset}>{status && timeElapsed > 0 ? 'Lap' : 'Reset'}</button>               
                <button className={status ? "stopBtn" : "startBtn"} onClick={this.handleStopStart} >{status ? 'Stop' : 'Start'}</button>
                </div>
                {this.millisecondConversion(this.topRowTimer())}
                {lapTimes.slice(0).reverse().map((lap, index) => <ul>
                    <li className={this.findMinMax(lap)} key={index}>Lap {lapTimes.length - index}   {this.millisecondConversion(lap)}</li>
                </ul>)}
            </>
        )
    }
}

export default Stopwatch;