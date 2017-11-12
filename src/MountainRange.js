import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Mountain from './Mountain';
import {getRandomArbitrary} from "./utils";

class MountainRange extends Component {
  static propTypes = {
    numberOfMountains: PropTypes.number.isRequired
  }

  static defaultProps = {
    numberOfMountains: 10
  }

	constructor(props) {
		super(props);

    this.state = {
      width: this.props.width || window.innerWidth,
      height: this.props.height || window.innerHeight
    }

    this.mountains = new Array(this.props.numberOfMountains);
    for(let i = 0; i < this.props.numberOfMountains; i++) {
      let width = getRandomArbitrary(30, 100);

      this.mountains[i] = {
        x: getRandomArbitrary(0, 100-width),
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
	}

  render() {
    let mountainRangeStyle = {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0
    }

    let mountains = this.mountains.map((mountain, index) => {
        let width = mountain.width;
        let height = mountain.width;

        let mountainStyle = {
          position: "absolute",
          bottom: 0,
          left: mountain.x + "%",
          // width: width + "%",
          // height: height + "%",
          backgroundColor: "transparent",
          transform: "scale(" + (mountain.depth + 1) / this.props.numberOfMountains + ")",
          transformOrigin: "bottom right",
          zIndex: mountain.depth,
          overflowY: "hidden"
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
          color: "#F0A830",
          shadowColor: "#F07818",
          fadeOutColor: "#8400ff",
          levels: 4 + parseInt(((mountain.depth  + 1)/ this.props.numberOfMountains) * 3, 10)
        }

        // console.log("levels", mountainProps.levels);

        return (
          <Mountain {...mountainProps} z={(mountain.depth + 1) / this.props.numberOfMountains}/>
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