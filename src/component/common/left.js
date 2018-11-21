import React from 'react';
import _ from 'lodash';

class ChildrenLi extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      name:''
    }
  }
  setBreadname(name){
    
    this.props.getBreadname(name);
  }
  render() {
    let styleCss = this.props.status ? { display: 'block' } : { display: 'none' };
    return (
      <ul className="submenu" style={styleCss}>
        {
          this.props.data.map((items, i) => {
            let reg = new RegExp('^#\/' + items.url );
            let classValue = reg.test(window.location.hash) ? 'active' : '';
            return (
              <li key={i} className={classValue} onClick={this.setBreadname.bind(this,items.name)}>
                <a href={'#/' + items.url} >
                  <i className="menu-icon fa fa-caret-right"></i>
                  {items.name}
                </a>
                <b className="arrow"></b>
              </li>
            )
          })
        }
      </ul>
    )
  }
}

class Left extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 0,
      display: '',
    }
  }
  handleToggle(event) {
    let _li = event.currentTarget.parentNode;
    if (_li.className.indexOf('open') == -1) {
      _.forEach(_li.parentNode.childNodes, (items) => {
        items.className = items.className.replace('open', '');
        _.forEach(items.childNodes, (val) => {
          if (val.tagName.toLowerCase() === 'ul') {
            val.style.display = 'none';
          }
        });
      })
      _li.className += ' open';
      _.forEach(_li.childNodes, (items) => {
        if (items.tagName.toLowerCase() === 'ul') {
          items.style.display = 'block';
        }
      });
    }
    else {
      _li.className = _li.className.replace('open', '');
      _.forEach(_li.childNodes, (items) => {
        if (items.tagName.toLowerCase() === 'ul') {
          items.style.display = 'none';
        }
      });
    }
    event.preventDefault();
  }
  componentDidMount() { }
  changeMin() {
    this.setState({
      min: this.state.min ? 0 : 1
    });
  }
  getBreadname(name){
    this.props.getName(name);//传向父组建
  }
  render() {
    let _self = this,
      minClass,
      iconClass;

    if (this.state.min) {
      minClass = 'sidebar menu-min ' + this.props.display;
      iconClass = 'icon-double-angle-right'
    }
    else {
      minClass = 'sidebar ' + this.props.display+this.props.leftFixed;
      iconClass = 'icon-double-angle-left'
    }
    let nav = this.props.nav || [];
    return (
      <div className={minClass}>
      <ul className="nav nav-list">
      {
        nav.map((items, i) => {
              let reg = new RegExp('^#\/' + items.url);
              let classValue = reg.test(window.location.hash) ? 'open active' : '';
              if (items.children && items.children.length > 0) {
                return (
                  <li key={i} className={classValue}>
                    <a href={'#/' + items.url} onClick={this.handleToggle}>
                      <i className="icon-fire"></i>
                      <span className="menu-text"> {items.name} </span>
                      <b className="arrow icon-angle-down"></b>
                    </a>
                    <ChildrenLi data={items.children} status={classValue} getBreadname={this.getBreadname.bind(this)}/>
                  </li>
                )
              }
              else {
                return (
                  <li key={i}>
                    <a href={'#/' + items.url}>
                      <i className="icon-fire"></i>
                      <span className="menu-text"> {items.name} </span>
                    </a>
                  </li>
                )
              }

            })
          }
        </ul>

        <div className="sidebar-collapse" onClick={this.changeMin.bind(this)}>
          <i className={iconClass}></i>
        </div>
      </div>
    )
  }
}

export default Left;