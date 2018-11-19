import React from 'react';

import Dispatch from '../../dispatch'
import Common from '../common/common';
import ReactEcharts from 'echarts-for-react';
import Fetch from '../../tools/fetch';
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: {
        title: {
          text: 'DAU统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['直接访问人数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [1,4,10,12,19,20,25]
          }
        ]
      }
    }
  }
  componentWillMount() {
    var _this = this;
    // (async function () {
    //   let val = await Fetch({
      //   url: 'http://v.juhe.cn/toutiao/index',
      //   param: {
      //     type: 'top',
      //     key: '13f36b9a02db9355893a0e8cecf7a78e'
      //   },
      //   method: 'POST'
      // });
      // if (val.reason == "成功的返回") {
      //   console.log(val)
       
      // } else {

      // }
    // })()

  }

  render() {
    return (
      <Common {...this.props}>
        <div className="page-wrap">
          <div className="alert alert-block alert-warning">
            <button type="button" className="close">
              <i className="ace-icon fa fa-times"></i>
            </button>
            <i className="ace-icon fa fa-bell orange"></i>
            通知：我们的<strong className="orange">UED管理系统<small>(v1.0)</small></strong>,
正在开发中，预计近期将上线，敬请期待！
          </div>
        </div>
        <div className="echart-wrap">
          <ReactEcharts option={this.state.option} />
        </div>
      </Common>
    )
  }
}

export default Dispatch(Index);