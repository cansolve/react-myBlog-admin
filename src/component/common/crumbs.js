import React from 'react';

class Crumbs extends React.Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    // console.log(this.props)
    let breadClass='';
    if(this.props.breadFixed){
      breadClass = 'breadcrumbs breadcrumbs-fixed'
    }else{
      breadClass = 'breadcrumbs'
    }
    return (
      <div className={breadClass}>
        <ul className="breadcrumb">
          <li>
            <i className="icon-home home-icon"></i>
            <a href="#">首页</a>
          </li>
          <li className="active">
            {this.props.bName ? this.props.bName : ''}
          </li>
        </ul>
      </div>
    )
  }
}

export default Crumbs;