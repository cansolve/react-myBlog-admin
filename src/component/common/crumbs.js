import React from 'react';

class Crumbs extends React.Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {
    // var _this = this;
    // (async function () {
    //   let val = await Fetch({
    //     url: '/api/listAllProject',
    //     method: 'POST',
    //     param: {
    //       currentPage: '0'
    //     }
    //   });
    //   if (val.msg.code == '0000') {
    //     _this.setState({
    //       projects: val.content.list
    //     })
    //   } else {

    //   }
    // })()
  }
  
  render() {
    return (
      <div className="breadcrumbs">
        <ul className="breadcrumb">
          <li>
            <i className="icon-home home-icon"></i>
            <a href="#">首页</a>
          </li>
          <li className="active">
            {this.props.route ? this.props.route.name : ''}
          </li>
        </ul>
      </div>
    )
  }
}

export default Crumbs;