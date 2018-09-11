import React from 'react';

/*
  * 提示组件 (tips)
  ------------------------
  * @param {String} overlay 要传入的内容
  * @param {String} direction  tips位置，目前只有左右
  * @param {String} width   弹窗大小，默认300px
  -------------------------
*/

export default class DetailTip extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      direction: this.props.direction ? this.props.direction : 'right',
      width: this.props.width ? this.props.width : '300px'
    }
  }
  componentWillMount() {

  }
  stopPropagatio(event) {
    event.stopPropagation();
  }

  render() {
    var style = {}
    var key = this.state.direction;
    if (key == 'right') {
      style.left = '100%';
      style.width = this.state.width;
    } else if (key == 'left') {
      style.left = '-' + this.state.width;
      style.width = this.state.width;
    }
    return (
      <div className="popover tips-box" style={style} onClick={this.stopPropagatio.bind(this)}>
        {this.props.overlay}
      </div>
    )
  }
}
