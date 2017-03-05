import React, { Component } from 'react';
import MountalGenerator from './generator';

var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
let offsetHeight = 50;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function mapPointsToCanvas(points) {
  return points.reduce((string, point) => {
      return string + point.x*canvasWidth + "," + ((canvasHeight - offsetHeight) - point.y * (canvasHeight - 1.5*offsetHeight)) + " ";
    }, "");
}

var mountalGenerator = new MountalGenerator(1, 4);
var points = mountalGenerator.generatePoints([{x: 0, y: 0}, {x: 1, y: 0}], 0);

console.log(points);

class Mountal extends Component {
  render() {
    let polygonPoints = `0,${canvasHeight} ` + mapPointsToCanvas(points) + `${canvasWidth},${canvasHeight}`;

    let midPoint = points[Math.floor(points.length/2)];
    let randomPath = [midPoint];
    let iterations = 20;
    for (var i = 0; i < iterations; i++) {
      let previousPoint = randomPath[i];
      let newPoint = {};
      newPoint.y = previousPoint.y - getRandomArbitrary(1/iterations, 2/iterations);
      newPoint.x = previousPoint.x + getRandomArbitrary(-0.025, 0.05);

      randomPath.push(newPoint);
    }

    console.log(randomPath);

    let shadowPolygonPoints = mapPointsToCanvas(randomPath);
    shadowPolygonPoints += ` ${canvasWidth},${canvasHeight} ${canvasWidth},0`;

    //mint
    //#1dbcaf
    
    return (
      <div>
        <svg style={{background: "#f1cd77"}} width={canvasWidth} height={canvasHeight} viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}>
          <defs>
          <clipPath id="mountain">
            <polygon points={polygonPoints}/>
          </clipPath>
          </defs>

          <polygon fill="#142004" points={polygonPoints}/>
          <polygon clipPath="url(#mountain)" fill="#203205" points={shadowPolygonPoints}/>
        </svg>
      </div>
    );
  }
}

export default Mountal;
