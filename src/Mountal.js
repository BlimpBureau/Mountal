import React, { Component } from 'react';
import MountalGenerator from './generator';

var mountalGenerator = new MountalGenerator(1, 5);
var points = mountalGenerator.generatePoints([{x: 0, y: 0}, {x: 1, y: 0}], 0);

console.log(points);

var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
let offsetHeight = 50;

class Mountal extends Component {
  render() {
    let polygonPoints = points.reduce((string, point) => {
      return string + point.x*canvasWidth + "," + ((canvasHeight - offsetHeight) - point.y * (canvasHeight/2 - 1.5*offsetHeight)) + " ";
    }, `0,${canvasHeight} `) + `${canvasWidth},${canvasHeight}`;

    return (
      <div>
        <svg style={{background: "#f2a510"}} width={canvasWidth} height={canvasHeight} viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}>
          <polygon points={polygonPoints}/>
        </svg>
      </div>
    );
  }
}

export default Mountal;
