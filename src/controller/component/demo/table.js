import React from 'react';
import Dispatch from '../../dispatch'
import Fetch from '../../tools/fetch';
import _ from 'lodash';
import { UTCToTime, TimeToUTC } from '../../../tools/utc';
import { SortClass, Sorting } from '../../../tools/sort';

class Picture extends React.Component {
  constructor(props) {
    super(props);
  }
  removePicture() {
    this.props.onChange();
  }
  stopPropagatio(event) {
    event.stopPropagation();
  }
  render() {
    var style = {
      background: 'none',
      border: '0 none'
    }
    var propsData = this.props.data;
    console.log(propsData)
    return (
      <div>
        <div className="bootbox modal fade in" style={{ display: "block" }} onClick={this.removePicture.bind(this)}>
          <div className="modal-dialog" style={{ width: '100%', textAlign: 'center' }}>
            <div className="modal-content" style={style}>
              <div className="modal-body">
                <div className="bootbox-body">
                  {
                    (() => {
                      return (<img src={propsData} onClick={this.stopPropagatio.bind(this)} style={{ background: '#FFF' }} />)
                    })()
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade in"></div>
      </div>
    )
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props)
    this.state = {
      showPicture: false,
      data: _.clone(this.props.data || {})
    }
  }

  componentWillMount() {
  }
  sorting(val) {
    console.log(val)
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

  handleChange(items) {
    this.setState({
      showPicture: !this.props.showPicture,
      imgUrl: items.url
    })

  }


  render() {
    let { btns } = this.props;
    let classNames = '';
    let reg = /\/.*?(gif|png|jpg)/gi;
    return (
      <table className="table table-striped table-bordered table-hover dataTable">
        <thead>
          <tr>
            {
              (() => {
                if (this.props.tit.length == 0) {
                  return (<th colSpan="12" className="center">没有标题</th>)
                }
                return this.props.tit.map((items, i) => {
                  if (this.props.mapKeys.length != this.props.tit.length) {
                    this.props.operate = false;
                  }
                  if (this.props.sorting) {
                    var isSort = false;
                    this.props.sorting.map((k, j) => {
                      if (this.props.mapKeys[i] == k) {
                        isSort = true;
                      }
                    })
                    if (isSort) {
                      return (
                        <th key={i} className={SortClass(this.props.mapKeys[i], this.state.sort)} onClick={this.sorting.bind(this, this.props.mapKeys[i])}>{items}</th>
                      )
                    }
                  }
                  return (
                    <th key={i}>{items}</th>
                  )
                })
              })()
            }
            {this.props.operate == true ? <th className="center" >操作</th> : ''}
          </tr>
        </thead>
        <tbody>
          {
            (() => {
              if (this.state.data.length == 0) {
                return (<tr><td colSpan={this.props.tit.length} className="center">没有找到匹配的数据</td></tr>)
              } else if (this.props.mapKeys.length != this.props.tit.length) {
                this.props.operate = false;
                return (<tr><td colSpan={this.props.tit.length} className="center">请确认tit长度跟mapKeys长度一致</td></tr>)
              }
              return this.state.data.map((items, i) => {
                return (
                  <tr key={i}>
                    {
                      (() => {
                        return this.props.mapKeys.map((keys, i) => {
                          if (reg.test(items[keys]) == true) {
                            return (
                              <td key={i}>
                                <img style={{ width: '60px' }} src={items[keys]} />
                                {this.state.showPicture == true ? <Picture onChange={this.handleChange.bind(this, items)} data={this.state.imgUrl} /> : ''}
                              </td>
                            )
                          } else {
                            if (this.props.utcToTime) {
                              var isUtc = false;
                              this.props.utcToTime.map((k, i) => {
                                if (keys == k) {
                                  isUtc = true;
                                }
                              })
                              if (isUtc) {
                                return (
                                  <td key={i}>{UTCToTime(items[keys] / 1000)}</td>
                                )
                              }
                            }
                            return (
                              <td key={i}>{items[keys]}</td>
                            )
                          }
                        })
                      })()
                    }
                    {this.props.operate == true
                      ? <td className="center">
                        {
                          (() => {
                            if (!btns) {
                              return (
                                <td colSpan="4" className="center">没有操作按钮</td>
                              )
                            } else {
                              return btns.map((its, i) => {
                                return (
                                  <button className={'btn btn-xs btn-' + its.style} key={i} onClick={its.onClick.bind(this, items)}>{its.name}</button>
                                )
                              });
                            }
                          })()
                        }
                      </td>
                      : ''}
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