import React, { useCallback, useState, useEffect, useReducer } from 'react';
import './App.css';

const START_STOP = 'START_STOP';
const INCREMENT_TIMER = 'INCREMENT_TIMER'
const LAP_RESET = 'LAP_RESET';
let interval;

let initialState = {
    isRunning: false,
    timeElapsed: 0,
    currentTime: 0,
    lapTimes: []
}

export function reducer(state, action) {
    switch (action) {
        case START_STOP:
            return { ...state, isRunning: !state.isRunning };
        case INCREMENT_TIMER:
            return { ...state, timeElapsed: state.timeElapsed + 1 }
        case LAP_RESET:
            if (!state.isRunning) {
                return { isRunning: false, currentTime: 0, timeElapsed: 0, lapTimes: [] }
            } else {
                return { ...state, currentTime: state.timeElapsed, lapTimes: [state.timeElapsed - state.currentTime, ...state.lapTimes] }
            }
        default:
            return state
    }
}

const Stopwatch = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { isRunning, timeElapsed, currentTime, lapTimes } = state
    const startStopBtn = isRunning ? 'Stop' : 'Start';
    const lapResetBtn = isRunning || timeElapsed === 0 ? 'Lap' : 'Reset'

    useEffect(() => {
        if (state.isRunning) {
            interval = setInterval(() => dispatch(INCREMENT_TIMER), 10)
        } else {
            clearInterval(interval)
        }
        return () => {
            clearInterval(interval)
        }
    }, [state.isRunning])

    const findMinMax = (laps) => {
        const maxLap = Math.max(...lapTimes)
        const minLap = Math.min(...lapTimes)
        if (maxLap === laps && lapTimes.length > 2) {
            return "maxLap"
        } else if (minLap === laps && lapTimes.length > 2) {
            return "minLap"
        }
    }

    const topRowTimer = () => {
        if (lapTimes.length === 0) {
            return timeElapsed;
        } else {
            return timeElapsed - currentTime;
        }
    }

    const millisecondConversion = (timeElapsed) => {
        const milliseconds = timeElapsed % 100;
        const seconds = Math.floor((timeElapsed / 100) % 60);
        const minutes = Math.floor((timeElapsed / (60 * 100)) % 60);
        const pad = (time) => time < 10 ? '0' + time : time
        return pad(minutes) + ":" + pad(seconds) + "." + pad(milliseconds);
    }

    return (
        <>
            <p className="timer">{millisecondConversion(timeElapsed)}</p>
            <div className="container">
                <button className={isRunning ? "resetBtn" : "lapBtn"} onClick={() => dispatch(LAP_RESET)} >{lapResetBtn}</button>
                <button className={isRunning ? "stopBtn" : "startBtn"} onClick={() => dispatch(START_STOP)}>{startStopBtn}</button>
            </div>
            <table>
                <tbody>
                    <td className="lap">Lap {lapTimes.length + 1} </td><td>{millisecondConversion(topRowTimer())}</td>
                    {lapTimes.map((lap, index) => <tr key={index} className={findMinMax(lap)}>
                        <td className="lap">Lap {lapTimes.length - index} </td><td className="time">{millisecondConversion(lap)}</td>
                    </tr>)}
                </tbody>
            </table>
        </>
    )
}

export default Stopwatch;