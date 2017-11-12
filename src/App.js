import React, { Component } from 'react';
import MountainRange from './MountainRange';
import Blimp from './Blimp';
// import Mountain from './Mountal';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Blimp color="#280945"/>
        <MountainRange erd={this.erd}/>
      </div>
    );
  }
}

export default App;
