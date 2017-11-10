import React, { Component } from 'react';
import MountainRange from './MountainRange';
import Blimp from './Blimp';
// import Mountain from './Mountal';
import './App.css';
import elementResizeDetector from "element-resize-detector";

class App extends Component {
	constructor(props) {
		super(props);

		this.erd = elementResizeDetector({strategy: "scroll"});

	}

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
