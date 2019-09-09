import React, { Component } from 'react';

class Stopwatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            timeElapsed: 0,
            laps: [1, 2, 8]
        }
    }
    // handleStopStart = () => {
    //     this.setState(state => {
    //         if (state.status) {
    //             clearInterval(this.timer); // stops the timer when stop button is pressed
    //         } else {
    //             // const startTime = Date.now() - this.state.timeElapsed;
    //             // console.log(startTime);
    //             this.timer = setInterval(() => {
    //                 this.setState({ timeElapsed: state.timeElapsed++ }); // updater function timer that accepts the current state and returns new state with updated time. this is because state is immutable
    //             },10);
    //         }
    //         return {status: !state.status};
    //     })
    // }

    // handleLapReset = () => {
    //     this.setState( state => {
    //         if (state.status === false) {
    //             clearInterval(this.timer);
    //             this.timer = this.setState({ timeElapsed : 0});
    //         } else {


    //         }
    //     })
    // }

    millisecondConversion = (timeElapsed) => {
        var milliseconds = timeElapsed % 100;
        var seconds = Math.floor((timeElapsed / 100) % 60);
        var minutes = Math.floor((timeElapsed / (60 * 100)) % 60);
        const pad = (time) => time < 10 ? '0' + time : time

        return pad(minutes) + ":" + pad(seconds) + "." + pad(milliseconds);
    }

    // findDifference = (array) => {
    //     return array.map(function(value, index) {
    //         if (index === 0) {
    //             return value
    //         } else {
    //             return value - array[index-1];
    //         }
    //     })
    // }

    // // componentDidMount() {
    // //     this.timerID = setInterval(
    // //         () => this.tick(),
    // //         1000
    // //     );
    // // }

    // // tick() {
    // //     this.setState({
    // //         timeElapsed: this.timeElapsed + 1
    // //     });
    // // }

    // componentWillUnmount() {
    //     clearInterval(this.timer);
    // }



    render() {
        const { status, timeElapsed } = this.state;
        return (
            <>
                <p>{this.millisecondConversion(timeElapsed)}ms</p>
                <button >{status && timeElapsed > 0 ? 'Lap' : 'Reset'}</button>
                <button >{status ? 'Stop' : 'Start'}</button>
                {this.state.laps.map(lap => <ul>
                    <li>{this.millisecondConversion(lap)}</li>
                </ul>)}
            </>
        )
    }
}

export default Stopwatch;