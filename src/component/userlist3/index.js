import React from 'react';

import Dispatch from '../../dispatch';

import Common from '../common/common';


import SelectSearch from '../../module/selectSearch';
import { UTCToTime, TimeToUTC } from '../../tools/utc';
import DatePicker from '../../module/datePicker';
import Upload from '../../module/upload';
import Pagination from '../../module/pagination';
import SelectMultiple from '../../module/selectMultiple';
import TreeView from '../../module/treeview';
import Validation from '../../module/validation';
import Multicolumn from '../../module/multicolumn';

// import Table from './table';
import Table from '../../module/table';
import ConditionList from './conditionList';
import DialogDemo from './dialog';
import DetailTip from '../../module/detailTip';



class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '正式成立\n大好时机',
      detailShow: false,
      parentWidth: '',
      dataSource: [{
        key: '1',
        name: 'John Brown',
        age: 1,
        fromTime: '1518141751001',
        endTime: '1518141752001',
        address: 'New York No. 1 Lake Park',
        url: 'https://hayyaimagedebug.onemt.co/post/20180209/480x640_682b7319-0671-4f4d-b6ed-78b0532a2613.jpg'
      }, {
        key: '2',
        name: 'Jim Green',
        age: 2,
        fromTime: '1518141754001',
        endTime: '1518141753001',
        address: 'London No. 2 Lake Park',
        url: 'https://hayyaimagedebug.onemt.co/post/20180209/480x640_4fb623bf-b841-43d4-a0db-818905adf100.jpg'
      }, {
        key: '3',
        name: 'Joe Black',
        age: 3,
        fromTime: '1518141755001',
        endTime: '1518141756001',
        address: 'Sidney No. 3 Lake Park',
        url: 'https://hayyaimagedebug.onemt.co/post/20180209/1280x1708_8a62a5a6-1b23-409e-9974-819b2e2ffd94.jpg'
      }, {
        key: '4',
        name: 'Joe Black',
        age: 4,
        fromTime: '1518141757001',
        endTime: '1518141758001',
        address: 'Sidney No. 4 Lake Park',
        url: 'https://hayyaimagedebug.onemt.co/post/20180209/1280x1708_8a62a5a6-1b23-409e-9974-819b2e2ffd94.jpg'
      }],
      count: 4,
    }

  }
  showDialog(key) {
    let DialogDemoModule = Dispatch(DialogDemo);
    this.props.addDialog(<DialogDemoModule items={key} />);
  }
  showGritter(key, dataIndex) {
    console.log(key)
    this.props.addGritter({
      text: '提示层demo',
      position: 'center'
    })
  }
  showlog() {
    this.props.addDialog(
      <ConditionList />
    );
  }

  showHovertips(event) {

    //查看详情
    event.stopPropagation();
    var _self = this;
    function fn() {
      _self.setState({
        detailShow: false
      });
      window.removeEventListener('click', fn);
    }
    _self.setState({
      detailShow: !this.state.detailShow,
      parentWidth: event.target.offsetWidth
    });
    window.addEventListener('click', fn, false);
  }
  componentWillMount() {
    const str = this.state.value;
    str.replace(/\r\n/g, '<br>');
    this.setState({
      value: str
    })
  }
  handleAdd() {
    const { count, dataSource } = this.state;

    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: `${count}`,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }

  onDelete(key) {
    console.log(key)
  }
  onSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys });
  }
  render() {
    const meun = <div> 123333</div>
    var list = [
      {
        "id": "1.4",
        "name": "1.4",
        "children": [
          {
            "id": "1.4.1",
            "parentId": "1.4",
            "name": "1.4.1"
          }
        ]
      },
      {
        "id": "1.5",
        "name": "1.5",
        "children": [
          {
            "id": "1.5.0",
            "parentId": "1.5",
            "name": "1.5.0"
          }
        ]
      },
      {
        "id": "1.6",
        "name": "1.6",
        "children": [
          {
            "id": "1.6.0",
            "parentId": "1.6",
            "name": "1.6.0"
          },
          {
            "id": "1.6.1",
            "parentId": "1.6",
            "name": "1.6.1"
          }
        ]
      }
    ];
    var data = [
      {
        id: 1,
        name: '数据1'
      },
      {
        id: 2,
        name: '数据2'
      },
      {
        id: 3,
        name: '数据3'
      },
      {
        id: 4,
        name: '数据44'
      },
      {
        id: 5,
        name: '数据55555'
      },
    ];
    var defaultData = [
      {
        id: 7,
        name: '默认数据1'
      },
      {
        id: 8,
        name: '默认数据2'
      },
      {
        id: 9,
        name: '默认数据3'
      }
    ];
    let paginationProps = {
      total: 1000,
      current: 1,
      limit: 10,
      selectVisible: true,
      goVisible: true,
      onSelect: (val) => { },
      onChange: (val) => {
        console.log(val)
      },
    }
    const data2 = [{
      appId: "100000901",
      key: '1',
      firstName: 'John',
      fromTime: '1518141753001',
      endTime: '1518141753001',
      age: "13",
      address: 'New York No. 1 Lake Park',
      url: 'https://hayyaimagedebug.onemt.co/post/20180209/480x640_682b7319-0671-4f4d-b6ed-78b0532a2613.jpg'
    }, {
      appId: "100000902",
      key: '2',
      firstName: 'Jim',
      fromTime: '1518141772003',
      endTime: '1518141772003',
      age: "21",
      address: 'London No. 2 Lake Park',
      url: 'https://hayyaimagedebug.onemt.co/post/20180209/480x640_4fb623bf-b841-43d4-a0db-818905adf100.jpg'
    }, {
      appId: "100000903",
      key: '3',
      firstName: 'Joe',
      fromTime: '1518141753002',
      endTime: '1518141753002',
      age: "3",
      address: 'Sidney No. 3 Lake Park',
      url: 'https://hayyaimagedebug.onemt.co/post/20180209/1280x1708_8a62a5a6-1b23-409e-9974-819b2e2ffd94.jpg'
    }];



    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="#">{text.name}</a>
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      sorter: 'age',
      render: text => <p>{text.age}</p>,
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '开始时间',
      dataIndex: 'fromTime',
      key: 'fromTime',
      sorter: 'fromTime',
      render: text => (
        <div>
          <p>{UTCToTime(text.fromTime / 1000)}</p>
          <p>{UTCToTime(text.endTime / 1000)}</p>
        </div>
      )
    }, {
      title: '操作',
      key: 'action',
      render: text => (
        <div>
          <button className='btn btn-xs btn-primary' onClick={this.showDialog.bind(this, text)}>详情</button>
          <button className='btn btn-xs btn-danger' onClick={this.onDelete.bind(this, text.key)}>删除</button>
        </div>
      )
    }];

    const rowSelection = {
      onSelect: (ids) => {
        console.log(ids)
      },
    }
    const { dataSource } = this.state;
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
          <h1>swiper</h1>

        </div>
        <Pagination {...paginationProps} /><br />
        <DatePicker
          defaultValue={''}
          disabled={false}
          type={'YYYY-MM-DD HH:mm'}
          onChange={(dateString) => {
            console.log(dateString);
          }}
        />
        <br />

        <Table columns={columns} dataSource={dataSource} rowSelection={rowSelection} /><br />

        <div className="tips-btn-wrap" style={{ width: this.state.parentWidth ? this.state.parentWidth : '40px' }}>
          <button className="btn btn-xs btn-primary tips-parent" onClick={this.showHovertips.bind(this)}>
            详情
          </button>
          {this.state.detailShow == true ? <DetailTip overlay={meun} direction={'right'} width={'400px'} /> : ''}
        </div>


        <button className="btn" onClick={this.showDialog.bind(this)}>
          弹出窗
          </button><br />
        <button className="btn" onClick={this.showlog.bind(this)}>
          弹出提示框
          </button>
        <br />

        <DatePicker
          defaultValue={''}
          disabled={false}
          type={'YYYY-MM-DD HH:mm'}
          onChange={(dateString) => {
            console.log(dateString);
          }}
        />
        <button>
          修改
          </button>
        <br />

        <br />
        <button className="btn" onClick={this.showGritter.bind(this)}>
          弹出提示
          </button>
          <br />
        <SelectSearch
          defaultValue={'1'}
          data={data}
          disabled={false}
          id={'id'}
          name={'name'}
          onChange={(val) => {
            console.log(val);
          }}
        />
        <br />


        <br />

        <Upload
          url={''}
          defaultValue={''}
          drop={true}
          disabled={false}
          maxLength={10}
          multiple={true}
          onChange={(img, localimg) => {

          }}
        />

        <br />

        <br />
        <SelectMultiple
          defaultValue={[1]}
          title={'dmeo'}
          data={data}
          disabled={false}
          onChange={(val) => {
            console.log(val);
          }}
        />
        <br />
        <br />
        <TreeView
          data={list}
          defaultValue={[]}
          onChange={(val) => {
            console.log(val)
          }}
        />
        <Multicolumn
          data={data}
          size={['50%', 700]}
          titName='管理平台'
          defaultValue={defaultData}
          onChange={(val) => { }}
        />
      </Common >
    )
  }
}

export default Dispatch(Index);