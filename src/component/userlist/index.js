import React from 'react';

import Dispatch from '../../dispatch';

import Common from '../common/common';

import { UTCToTime, TimeToUTC } from '../../tools/utc';
import Pagination from '../../module/pagination';

// import Table from './table';
import Table from '../../module/table';
import ConditionList from './conditionList';
import DialogDemo from './dialog';



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

  render() {
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
      title: '注册时间',
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
    const { dataSource } = this.state;
    return (
      <Common {...this.props} >
        <div className="pages-wrap">
          <div className="page-header">
            <h1>注册用户列表</h1>
          </div>
        </div>

        <p>
          <button className="btn btn-primary">
												<i className="ace-icon fa fa-pencil-square-o align-top bigger-125"></i>
												新增
											</button>
          </p>
        <Table columns={columns} dataSource={dataSource} rowSelection={rowSelection} />
        <Pagination {...paginationProps} />


      </Common >
    )
  }
}

export default Dispatch(Index);