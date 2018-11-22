import React from 'react';
import img from '../../../assets/images/user.jpg'
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: 0,
      nav_fixed: this.props.navbarFixed ? 'navbar-fixed-top' : ''
    }
  }
  exit(event) { }
  changeLang(value, event) { }
  handleChange = (event) => {
    let _self = this;
    let param = this.state.isShow ? 0 : 1;
    this.setState({
      isShow: param
    });
    let fn = function () {
      _self.setState({
        isShow: 0
      });
      window.removeEventListener('click', fn);
    }
    param ? window.addEventListener('click', fn, false) : window.removeEventListener('click', fn)
    event.preventDefault();
    event.stopPropagation();
  }
  componentDidMount() { }
  componentWillUnmount() { }
  render() {
    let nav_fixed='';
    if(this.props.navbarFixed){
      nav_fixed = 'navbar navbar-default navbar-fixed-top'
    }else{
      nav_fixed = 'navbar navbar-default'
    }
    return (
      <div className={nav_fixed}>
        <div className="navbar-container">
          <div className="navbar-header pull-left">
            <a href="#" className="navbar-brand">
              <small>
                <i className="icon-leaf"></i>
                IGG UED
              </small>
            </a>
          </div>
          <div className="navbar-header pull-right">
            <ul className="nav ace-nav">
              <li className={this.state.isShow ? 'light-blue open' : 'light-blue'}>
                <a href="#" onClick={this.handleChange}>
                  <img className="nav-user-photo" src={img} alt="tongxiang's Photo" />
                  <span className="user-info">
                    <small>欢迎,</small>
                    admin
                  </span>

                  <i className="icon-caret-down"></i>
                </a>

                <ul className="user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
                  <li>
                    <a href="#" onClick={this.changeLang.bind(this, 'cn')}>
                      <i className="icon-circle"></i>
                      中文
                    </a>
                  </li>
                  <li className="divider"></li>
                  <li>
                    <a href="#" onClick={this.exit.bind(this)}>
                      <i className="icon-off"></i>
                      退出
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}


export default Header;