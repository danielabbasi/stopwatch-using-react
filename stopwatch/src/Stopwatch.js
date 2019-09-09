import React, {Component} from 'react';

class Stopwatch extends Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()}
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }



    render() {
        return (
            <div>
            <p>0ms</p>
            <p>It is {this.state.date.toLocaleTimeString()}</p>
            <button>Start</button>
            <button>Reset</button>
            </div>
        )
    }
}

export default Stopwatch;