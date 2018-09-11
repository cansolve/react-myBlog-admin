import React from 'react';


/*
  * 提示组件 (Gritter)
  ------------------------
  * @param {Number} time
  * @param {String} text
  * @param {String} position
  * @param {Function} removeChange
  * @param {Object} style
  -------------------------
*/

export default class Gritter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setTimeout: null
    }
  }
  componentDidMount() {
    var _self = this;
    this.state.setTimeout = setTimeout(function () {
      _self.props.removeChange();
    }, this.props.time || 2000);
  }
  componentWillUnmount() {
    clearTimeout(this.state.setTimeout);
  }
  render() {
    var isCenter = this.props.position === 'center'
      ? 'gritter-item-wrapper gritter-success gritter-center'
      : 'gritter-item-wrapper gritter-success ';

    let displayStyle = {
      display: 'block'
    } 
    let clearStyle = {
      clear: 'both'
    }

    return (
      <div style={this.props.style}>
        <div id="gritter-notice-wrapper">
          <div className={isCenter}>
            <div className="gritter-top"></div>
            <div className="gritter-item">
              <div className="gritter-close" style={displayStyle} onClick={this.props.removeChange}></div>
              <div className="gritter-without-image">
                <span className="gritter-title">{this.props.text}</span>
              </div>
              <div style={clearStyle}></div>
            </div>
            <div className="gritter-bottom"></div>
          </div>
        </div>
      </div>
    )
  }
}
