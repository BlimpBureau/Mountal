import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MountalGenerator from './generator';
import {getRandomArbitrary, mapPointsToCanvas} from "../utils";
  
const offsetHeight = 0;

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

  getShadowPolygonPoints(canvasWidth, canvasHeight) {
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
    }

    let shadowPolygonPoints = mapPointsToCanvas(randomPath, canvasWidth, canvasHeight, offsetHeight);
    shadowPolygonPoints += ` ${canvasWidth},${canvasHeight} ${canvasWidth},0`;
    return shadowPolygonPoints;
  }

  render() {
    let aspectRatio = this.props.aspectRatio;
    let canvasWidth = 1000;
    let canvasHeight = canvasWidth * aspectRatio;
    let polygonPoints = `0,${canvasHeight} ` + mapPointsToCanvas(this.points, canvasWidth, canvasHeight, offsetHeight) + `${canvasWidth},${canvasHeight}`;

    // console.log(aspectRatio);
    // console.log(canvasWidth);
    // console.log(canvasHeight);

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
          {this.props.shadowColor && <polygon clipPath={"url(#mountain" + (this.props.index)+ ")"} fill={this.props.shadowColor} points={this.getShadowPolygonPoints(canvasWidth, canvasHeight)}/>}
          {this.props.fadeOutColor && <polygon style={{opacity:(1 - this.props.z)}} fill={this.props.fadeOutColor} points={polygonPoints}/>}
        </svg>
      </div>
    );
  }
}

export default Mountal;
