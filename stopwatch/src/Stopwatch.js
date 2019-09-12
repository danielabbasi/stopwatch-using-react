import React, { useCallback, useState, useEffect } from 'react';
import './App.css';

const Stopwatch = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [lapTimes, setLapTimes] = useState([]);

    const incrementTimer = useCallback(() => {
        setTimeElapsed(time => time + 1)
    }, [setTimeElapsed] )

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(incrementTimer, 10);
            return () => clearInterval(interval);
            }
        }, [isRunning, incrementTimer])

    const changeIsRunning = () => {
        if (isRunning) {
            setIsRunning(false);
        } else {
            setIsRunning(true)
        }
    }

    const changeLapReset = useCallback(() => {
        if (isRunning) {
            setTimeElapsed(0);
            setLapTimes([]);
            setCurrentTime(0);
        } else {
            if (lapTimes.length === 0) {
                setLapTimes([...lapTimes, timeElapsed])
                setCurrentTime(timeElapsed)
            } else {
                setLapTimes([ ...lapTimes, timeElapsed - currentTime ])
                setCurrentTime(timeElapsed)
            }

        }
    }, [setTimeElapsed, timeElapsed, setLapTimes, currentTime, lapTimes, isRunning] )


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

        // const { isRunning, timeElapsed, lapTimes } = this.state;
            <>
                <p className="timer">{millisecondConversion(timeElapsed)}</p>
                <div className="container">
                    <button className={isRunning ? "resetBtn" : "lapBtn"} onClick={changeLapReset()}>{isRunning && timeElapsed > 0 ? 'Lap' : 'Reset'}</button>
                    <button className={isRunning ? "stopBtn" : "startBtn"} onClick={changeIsRunning()} >{isRunning ? 'Stop' : 'Start'}</button>
                </div>
                <table>
                    <tbody>
                        <td className="lap">Lap {lapTimes.length + 1} </td><td>{millisecondConversion(topRowTimer())}</td>
                        {lapTimes.slice(0).reverse().map((lap, index) => <tr key={index} className={findMinMax(lap)}>
                            <td className="lap">Lap {lapTimes.length - index} </td><td className="time">{millisecondConversion(lap)}</td>
                        </tr>)}
                    </tbody>
                </table>
            </>
        )
}

// class Stopwatch extends Component {
//     state = {
//         isRunning: false,
//         timeElapsed: 0,
//         currentTime: 0,
//         lapTimes: []
//     }

    // handleStopStart = () => {
    //     if (this.state.isRunning) {
    //         clearInterval(this.timer);
    //         this.setState({ isRunning: false })
    //     } else {
    //         this.timer = setInterval(() => {
    //             this.setState({ timeElapsed: this.state.timeElapsed + 1 }); // updater function timer that accepts the current state and returns new state with updated time. this is because state is immutable
    //         }, 10);
    //         this.setState({ isRunning: true })
    //     }
    // }

    // handleLapReset = () => {
    //     if (this.state.isRunning === false) {
    //         this.timer = this.setState({ timeElapsed: 0, lapTimes: [], currentTime: 0 });
    //     } else {
    //         if (this.state.lapTimes.length === 0) {
    //             this.setState((state) => {
    //                 const newLapTimes = [...state.lapTimes, state.timeElapsed]
    //                 return {...state, currentTime:state.timeElapsed, lapTimes:newLapTimes}
    //             })
    //         } else {
    //             const difference = this.state.timeElapsed - this.state.currentTime;
    //             this.setState((state) => {
    //                 const newLapTimes = [...state.lapTimes, difference]
    //                 return {...state, currentTime: state.timeElapsed, lapTimes: newLapTimes}  
    //             })
    //         }
    //     }
    // }

    // findMinMax = (laps) => {
    //     const maxLap = Math.max(...this.state.lapTimes)
    //     const minLap = Math.min(...this.state.lapTimes)
    //     if (maxLap === laps && this.state.lapTimes.length > 2) {
    //         return "maxLap"
    //     } else if (minLap === laps && this.state.lapTimes.length > 2) {
    //         return "minLap"
    //     }
    // }

    // topRowTimer = () => {
    //     if (this.state.lapTimes.length === 0) {
    //         return this.state.timeElapsed;
    //     } else {
    //         return this.state.timeElapsed - this.state.currentTime;
    //     }
    // }

    // millisecondConversion = (timeElapsed) => {
    //     var milliseconds = timeElapsed % 100;
    //     var seconds = Math.floor((timeElapsed / 100) % 60);
    //     var minutes = Math.floor((timeElapsed / (60 * 100)) % 60);
    //     const pad = (time) => time < 10 ? '0' + time : time
    //     return pad(minutes) + ":" + pad(seconds) + "." + pad(milliseconds);
    // }

    // componentWillUnmount() {
    //     clearInterval(this.timer);  // when component is to be removed from the DOM, unmounting called and clears interval to avoid memory leak 
    // }

//     render() {
//         const { isRunning, timeElapsed, lapTimes } = this.state;
//         return (
//             <>
//                 <p className="timer">{this.millisecondConversion(timeElapsed)}</p>
//                 <div className="container">
//                     <button className={isRunning ? "resetBtn" : "lapBtn"} onClick={this.handleLapReset}>{isRunning && timeElapsed > 0 ? 'Lap' : 'Reset'}</button>
//                     <button className={isRunning ? "stopBtn" : "startBtn"} onClick={this.handleStopStart} >{isRunning ? 'Stop' : 'Start'}</button>
//                 </div>
//                 <table>
//                     <tbody>
//                         <td className="lap">Lap {lapTimes.length + 1} </td><td>{this.millisecondConversion(this.topRowTimer())}</td>
//                         {lapTimes.slice(0).reverse().map((lap, index) => <tr key={index} className={this.findMinMax(lap)}>
//                             <td className="lap">Lap {lapTimes.length - index} </td><td className="time">{this.millisecondConversion(lap)}</td>
//                         </tr>)}
//                     </tbody>
//                 </table>
//             </>
//         )
//     }
// }
export default Stopwatch;