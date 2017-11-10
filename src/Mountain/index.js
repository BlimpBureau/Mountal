import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MountalGenerator from './generator';
import elementResizeDetector from "element-resize-detector";

// var canvasWidth = window.innerWidth;
// var canvasHeight = window.innerHeight;
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
    levels: PropTypes.number
  }

  static defaultProps = {
    levels: 4
  }

  constructor(props) {
    super(props);

    this.state = {
      width: this.props.width || "100%",
      height: this.props.width || "100%"
    }

    let mountalGenerator = new MountalGenerator(1, props.levels);
    this.points = mountalGenerator.generatePoints([{x: 0, y: 0}, {x: 1, y: 0}]);

    // Create a elementResizeDetector.
    this.handleResize = this.handleResize.bind(this);
    this.erd = props.erd || elementResizeDetector({strategy: "scroll"});
  }

  /**
   * React life cycle method. Called when the component did mount.
   */
  componentDidMount() {
    // Trigger rerenderings on resize events, using elementResizeDetector by mister Wnr ^^
    this.erd.listenTo({callOnAdd:true}, this.refs.mountain, this.handleResize);
  }

  /**
   * React life cycle method. Called when the component is about to unmount.
   */
  componentWillUnmount() {
    // Remove all event listeners
    this.erd.removeAllListeners(this.refs.mountain);
  }

  /**
   * Handles resize events from Element Resize Detector
   * @param {object} element The DOM element
   */
  handleResize(element) {
    this.setState({
      measured: true,
      width: element.clientWidth || element.offsetWidth || this.state.width,
      height: element.clientHeight || element.offsetHeight || this.state.height
    });
  }

  render() {
    if(!this.state.measured) {
      console.log("korv");
      return (<div ref="mountain" style={{width: this.state.width, height: this.state.height, display: "block"}}></div>);
    }

    let canvasWidth = this.state.width;
    let canvasHeight = this.state.height;
    let polygonPoints = `0,${canvasHeight} ` + mapPointsToCanvas(this.points, canvasWidth, canvasHeight) + `${canvasWidth},${canvasHeight}`;

    // console.log(canvasWidth);
    // console.log(canvasHeight);

    let midPoint = this.points[Math.floor(this.points.length/2)];
    let randomPath = [midPoint];
    let iterations = 20;
    for (var i = 0; i < iterations; i++) {
      let previousPoint = randomPath[i];
      let newPoint = {};
      newPoint.y = previousPoint.y - getRandomArbitrary(1/iterations, 2/iterations);
      newPoint.x = previousPoint.x + getRandomArbitrary(-0.025, 0.05);

      randomPath.push(newPoint);
    }

    // console.log(randomPath);

    let shadowPolygonPoints = mapPointsToCanvas(randomPath, canvasWidth, canvasHeight);
    shadowPolygonPoints += ` ${canvasWidth},${canvasHeight} ${canvasWidth},0`;

    //mint
    //#1dbcaf

    console.log(1 - this.props.style.zIndex);
    
    return (
      <div style={{position:"relative", zIndex: 0, display: "block", background: "#f1cd77", width: canvasWidth, height: canvasHeight, ...this.props.style}}>
        <svg ref="mountain" style={{width: "100%", height: "100%"}} width={canvasWidth} height={canvasHeight} viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}>
          <defs>
          <clipPath id={"mountain" + (this.props.index)}>
            <polygon points={polygonPoints}/>
          </clipPath>
          </defs>

          <polygon fill={this.props.color || "#3ae5d3"} points={polygonPoints}/>
          <polygon clipPath={"url(#mountain" + (this.props.index)+ ")"} fill={this.props.shadowColor || "#146d64"} points={shadowPolygonPoints}/>
          <polygon style={{opacity:(1 - this.props.z)}} fill={this.props.fadeOutColor || "#146d64"} points={polygonPoints}/>
        </svg>
      </div>
    );
  }
}

export default Mountal;
