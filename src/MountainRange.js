import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Mountain from './Mountain';
import elementResizeDetector from "element-resize-detector";

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

class MountainRange extends Component {
  static propTypes = {
    numberOfMountains: PropTypes.number.isRequired
  }

  static defaultProps = {
    numberOfMountains: 20
  }

	constructor(props) {
		super(props);

    this.state = {
      measured: false,
      width: this.props.width || window.innerWidth,
      height: this.props.height || window.innerHeight
    }

		this.erd = props.erd || elementResizeDetector({strategy: "scroll"});

    this.mountains = new Array(this.props.numberOfMountains);
    for(let i = 0; i < this.props.numberOfMountains; i++) {
      let width = getRandomArbitrary(this.state.width / 3, this.state.width / 2);

      this.mountains[i] = {
        x: getRandomArbitrary(0, this.state.width - width),
        width: width
      };
    }

    this.mountains = this.mountains.sort(function(a,b) {return (a.width > b.width) ? 1 : ((b.width > a.width) ? -1 : 0);} );
    for(let i = 0; i < this.props.numberOfMountains; i++) {

      this.mountains[i] = {
        ...this.mountains[i],
        depth: i
      };
    };

    console.log(this.mountains);

    this.handleResize = this.handleResize.bind(this);
	}

  /**
   * React life cycle method. Called when the component did mount.
   */
  componentDidMount() {
    // Trigger rerenderings on resize events, using elementResizeDetector by mister Wnr ^^
    this.erd.listenTo({callOnAdd:true}, this.refs.mountainRange, this.handleResize);
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
    // console.log("resize!");
    this.setState({
      measured: true,
      width: element.clientWidth || element.offsetWidth,
      height: element.clientHeight || element.offsetHeight
    });
  }

  render() {
    if(!this.state.measured) {
      return (<div ref="mountainRange" style={{width: this.state.width, height: this.state.height, display: "block"}}></div>);
    }

    let canvasWidth = parseInt(this.state.width, 10);
    let canvasHeight = parseInt(this.state.height, 10);

    let mountainRangeStyle = {
      width: canvasWidth,
      height: canvasHeight,
      position: "relative"
    }

    let mountains = this.mountains.map((mountain, index) => {
        let width = mountain.width;
        let height = parseInt(mountain.width, 10)

        let mountainStyle = {
          position: "absolute",
          bottom: 0,
          left: mountain.x,
          width: width + "px",
          height: height,
          backgroundColor: "transparent",
          transform: "scale(" + mountain.depth / this.props.numberOfMountains + ")",
          transformOrigin: "bottom left",
          zIndex: mountain.depth
        }

        let mountainProps = {
          erd: this.erd,
          key: index,
          index: index,
          style: mountainStyle,
          width: width,
          height: height,
          // color: "#F07818",
          // shadowColor: "#F0A830",
          // fadeOutColor: "#8a57a4",
          color: "#F07818",
          shadowColor: "#F0A830",
          fadeOutColor: "#8400ff",
          levels: 4 + parseInt(((mountain.depth  + 1)/ this.props.numberOfMountains) * 3)
        }

        // console.log("levels", mountainProps.levels);

        return (
          <Mountain {...mountainProps} z={mountain.depth / this.props.numberOfMountains}/>
        );
    });
      

    return (
      <div ref="mountainRange" className="MountainRange" style={mountainRangeStyle}>
        {mountains}
      </div>
    );
  }
}

export default MountainRange;