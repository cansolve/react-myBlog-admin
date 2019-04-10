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
          <h1>导航条</h1>

          <h3>Header 3</h3>

          <blockquote>
            <p>This is a blockquote.</p>
          </blockquote>
          <pre>
            <code>
              &lt;!-- css--&gt;
              &lt;link href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet"&gt;
              &lt;link href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet"&gt;
              &lt;link rel="stylesheet" type="text/css" href="http://ued.skyunion.net/lib/css/bootsnav.css"&gt;
              
              &lt;!-- js--&gt;
              &lt;script src="http://cdn.bootcss.com/jquery/2.1.4/jquery.min.js" type="text/javascript"&gt;&lt;/script&gt;
              &lt;script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"&gt;&lt;/script&gt;
              &lt;script src='../lib/js/bootsnav.js'&gt;&lt;/script&gt;
          </code>
          </pre>
        </div>
      </Common>
    )
  }
}

export default Dispatch(Index);