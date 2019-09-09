import React, {Component} from 'react';

class Stopwatch extends Component {
    render() {
        return (
            <div>
            <p>0ms</p>
            <button>Start</button>
            <button>Reset</button>
            </div>
        )
    }
}

export default Stopwatch;