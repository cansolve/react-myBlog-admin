import React from 'react';
import Dialog from '../../module/dialog';
import Dispatch from '../../dispatch';


class DialogDemo extends React.Component {
  constructor(...props) {
    super(...props)
    console.log(this.props.items)
  }
  render() {
    let props = {
      successBtnChange: () => { },
      cancelBtnChange: this.props.removeDialog.bind(this),
      options: {
          canDrag:true,    //不填默认不可拖拽
          // width:'1000px',    //默认1000px
          // left: '40%',    //默认25%
          // top: '40%'    //默认10%
      }
    };
    return (
      <Dialog {...props}>
        <h3 className="page-header">News</h3>
        <div>当前id为：{this.props.items.key}</div>
      </Dialog>
    )
  }
}

export default Dispatch(DialogDemo);