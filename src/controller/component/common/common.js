import React from 'react';

import Gritter from '../../../module/gritter';

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
      parentClass: ''
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
  componentDidMount() { }
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
            <Left display={this.state.display} {...this.props} />
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
                    <span>&nbsp; Choose Skin</span>
                  </div>
                  <div>
                    <input type="checkbox" className="ace ace-checkbox-2" id="ace-settings-navbar"
                      checked={this.state.idActive}
                      onChange={this.changeCheckBox.bind(this)} />
                    <label className="lbl" htmlFor="ace-settings-navbar"> Right To Left (rtl)</label>
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
