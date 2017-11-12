import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MountalGenerator from './generator';
  
let offsetHeight = 50;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function mapPointsToCanvas(points, canvasWidth, canvasHeight) {
  return points.reduce((string, point) => {
      return string + point.x*canvasWidth + "," + ((canvasHeight - offsetHeight) - point.y * (canvasHeight - 1.5*offsetHeight)) + " ";
    }, "");
}

class Mountal extends Component {
  static propTypes = {
    levels: PropTypes.number,
    aspectRatio: PropTypes.number,
    color: PropTypes.string,
    shadowColor: PropTypes.string,
    fadeOutColor: PropTypes.string
  }

  static defaultProps = {
    levels: 4,
    aspectRatio: 1,
    color: "#3ae5d3",
    shadowColor: "#146d64",
    fadeOutColor: "#146d64"
  }

  constructor(props) {
    super(props);

    let mountalGenerator = new MountalGenerator(1, props.levels);
    this.points = mountalGenerator.generatePoints([{x: 0, y: 0}, {x: 1, y: 0}]);
  }

  render() {
    let aspectRatio = this.props.aspectRatio;
    let canvasWidth = 1000;
    let canvasHeight = canvasWidth * aspectRatio;
    let polygonPoints = `0,${canvasHeight} ` + mapPointsToCanvas(this.points, canvasWidth, canvasHeight) + `${canvasWidth},${canvasHeight}`;

    console.log(aspectRatio);
    console.log(canvasWidth);
    console.log(canvasHeight);

    let midPoint = this.points[Math.floor(this.points.length/2)];
    let randomPath = [midPoint];
    let iterations = 20;
    // let numberOfRandomPoints = 0;

    for (var i = 0; i < iterations; i++) {
      let previousPoint = randomPath[i];
      let newPoint = {};
      newPoint.y = previousPoint.y - getRandomArbitrary(1/iterations, 2/iterations);
      newPoint.x = previousPoint.x + getRandomArbitrary(-0.025, 0.05);

      randomPath.push(newPoint);

      // if(Math.random() > 0.8) {
      //     let previousPoint = newPoint;
      //     let newPoint2 = {}
      //     let newPoint3 = {}
      //     newPoint2.y = previousPoint.y + 1.6*getRandomArbitrary(1/iterations, 2/iterations);
      //     newPoint2.x = previousPoint.x + getRandomArbitrary(-0.025, 0.05);
      //     newPoint3.y =     newPoint2.y - 1.6*getRandomArbitrary(1/iterations, 2/iterations) / 2;
      //     newPoint3.x =     newPoint2.x + getRandomArbitrary(-0.025, 0.05);
      //     numberOfRandomPoints += 2;

      //     randomPath.push(newPoint2);
      //     randomPath.push(newPoint3);
      // }
    }

    // console.log(randomPath);

    let shadowPolygonPoints = mapPointsToCanvas(randomPath, canvasWidth, canvasHeight);
    shadowPolygonPoints += ` ${canvasWidth},${canvasHeight} ${canvasWidth},0`;

    //mint
    //#1dbcaf
    
    return (
      <div style={{position:"relative", zIndex: 0, display: "block", width: "auto", height: "100%", ...this.props.style}}>
        <svg ref="mountain" style={{width: "auto", height: "100%"}} viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}>
          <defs>
          <clipPath id={"mountain" + (this.props.index)}>
            <polygon points={polygonPoints}/>
          </clipPath>
          </defs>

          <polygon fill={this.props.color} points={polygonPoints}/>
          <polygon clipPath={"url(#mountain" + (this.props.index)+ ")"} fill={this.props.shadowColor} points={shadowPolygonPoints}/>
          <polygon style={{opacity:(1 - this.props.z)}} fill={this.props.fadeOutColor} points={polygonPoints}/>
        </svg>
      </div>
    );
  }
}

export default Mountal;
