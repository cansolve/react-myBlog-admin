import React from 'react';
import Dispatch from '../../dispatch'
import Dialog from '../../../module/dialog';
import Fetch from '../../tools/fetch';
import Storage from '../../../tools/storage';
import { FromInput, FromSelect, FromTextArea, FromCheckBox } from '../../../module/formControl';

class ConditionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      param: {
        fields: []
      },
      fieldDocLists: []
    }
  }
  addExcelRow() {
    let editDetailInfo = this.state.fieldDocLists;
    editDetailInfo.push({
      name1: '',
      name2: '',
      name3: '',
      name4: ''
    })
    this.setState({
      fieldDocLists: editDetailInfo
    })
  }

  onDelete(items) {
    let fieldDocListsArray = [];
    let newfieldDocLists = this.state.fieldDocLists.splice(items, 1);
    fieldDocListsArray = this.state.fieldDocLists;
    this.setState({
      fieldDocLists: fieldDocListsArray
    });
  }
  changeValue(i, key, event) {
    var _state = this.state.fieldDocLists;
    _state[i][key] = event.target.value;
    this.setState(_state);

  }
  async submitAdd() {
    let param = this.state.param,
      fieldDocLists = this.state.fieldDocLists;
    param.fields = JSON.stringify(fieldDocLists);

    // 临时host:http://192.168.8.230:8068
    
    let val = await Fetch({
      // url: '/api/listProjectBaseInfo',
      // method: 'POST',
      // param: param
    });

    // if (val.msg.code == '0000') {
    //   this.props.removeDialog();
    //   this.props.addGritter({
    //     text: '编辑成功'
    //   });
    // } else {
    //   this.props.addGritter({
    //     text: val.msg.desc,
    //     position: 'center'
    //   })
    // }
  }
  render() {
    let fieldDocLists = this.state.fieldDocLists || [];
    let dialogProps = {
      successBtnText: '确定',
      successBtnChange: this.submitAdd.bind(this),
      cancelBtnChange: this.props.removeDialog.bind(this)
    };
    let messageQueueType = [
      { id: 1, value: 'kafka' },
      { id: 2, value: 'rabbitmq' }
    ]
    return (
      <Dialog {...dialogProps}>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th className="center w1">条件一</th>
              <th className="center w2">条件二</th>
              <th className="center w3">条件三</th>
              <th className="center w3">条件四</th>
              <th className="center w3">操作</th>
            </tr>
          </thead>
          <tbody>
            {
              (() => {
                if (fieldDocLists.length == 0) {
                  return (<tr><td colSpan="12" className="center">没有找到匹配的条件</td></tr>)
                }
                return fieldDocLists.map((items, i) => {
                  return (
                    <tr key={i}>
                      <td className="center" >
                        <FromSelect
                          title={''}
                          data={messageQueueType}
                          defaultValue={items.name1}
                          onChange={this.changeValue.bind(this, i, 'name1')}
                        />
                      </td>
                      <td className="center" >
                        <FromInput
                          title={''}
                          defaultValue={items.name2}
                          onChange={this.changeValue.bind(this, i, 'name2')}
                        />
                      </td>
                      <td className="center" >
                        <FromInput
                          title={''}
                          defaultValue={items.name3}
                          onChange={this.changeValue.bind(this, i, 'name3')}
                        />
                      </td>
                      <td className="center" >
                        <FromInput
                          title={''}
                          defaultValue={items.name4}
                          onChange={this.changeValue.bind(this, i, 'name4')}
                        />
                      </td>
                      <td className="center" >
                        <button className="btn btn-sm btn-danger" onClick={this.onDelete.bind(this, i)}>删除</button>
                      </td>
                    </tr>
                  )
                })
              })()
            }
          </tbody>
        </table>
        <div>
          <button className="btn btn-sm btn-primary" onClick={this.addExcelRow.bind(this)}>增加条件</button>
        </div>
      </Dialog>
    )
  }
}

export default Dispatch(ConditionList);