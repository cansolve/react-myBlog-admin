import React from 'react';
import _ from 'lodash';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.defaultValue || [],
      id: this.props.id || 'id',
      list: this.props.data || []
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      list: nextProps.data,
      data: nextProps.defaultValue
    });
  }
  handleCheckBox(items, event) {
    this.changeHandle(items, event, 'tree-folder-header-selected');
  }
  handleCheckBoxItems(items, event) {
    this.changeHandle(items, event, 'tree-selected');
  }
  changeHandle(items, _self, className) {
    var _this = this;
    var _data = this.state.data;

    var _className = _self.currentTarget.className;
    var _isChecked = _className.indexOf(className) == -1;

    var fn = function (val) {

      if (_isChecked) {
        _data.push(val[_this.state.id]);
      }
      else {
        _.remove(_data, (chr) => {
          return chr == val[_this.state.id]
        })
      }

    }

    //获取父级数据
    var getParentData = function (id) {
      var _value = '';

      var forEachData = function (tree) {
        _.forEach(tree, (v, n) => {
          if (v[_this.state.id] == id) {
            _value = v;
            return false;
          }
          if (v.children && v.children.length > 0) {
            forEachData(v.children);
          }

        })
      }

      forEachData(_this.state.list);

      return _value;
    }

    //判断子元素是否被选中
    var isChildren = function (chr) {
      var _ischild = false;
      _.forEach(_this.state.data, (v) => {

        var _result = _.find(chr.children, (m, n) => {
          return m[_this.state.id] == v
        });

        if (_result) {
          _ischild = true;
          return false;
        }
      });

      return _ischild;
    }

    //添加或者移除父元素
    var parentRemoveAdd = function (chr) {

      var _parantValue = getParentData(chr);

      if (isChildren(_parantValue) && _isChecked) {
        fn(_parantValue);
      }
      else if (!isChildren(_parantValue) && !_isChecked) {
        _.remove(_this.state.data, (chr) => {
          return chr == _parantValue[_this.state.id]
        });
      }

      if (!_parantValue || !_parantValue.parentId) {
        return;
      }
      parentRemoveAdd(_parantValue.parentId);
    }

    //添加或者移除子元素
    var childrenRemoveAdd = function (chr) {
      _.forEach(chr, (val, i) => {
        if (val.children && val.children.length > 0) {
          childrenRemoveAdd(val.children);
        }
        fn(val);
      })
    }

    fn(items);

    if (items.children && items.children.length > 0) {
      childrenRemoveAdd(items.children);
    }

    if (items.parentId) {
      parentRemoveAdd(items.parentId);
    }

    _data = _.uniq(_data);
    this.setState({
      data: _data
    });

    this.props.onChange(_data);
  }
  tabShowHide(event) {
    event.preventDefault();

    var _div = event.currentTarget.parentNode;

    if (event.currentTarget.className === 'icon-plus') {
      event.currentTarget.setAttribute('class', 'icon-minus');
      _div.nextSibling.style.display = 'block';
    }
    else {
      event.currentTarget.setAttribute('class', 'icon-plus');
      _div.nextSibling.style.display = 'none';
    }

    event.stopPropagation();
  }
  mapData(data) {
    return (
      <div className="tree-folder-content">
        {
          data.map((items, i) => {
            var _isChecked = _.find(this.state.data, (chr) => {
              return chr == items[this.state.id];
            })
            var headerClass = _isChecked ? 'tree-folder-header tree-folder-header-selected' : 'tree-folder-header';
            var itemsClass = _isChecked ? 'tree-item tree-selected' : 'tree-item';
            var iconClass = _isChecked ? 'icon-ok' : 'icon-remove';

            if (items.children && items.children.length > 0) {
              return (
                <div className="tree-folder" key={i}>
                  <div className={headerClass} onClick={this.handleCheckBox.bind(this, items)}>
                    <i className="icon-minus" onClick={this.tabShowHide.bind(this)}></i>
                    <i className={iconClass}></i>
                    <div className="tree-folder-name">{items.name}</div>
                  </div>
                  {this.mapData(items.children)}
                </div>
              )
            }

            return (
              <div className={itemsClass} key={i} onClick={this.handleCheckBoxItems.bind(this, items)}>
                <i className={iconClass}></i>
                <div className="tree-item-name">{items.name}</div>
              </div>
            )

          })
        }
      </div>
    )

  }
  render() {
    var style = this.props.style || {
      width: '50%',
      maxHeight: '200px',
      overflow: 'auto',
      border: '1px solid #d5d5d5',
      padding: '10px'
    };

    var data = this.state.list;

    if (data.length <= 0) {
      return <div />;
    }

    return (
      <div style={style}>
        <div className="tree tree-selectable">
          {this.mapData(data)}
        </div>
      </div>
    )
  }
}