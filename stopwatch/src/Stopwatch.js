import React, { useCallback, useState, useEffect, useReducer } from 'react';
import './App.css';

const START_STOP = 'START_STOP';
const INCREMENT_TIMER = 'INCREMENT_TIMER'
// const LAP_RESET = 'LAP_RESET';

let initialState = {
    isRunning: false,
    timeElapsed: 0,
    currentTime: 0,
    lapTimes: []
}




function reducer(state, action) {
    switch (action) {
        case START_STOP:
            return { ...state, isRunning: !state.isRunning };
        case INCREMENT_TIMER:
            if (state.isRunning) {
                return {...state, timeElapsed: state.timeElapsed + 1}
            }
        // case 'LAP_RESET':
        //     return null;
        default:
            return state

    }
}



const Stopwatch = () => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const { isRunning, timeElapsed, currentTime, lapTimes} = state
    const startStopBtn = isRunning ? 'STOP' : 'START';
    let interval;

    useEffect(() => {
        interval = setInterval( () => dispatch(INCREMENT_TIMER), 10 )
        return () => {
            clearInterval(interval)
        }
    }, isRunning)


    // const findMinMax = (laps) => {
    //     const maxLap = Math.max(...lapTimes)
    //     const minLap = Math.min(...lapTimes)
    //     if (maxLap === laps && lapTimes.length > 2) {
    //         return "maxLap"
    //     } else if (minLap === laps && lapTimes.length > 2) {
    //         return "minLap"
    //     }
    // }

    // const topRowTimer = () => {
    //     if (lapTimes.length === 0) {
    //         return timeElapsed;
    //     } else {
    //         return timeElapsed - currentTime;
    //     }
    // }

    // const millisecondConversion = (timeElapsed) => {
    //     const milliseconds = timeElapsed % 100;
    //     const seconds = Math.floor((timeElapsed / 100) % 60);
    //     const minutes = Math.floor((timeElapsed / (60 * 100)) % 60);
    //     const pad = (time) => time < 10 ? '0' + time : time
    //     return pad(minutes) + ":" + pad(seconds) + "." + pad(milliseconds);
    // }

    return (

        // const { isRunning, timeElapsed, lapTimes } = this.state;
        <>
            {/* <p className="timer">{millisecondConversion(timeElapsed)}</p> */}
            <p>{timeElapsed}</p>
            <div className="container">
                <button onClick={() => dispatch(START_STOP)}>{startStopBtn}</button>
                {/* <button onClick={() => dispatch({ type: LAP_RESET })} >LAP_RESET</button> */}
            </div>
            {/* <table>
                    <tbody>
                        <td className="lap">Lap {lapTimes.length + 1} </td><td>{millisecondConversion(topRowTimer())}</td>
                        {lapTimes.slice(0).reverse().map((lap, index) => <tr key={index} className={findMinMax(lap)}>
                            <td className="lap">Lap {lapTimes.length - index} </td><td className="time">{millisecondConversion(lap)}</td>
                        </tr>)}
                    </tbody>
                </table> */}
        </>
    )
}

export default Stopwatch;