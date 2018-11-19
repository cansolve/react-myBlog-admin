import React from 'react';

import Dispatch from '../../dispatch';

import Common from '../common/common';

class Index extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <Common {...this.props} >
        <div className="pages-wrap">
          <div className="page-header">
            <h1>
              常用组件库
								<small>
                <i className="ace-icon fa fa-angle-double-right"></i>
                常用组件库及代码编写规范
								</small>
            </h1>
          </div>
          <h1>popup</h1>

        </div>
      </Common>
    )
  }
}

export default Dispatch(Index);