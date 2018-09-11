import React from 'react';

/*
  * 弹出层提示组件 (Dialog)
  ------------------------
  * @param {Boolean} successBtnVisible
  * @param {String} successBtnText
  * @param {Function} successBtnChange
  * @param {Boolean} cancelBtnVisible   
  * @param {String} cancelBtnText 
  * @param {Function} cancelBtnChange
  * @param {Object} style
  * @param {Object} dialogStyle
  * @param {Object} options{canDrag:Boolean,  是否可拖拽
                          width:String,  弹窗宽度，默认1000px
                          left: String,  距离左边，默认25%
                          top: String，  距离顶部，默认10%}
  -------------------------
*/

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: this.props.options?this.props.options.left:'25%',
      top: this.props.options?this.props.options.top:'10%',
      width: this.props.options?this.props.options.width:'1000px',
      canDrag:this.props.options?this.props.options.canDrag:false
    }
    this.x = 0;
    this.y = 0;
    this.dragDrop = false;
  }
  componentDidUpdate() {
  }
  
  _mouseUp(event) {
    this.dragDrop = false;
  }
  _mouseDown(event) {
    if(event.button==0){
      this.dragDrop = true;
      this.x = event.pageX;
      this.y = event.pageY;
    }else{
      return;
    }
  }
  _mouseMove(event) {
    if (!this.dragDrop) {
      return;
    }
    const modal = this.refs.modal;
    var diffX = event.pageX - this.x;
    var diffY = event.pageY - this.y;

    this.x = event.pageX;
    this.y = event.pageY;
    var dropLeft = modal.offsetLeft + diffX;
    var dropTop = modal.offsetTop + diffY
    if (modal.offsetLeft + modal.offsetWidth + diffX >= document.documentElement.clientWidth || dropLeft <= 0) {
      return;
    }
    if (modal.offsetTop + modal.offsetHeight + diffY >= document.documentElement.clientHeight || dropTop <= 0) {
      return;
    }
    this.updateModalPositon(dropLeft + 'px', dropTop + 'px')
  }
  updateModalPositon(left, top) {
    this.setState({
      left: left,
      top: top
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.isOpen !== this.props.isOpen || this.state.left !== nextState.left
      || this.state.top !== nextState.top;
  }
  getStyles() {
    const styles = {
      modal: {}
    }
    if(this.props.options&&this.props.options.canDrag){
      let style = this.props.options;
      Object.assign(styles.modal, style.modal);
      styles.modal.left = this.state.left ? this.state.left : '25%';
      styles.modal.top = this.state.top ? this.state.top : '10%';
      styles.modal.width = this.state.width ? this.state.width : '1000px';
    }else{
      styles.modal.left ='25%';
      styles.modal.top = '10%';
      styles.modal.width = '1000px';
    }
    return styles;
  }
  render() {
    let successButtonHtml = '',
      cancelButtonHtml = '',
      successBtnVisible = true,
      cancelBtnVisible = true;

    if (typeof this.props.successBtnVisible !== 'undefined') {
      successBtnVisible = this.props.successBtnVisible;
    }
    if (typeof this.props.cancelBtnVisible !== 'undefined') {
      cancelBtnVisible = this.props.cancelBtnVisible;
    }

    if (successBtnVisible) {
      successButtonHtml = <button type="button" className="btn btn-sm btn-success" onClick={this.props.successBtnChange}>
        <i className="icon-ok"></i> {this.props.successBtnText || '确定'}
      </button>
    }

    if (cancelBtnVisible) {
      cancelButtonHtml = <button type="button" className="btn btn-sm btn-light" onClick={this.props.cancelBtnChange}>
        <i className="icon-remove"></i>{this.props.cancelBtnText || '取消'}
      </button>
    }

    let displayStyle = {
      display: 'block'
    }
   
    const styles = this.getStyles()
   
    return (
      <div>
        <div className="bootbox modal" tabIndex="-1" role="dialog" aria-hidden="false" style={displayStyle}>
          <div className="modal-dialog"
            style={styles.modal}
            ref="modal"
            onMouseUp={this._mouseUp.bind(this)}
            onMouseDown={this._mouseDown.bind(this)}
            onMouseMove={this._mouseMove.bind(this)}>
            <div className="modal-content">
              <div className="modal-body">
                <button type="button" className="bootbox-close-button close" onClick={this.props.cancelBtnChange}>×</button>
                <div className="bootbox-body">
                  {this.props.children}
                </div>
              </div>
              <div className="modal-footer center">
                {successButtonHtml}
                {cancelButtonHtml}
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade in"></div>
      </div>
    )
  }
}

export default Dialog;