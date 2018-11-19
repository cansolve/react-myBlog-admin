import React from 'react';

import Gritter from '../../module/gritter';

import Header from './header';
import Left from './left';
import Crumbs from './crumbs';
// import Loading from './loading';

export default class Common extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '',
      isPermissions: true,
      sta: false,
      idActive: false,
      leftFixed:false,
      parentClass: '',
      childClass:''
    }
  }
  mediaChange(event) {
    event.preventDefault();
    this.setState({
      display: this.state.display ? '' : 'display'
    })
  }
  openSetting() {
    this.setState({
      sta: !this.state.sta
    })
  }
  changeCheckBox() {
    this.setState({
      idActive: !this.state.idActive,
      parentClass: this.state.idActive == false ? 'rtl' : ''
    })
  }
  navbarFixed(){

  }
  sidebarFixed(){
    this.setState({
      leftFixed: !this.state.leftFixed,
      childClass: this.state.leftFixed == false ? 'sidebar-fixed' : ''
    })
  }
  breadFixed(){

  }
  componentDidMount() {
    // console.log("%c%s","color: red; background: yellow; font-size: 18px;","email: tongxiang608@163.com");
    // console.log("%c%s","color: red; background: yellow; font-size: 18px;","github: github.com/cansolve");
  }
  componentWillReceiveProps(nextProps) { }
  render() {
    return (
      <div className={this.state.parentClass}>
        <Header />
        <div className="main-container" id="main-container">
          <div className="main-container-inner">
            <a className={'menu-toggler ' + this.state.display} id="menu-toggler" href="#" onClick={this.mediaChange.bind(this)}>
              <span className="menu-text"></span>
            </a>
            <Left display={this.state.display} {...this.props} leftFixed={this.state.childClass}/>
            <div className="main-content">
              <Crumbs {...this.props} />
              <div className="page-content clearfix">
                {this.props.children}
              </div>
              <div className="ace-settings-container">
                <div className="btn btn-app btn-xs btn-warning ace-settings-btn open" onClick={this.openSetting.bind(this)}>
                  <i className="ace-icon fa fa-cog bigger-130"></i>
                </div>

                <div className="ace-settings-box open" style={{ 'display': this.state.sta == true ? 'inline-block' : 'none' }}>
                  
                  <div>
                    <input type="checkbox" className="ace ace-checkbox-2"
                      checked={this.state.idActive}
                      onChange={this.changeCheckBox.bind(this)} />
                    <label className="lbl" htmlFor="ace-settings-navbar"> 侧边栏切换到右侧</label>
                  </div>
                  <div>
                    <input type="checkbox" className="ace ace-checkbox-2"
                      checked={this.state.idActive}
                      onChange={this.navbarFixed.bind(this)} />
                    <label className="lbl" htmlFor="ace-settings-navbar"> 固定导航</label>
                  </div>
                  <div>
                    <input type="checkbox" className="ace ace-checkbox-2"
                      checked={this.state.leftFixed}
                      onChange={this.sidebarFixed.bind(this)} />
                    <label className="lbl" htmlFor="ace-settings-navbar"> 固定侧边栏</label>
                  </div>
                  <div>
                    <input type="checkbox" className="ace ace-checkbox-2"
                      checked={this.state.idActive}
                      onChange={this.breadFixed.bind(this)} />
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
