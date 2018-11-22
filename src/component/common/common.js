import React from 'react';

import Gritter from '../../module/gritter';

import Header from './header';
import Left from './left';
import Crumbs from './crumbs';
import Cache from '../../tools/cache';

export default class Common extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '',
      isPermissions: true,
      sta: false,
      idActive: false,
      leftFixed: false,
      breadFixed: false,
      navbar: true,
      parentClass: '',
      childClass: '',
      breadFixed_class:'',
      navbarFixed_class:'navbar-fixed-top',
      bName: ''
    }
    Object.assign(this.state);
  }
  mediaChange(event) {
    event.preventDefault();
    this.setState({
      display: this.state.display ? '' : 'display'
    })
  }
  openSetting = () => {
    this.setState({
      sta: !this.state.sta
    })
  }
  changeCheckBox = () => {
    this.setState({
      idActive: !this.state.idActive,
      parentClass: this.state.idActive == false ? 'rtl' : ''
    })
  }
  navbarFixed = () => {
    this.setState({
      navbar: !this.state.navbar,
      navbarFixed_class: this.state.navbar == false ? 'navbar-fixed-top' : ''
    })
  }
  sidebarFixed = () => {
    this.setState({
      leftFixed: !this.state.leftFixed,
      childClass: this.state.leftFixed == false ? 'sidebar-fixed' : ''
    })
  }
  breadFixed = () => {
    this.setState({
      breadFixed: !this.state.breadFixed,
      breadFixed_class: this.state.breadFixed == false ? 'breadcrumbs-fixed' : ''
    })
  }
  getName(val) {
    let _this = this;
    _this.setState({
      bName: val
    })
    console.log(_this.state);
  }

  componentDidMount() {
    // console.log("%c%s","color: red; background: yellow; font-size: 18px;","email: tongxiang608@163.com");
    // console.log("%c%s","color: red; background: yellow; font-size: 18px;","github: github.com/cansolve");

  }
  componentWillReceiveProps(nextProps) {
  }
  render() {
    return (
      <div className={this.state.parentClass}>
        {/*头部组建*/}
        <Header navbarFixed={this.state.navbarFixed_class}/>

        <div className="main-container" id="main-container">
          <div className="main-container-inner">
            <a className={'menu-toggler ' + this.state.display} id="menu-toggler" href="#" onClick={this.mediaChange.bind(this)}>
              <span className="menu-text"></span>
            </a>

            {/*左侧树组建*/}
            <Left display={this.state.display} {...this.props} leftFixed={this.state.childClass} getName={this.getName.bind(this)} />

            <div className="main-content">
              {/*面包屑组建*/}
              <Crumbs bName={this.state.bName} breadFixed={this.state.breadFixed}/>

              <div className="page-content clearfix">
                {this.props.children}
              </div>
              <div className="ace-settings-container">
                <div className="btn btn-app btn-xs btn-warning ace-settings-btn open" onClick={this.openSetting}>
                  <i className="ace-icon fa fa-cog bigger-130"></i>
                </div>

                <div className="ace-settings-box open" style={{ 'display': this.state.sta == true ? 'inline-block' : 'none' }}>

                  <div>
                    <input type="checkbox" className="ace ace-checkbox-2"
                      checked={this.state.idActive}
                      onChange={this.changeCheckBox} />
                    <label className="lbl" htmlFor="ace-settings-navbar"> 侧边栏切换到右侧</label>
                  </div>
                  <div>
                    <input type="checkbox" className="ace ace-checkbox-2"
                      checked={this.state.navbar}
                      onChange={this.navbarFixed} />
                    <label className="lbl" htmlFor="ace-settings-navbar"> 固定导航</label>
                  </div>
                  <div>
                    <input type="checkbox" className="ace ace-checkbox-2"
                      checked={this.state.leftFixed}
                      onChange={this.sidebarFixed} />
                    <label className="lbl" htmlFor="ace-settings-navbar"> 固定侧边栏</label>
                  </div>
                  <div>
                    <input type="checkbox" className="ace ace-checkbox-2"
                      checked={this.state.breadFixed_class}
                      onChange={this.breadFixed} />
                    <label className="lbl" htmlFor="ace-settings-navbar"> 固定面包屑</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.props.dialog}
        {
          this.props.gritter.text
            ? <Gritter {...this.props.gritter}
              removeChange={this.props.removeGritter.bind(this)}
            />
            : ''
        }


      </div>
    )
  }
}
