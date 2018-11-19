import React from 'react';
import _ from 'lodash';
import { UTCToTime, TimeToUTC } from '../tools/utc';
import { SortClass, Sorting } from '../tools/sort';


class Table extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      showPicture: false,
      data: _.clone(this.props.dataSource || {}),
      columns:_.clone(this.props.columns || []),
      idArrayActive: false,
      idArray:[]
    }
  }

  componentWillMount() {
    if (this.props.rowSelection){
      this.state.columns.unshift('');
    }
  }
  sorting(val) {
    var result = Sorting({
      data: this.state.data,
      key: val,
      order: this.state.sort ? this.state.sort.order : ''
    });
    this.setState({
      sort: { name: result.key, order: result.order },
      data: result.data
    })
  }
  handleChange (name,value){
    var newState = {};
    newState[name] = value;
    this.setState(newState);
    this.props.rowSelection.onSelect(newState.idArray);
  }
  //单选
  changeCheckBox (value,event){
    var val = this.state.idArray;
    val[value] ? val[value] = '' : val[value] = value;
    if(_.compact(this.state.idArray).length == 10){
      this.handleChange('idArrayActive', true);
    }
    else{
      this.state.idArrayActive ? this.handleChange('idArrayActive', false) : '';
    } 
    this.handleChange('idArray', val);
  }
  
  //全选
  changeAllCheckBox (event){
    var val = this.state.idArray;
    val = [];
    if(event.target.checked){
      _.forEach(this.state.data, function(items){
        val[items.key] = items.key;
      });
    }
    this.setState({
      idArray : val,
      idArrayActive :  event.target.checked
    })
    this.handleChange('idArray', val);
  }

  render() {
    let classNames = '';
    let reg = /\/.*?(gif|png|jpg)/gi;
    
    return (
      <table className="table table-striped table-bordered table-hover dataTable">
        <thead>
          <tr>
            {
              (() => {
                if (this.props.columns.length == 0) {
                  return (<th colSpan="12" className="center">没有标题</th>)
                }
                return this.state.columns.map((items, i) => {
                  if (this.props.rowSelection&&i == 0) {
                    return (
                      <th className="center" key={i}>
                        <label>
                          <input type="checkbox" className="ace" checked={this.state.idArrayActive ? true : false} onChange={this.changeAllCheckBox.bind(this)}/>
                          <span className="lbl"></span>
                        </label>
                      </th>
                    )
                  }
                  if (items.sorter) {
                    return (
                      <th key={i} className={SortClass(items.sorter, this.state.sort)} onClick={this.sorting.bind(this, items.sorter)}>{items.title}</th>
                    )
                  }
                  return (
                    <th key={i}>{items.title}</th>
                  )
                })
              })()
            }
          </tr>
        </thead>
        <tbody>
          {
            (() => {
              if (this.state.data.length == 0) {
                return (<tr><td colSpan="12" className="center">没有找到匹配的数据</td></tr>)
              }
              return this.state.data.map((items, i) => {
                return (
                  <tr key={i}>
                    {
                      (() => {
                        return this.state.columns.map((keys, j) => {
                          if (this.props.rowSelection&&j == 0) {
                            return (
                              <td className="center" key={j}>
                                <label>
                                  <input type="checkbox" className="ace" checked={this.state.idArray[items.key] == items.key ? true : false}
													onChange={this.changeCheckBox.bind(this, items.key)}/>
                                  <span className="lbl"></span>
                                </label>
                              </td>
                            )
                          }
                          if (keys.render) {
                            return (
                              <td key={j}>{keys.render(items)}</td>
                            )
                          } else {
                            return (
                              <td key={j}>{items[keys.dataIndex]}</td>
                            )
                          }
                        })
                      })()
                    }

                  </tr>
                )
              })
            })()
          }
        </tbody>
      </table>
    )
  }
}

// export default Dispatch(Table);
export default Table;