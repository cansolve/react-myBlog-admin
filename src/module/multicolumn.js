import React from 'react';
import _ from 'lodash';

/*
  * 列表选择器 组件
*/

/*
  ** 组件传递属性props
  ------------------------
  ** data [String] 数据
  ** size [num,num]  width,height、支持百分比,默认[500,500]
  ** defaultValue {string}  默认已分配角色
  ** titName {string} 标题
  ** onChange(result) [Function]  回调函数
  -------------------------
*/

export default class Multicolumn extends React.Component {
  constructor(props) {
    super(props);
    let option = _.clone(this.props.option) || [],
      list = this.props.data || {
        roles: []
      },
      name =this.props.titName ? this.props.titName : list.name;
    let _data = this.props.defaultValue||[],
      _list = [];
    _.forEach(list, (items, i) => {
      var result = _.find(option, (chr) => {
        return chr == items.id;
      });
      _.remove(option, function (n) {
        return n == result;
      });
      result ? _data.push(items) : _list.push(items);
    });

    this.state = {
      data: _data,
      list: _list,
      name: name,
      option: option
    }
  }
  
  filterData(event) {
    let _list = this.state.list,
      value = event.target.value,
      result = [];
    _.forEach(_list, (items, i) => {
      if (items.name.indexOf(value) < 0) {
        items.hide = 1;
      }
      else {
        items.hide = 0;
      }
      _list[i] = items;
    });

    this.setState({
      list: _list
    });
  }
  filterData2(event) {
    let _data = this.state.data,
      value = event.target.value,
      result = [];
    _.forEach(_data, (items, i) => {
      if (items.name.indexOf(value) < 0) {
        items.hide = 1;
      }
      else {
        items.hide = 0;
      }
      _data[i] = items;
    });

    this.setState({
      data: _data
    });
  }
  addRole(items, k) {
    if (items.hasRule == 0) {
      return;
    }
    let _data = this.state.data,
      _list = this.state.list;
    _data.push(items);
    _list.splice(k, 1);
    this.setState({
      data: _data,
      list: _list
    })
  }
  removeRole(items, k) {
    if (items.hasRule == 0) {
      return;
    }

    let _data = this.state.data,
      _list = this.state.list;
    _list.push(items);
    _data.splice(k, 1);
    this.setState({
      data: _data,
      list: _list
    })
  }
  addAllrole() {
    let _data = this.state.data,
      _list = this.state.list,
      newlist = [];
    _list.filter(items => items.hasRule == '0' ? newlist.push(items) : _data.push(items));

    this.setState({
      data: _data,
      list: newlist
    })
  }
  removeAllrole() {
    let _data = this.state.data,
      _list = this.state.list;

    _.forEach(_data, (items, i) => {
      _list.push(items);
    });
    _data.splice(0, _data.length);
    
    this.setState({
      data: _data,
      list: _list
    })
  }
  render() {
    // console.log('右侧数据：' + JSON.stringify(this.state.data));
    // console.log('左侧数据：' + JSON.stringify(this.state.list));
    var size =  {
      width: this.props.size[0],
      height: this.props.size[1]
    };

    return (
      <div style={size} className="box-wrap">
        <h4 className="header smaller lighter">角色分配({this.state.name ? this.props.titName : this.state.name})</h4>
        <form className="form-horizontal" role="form">
          <div className="row" style={{ padding: '0 20px' }}>
            <div className="col-sm-5">
              <h5 className="permissions-title">
                未分配角色
              </h5>
              <div className="clearfix">
                <input type="text" className="input-sm col-sm-12" placeholder="关键字查询" onChange={this.filterData.bind(this)} />
              </div>
              <ul className="permissions-items">
                {
                  this.state.list.map((items, i) => {
                    let _class = items.hasRule == 0 ? 'disabled' : '';
                    let _style = items.hide ? { display: 'none' } : {};
                    return (
                      <li key={i} onDoubleClick={this.addRole.bind(this, items, i)} className={_class} style={_style}>
                        {items.name}
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <div className="col-sm-2 icon-wrap">
              <div className="permissions-icon">
                <i className="icon-long-arrow-right bigger-230" onClick={this.addAllrole.bind(this)}></i>
                <i className="icon-exchange bigger-230"></i>
                <i className="icon-long-arrow-left bigger-230" onClick={this.removeAllrole.bind(this)}></i>
              </div>
            </div>
            <div className="col-sm-5">
              <h5 className="permissions-title">
                已分配角色
                </h5>
                <div className="clearfix">
                  <input type="text" className="input-sm col-sm-12" placeholder="关键字查询" onChange={this.filterData2.bind(this)} />
                </div>
              <ul className="permissions-items">
                {
                  this.state.data.map((items, i) => {
                    let _class = items.disabled ? 'disabled' : '';
                    let _style = items.hide ? { display: 'none' } : {};
                    return (
                      <li key={i} onDoubleClick={this.removeRole.bind(this, items, i)} className={_class} style={_style}>
                        {items.name}
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </form>
      </div>

    )
  }
}