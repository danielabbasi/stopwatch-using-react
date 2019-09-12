import React, {Component} from 'react';
import './Stopwatch';
import './App.css';
import Stopwatch from './Stopwatch';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
        <Stopwatch></Stopwatch>
        </div>
      </div>
    );
  }
}

export default App;
