import React, {Component} from 'react';
import './Stopwatch';
import './App.css';
import Stopwatch from './Stopwatch';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Stopwatch</h1>
        <div className="container">
        <Stopwatch></Stopwatch>
        </div>
      </div>
    );
  }
}

export default App;
