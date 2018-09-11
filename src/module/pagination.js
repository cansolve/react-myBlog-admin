import React from 'react';

/*
  * 分页组件 (Pagination)
  ------------------------
  * @param {Number} total 
  * @param {Number} current
  * @param {Number} limit
  * @param {Boolean} selectVisible 
  * @param {Boolean} goVisible
  * @param {Function} onSelect @return {Number}
  * @param {Function} onChange @return {Number}
  ------------------------
*/

class Prev extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let _className = '',
      _url = '',
      _onChange = (event) => { event.preventDefault() };

    if (this.props.current === 1) {
      _className = 'disabled';
    }
    else {
      _url = this.props.current - 1;
      _onChange = this.props.onChange.bind(this, this.props.current - 1);
    }

    return (
      <li className={_className}>
        <a href={_url} onClick={_onChange}>
          <i className="icon-double-angle-left"></i>
        </a>
      </li>
    )
  }
}

class Next extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let _className = '',
      _url = '',
      _onChange = (event) => { event.preventDefault() };

    if (this.props.current + 1 > this.props.max) {
      _className = 'disabled';
    }
    else {
      _url = this.props.current - 1;
      _onChange = this.props.onChange.bind(this, this.props.current + 1);
    }

    return (
      <li className={_className}>
        <a href={_url} onClick={_onChange}>
          <i className="icon-double-angle-right"></i>
        </a>
      </li>
    )
  }
}

class Li extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let _data = this.props.data,
      _className = _data.url === this.props.current ? 'active' : '';


    if (!_data.url) {
      return (
        <li className={_className}>
          <a className="default">{_data.value}</a>
        </li>
      )
    }
    return (
      <li className={_className}>
        <a href={_data.url} onClick={this.props.onChange.bind(this, _data.url)}>{_data.value}</a>
      </li>
    )
  }
}

class SelectPage extends React.Component {
  constructor(props) {
    super(props)
  }
  changePageNum(event) {
    this.props.changeLimit(event.target.value);
  }
  render() {
    return (
      <div className="btn-group pagination-select">
        显示  <select className="input-sm" value={this.props.limit} onChange={this.changePageNum.bind(this)}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select> 条数据
      </div>
    )
  }
}

class GoPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      goPage: ''
    }
  }
  handleChange(name, event) {
    var newState = {};
    if (/^[1-9][0-9]*$/gi.test(event.target.value)) {
      newState[name] = event.target.value;
    }
    if (event.target.value == '') {
      newState[name] = event.target.value;
    }
    this.setState(newState);
  }
  goPage() {
    if (!this.state.goPage || this.state.goPage === '0' || this.state.goPage > this.props.max) {
      return;
    }
    this.setState({
      goPage: ''
    });
    this.props.onChange(this.state.goPage);
  }
  render() {
    return (
      <div className="btn-group pagination-select">
        跳转到 <input type="text" className="input-small" value={this.state.goPage} onChange={this.handleChange.bind(this, 'goPage')} /> 页
        <button className="btn btn-primary btn-sm btn-right" onClick={this.goPage.bind(this)}>GO</button>
      </div>
    )
  }
}

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: this.props.total || 0,
      current: this.props.current || 1,
      limit: this.props.limit || 10,
      selectVisible: this.props.selectVisible || false,
      goVisible: this.props.goVisible || false
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      total : nextProps.total,
      selectVisible : nextProps.selectVisible,
      goVisible: nextProps.goVisible
    });
  }
  changePagination(val, event) {
    let _result = parseInt(val);

    this.setState({
      current: _result
    });

    this.props.onChange && typeof this.props.onChange === 'function'
      ? this.props.onChange(_result)
      : '';

    if (event) {
      event.preventDefault();
    }
  }
  changeLimit(val){
    let _result = parseInt(val);
    this.setState({
      limit : _result
    });
    this.props.onSelect(_result);
  }
  pageAlgorithm() {
    var arr = []
    var showTotal = 10;
    var sum = Math.ceil(this.state.total / this.state.limit);
    var current = this.state.current;

    if (sum <= 20) {
      for (var i = 1; i <= sum; i++) {
        arr.push({ url: i, value: i });
      }
    }
    else {
      var time = 0;
      arr.push({ url: current, value: current });
      var l = current;
      for (var i = 0; i < showTotal; i++) {
        l--;
        if (l < 1) {
          break;
        }
        arr.unshift({ url: l, value: l });
        time++;
        if (time >= 5) {
          break;
        }

      }

      var r = current;
      for (var i = 0; i < showTotal; i++) {
        r++;
        if (r > sum) {
          break;
        }
        arr.push({ url: r, value: r });
        time++;
        if (time >= 10) {
          break;
        }
      }

    }
    if (arr[0].value - 1 >= 2) {
      arr.unshift({ url: '', value: '......' });
      arr.unshift({ url: 1, value: 1 });
    }

    if (arr[0].value - 1 == 1) {
      arr.unshift({ url: 1, value: 1 });
    }

    if (sum - arr[arr.length - 1].value >= 2) {
      arr.push({ url: '', value: '......' });
      arr.push({ url: sum, value: sum });
    }

    if (sum - arr[arr.length - 1].value == 1) {
      arr.push({ url: sum, value: sum });
    }

    return arr
  }
  render() {
    if (this.state.total <= 0) {
      return <div />
    }

    var current = this.state.current,
      total = this.state.state,
      limit = this.state.limit,
      sum = Math.ceil(this.state.total / this.state.limit);

    //分页算法
    //----------------------
    var pagination = this.pageAlgorithm();
    return (
      <div className="col-xs-12">
        <ul className="pagination btn-group">
          <Prev
            current={current}
            onChange={this.changePagination.bind(this)}
          />

          {
            pagination.map((items, i) => {
              return <Li
                key={i}
                current={current}
                data={items}
                onChange={this.changePagination.bind(this)}
              />;
            })
          }

          <Next
            current={current}
            max={sum}
            onChange={this.changePagination.bind(this)}
          />
        </ul>

        {
          this.state.selectVisible
            ? <SelectPage limit={this.state.limit} changeLimit={this.changeLimit.bind(this)} />
            : ''
        }

        {
          this.state.goVisible
            ? <GoPage max={sum} onChange={this.changePagination.bind(this)} />
            : ''
        }

      </div>
    )
  }
}


export default Pagination;