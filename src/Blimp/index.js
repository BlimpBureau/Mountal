import React from 'react';
import './index.css';

const Blimp = (props) => {
  return (
        <div className="blimpView">
          <div className="blimp blimp--travelling">
            <svg className="blimp__svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" xmlSpace="preserve">
              <path fill={props.color} d="M99,47.6c0-15.4-19.3-27.8-43.1-27.8c-12.8,0-24.3,3.6-32.2,9.4l0.1-0.1L15.5,23H4.8l9.6,17l0.1-0.1
  c-0.9,2.1-1.5,4.3-1.6,6.6H1l3.8,3h8.1c0.2,1.8,0.6,3.6,1.3,5.3L9.9,73.8h11l6.6-5.3l-0.1-0.1c4.3,2.4,9.3,4.3,14.8,5.5v6.2h25.1
  v-5.8C85.6,71.2,99,60.4,99,47.6z" />
            </svg>
          </div>
        </div>
      );
}

export default Blimp;
