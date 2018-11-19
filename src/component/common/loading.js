import React from 'react';

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div className="loading skin-white-5">
        <div className="loading-con">
          <div className="loading-one">
            <span></span>
          </div>
          <div className="loading-two">
            <span></span>
          </div>
          <div className="loading-three">
            <span></span>
          </div>
    
          <span className="loading-left"></span>
          <span className="loading-top"></span>
          <span className="loading-right"></span>
          <span className="loading-bottom"></span>
        </div>
      </div>
    )
  }
}

export default Loading;