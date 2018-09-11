import React from 'react';

/*
  * 下拉多选组件 (SelectMultiple)
  ------------------------
  * @param {Array} defaultValue
  * @param {Object} data
  * @param {Object} style
  * @param {String} id
  * @param {Boolean} disabled
  * @param {Function} onChange @return {Array}
  ------------------------
 */


class SelectMultiple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: this.props.defaultValue || [],
      result: this.props.defaultValue ? this.props.defaultValue.length : 0,
      id: this.props.id || 'id',
      isShow: 0
    }

    this.showChange = this.showChange.bind(this);
  }
  selectChange(items, event) {
    event.stopPropagation();
    var _val = this.state.val;

    if(event.target.checked){
      _val.push(items.id)
    }else{
      _val.every((n, k)=>{
        if(n === items.id){
          _val.splice(k, 1);
          return false
        }
        return true;
      });
    }

    this.setState({
      val: _val,
      result: _val.length
    });

    this.props.onChange(_val);
  }
  showSelect(event) {
    event.stopPropagation();
    if (this.state.isShow) {
      return;
    }
    this.setState({
      isShow: 1
    });
    window.addEventListener('click', this.showChange, false);
  }
  showChange() {
    this.setState({
      isShow: 0
    });
    window.removeEventListener('click', this.showChange);
  }
  clear(event) {
    event.stopPropagation();
    this.setState({
      val: [],
      result: 0
    });
    this.props.onChange([]);
  }
  changeValue(event) {
    event.stopPropagation();
  }
  render() {
    var val = this.state.result ? this.state.result + ' options' : '';

    var showEvent = () => { };
    var clearEvent = () => { };
    var inputHTML = <input className="form-control date-picker" disabled type="text" value={val} />;
    var contentHTML = '';

    if (!this.props.disabled) {
      showEvent = this.showSelect.bind(this);
      clearEvent = this.clear.bind(this);
      inputHTML = <input className="form-control date-picker" onChange={this.changeValue.bind(this)} type="text" value={val} />;
    }

    if (this.state.isShow) {
      contentHTML = <SelectContent
        data={this.props.data ? this.props.data : []}
        value={this.state.val}
        id={this.state.id}
        selectChange={this.selectChange.bind(this)}
      />;
    }

    return (
      <div className="selectmultiple-control">
        <div className="input-group" onClick={showEvent}>
          {inputHTML}
          <span className="input-group-addon" onClick={clearEvent}>
            <i className="icon-remove bigger-110"></i>
          </span>
        </div>
        {contentHTML}
      </div>

    )
  }
}

class SelectContent extends React.Component {
  constructor(props) {
    super(props);
  }
  stopPropagation(event) {
    event.stopPropagation();
  }
  isBe(val) {
    var isExist = 0;

    this.props.value.every((n) => {
      if (n == val) {
        isExist = 1;
        return false;
      }
      return true;
    });

    return isExist;
  }
  render() {
    let liHTML = this.props.data.map((items, i) => {
      return (<li key={i} className={this.isBe(items.id) ? 'active' : ''}>
        <label><input type="checkbox" onChange={this.props.selectChange.bind(this, items)} checked={this.isBe(items.id)} />{items.name}</label>
      </li>)
    });
    return (
      <div className="selectmultiple-control-select" onClick={this.stopPropagation.bind(this)}>
        <ul className="selectmultiple-control-items">
          {liHTML}
        </ul>
      </div>
    )
  }
}

export default SelectMultiple;