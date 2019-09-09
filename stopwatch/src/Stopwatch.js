import React, {Component} from 'react';

class Stopwatch extends Component {
    constructor(props) {
        super(props);
        this.state = {status: false,
                      timeElapsed: 0}
    }
    handleStopStart = () => {
        this.setState(state => {
            if (state.status) {
                clearInterval(this.timer); // stops the timer when stop button is pressed
            } else {
                const startTime = Date.now() - this.state.timeElapsed;
                console.log(startTime);
                this.timer = setInterval(() => {
                    this.setState({ timeElapsed: Date.now() - startTime }); // updater function timer that accepts the current state and returns new state with updated time. this is because state is immutable
                });
            }
            return {status: !state.status};
        })
    }

    handleLapReset = () => {
        clearInterval (this.timer);
        this.setState({ timeElapsed : 0, status: false });
    }

    // componentDidMount() {
    //     this.timerID = setInterval(
    //         () => this.tick(),
    //         1000
    //     );
    // }

    // tick() {
    //     this.setState({
    //         timeElapsed: this.timeElapsed + 1
    //     });
    // }



    render() {
        const { status, timeElapsed } = this.state;
        return (
            <div>
            <p>{timeElapsed}ms</p>
            <button onClick={this.handleStopStart}>{status ? 'Stop' : 'Start'}</button>
            <button onClick={this.handleLapReset}>Reset</button>
            </div>
        )
    }
}

export default Stopwatch;