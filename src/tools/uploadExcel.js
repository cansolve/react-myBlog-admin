/*
  multiple boolbean 多文件
  defaultValue string 默认值
  query string 传递的变量  'projectId=1&name=test'
  onChange function 回调函数
*/

import React from 'react';

import DropZone from 'react-dropzone';
import request from 'superagent';

import Host from '../../tools/host';

export default class FileExcelUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fileName: this.props.defaultValue || 'File Upload'
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      fileName : nextProps.defaultValue
    });
  }
  onDrop(files) {
    var _self = this;
    var url = this.props.url || '/api/uploadExcelFile';
    var name = this.props.name || 'file';

    var req = request.post(Host + url);
    
    if(this.props.query){
      req.query(this.props.query);
    }

    files.forEach((file) => {
      req.attach(name, file, file.name);
    });

    req.end((err, res) => {
      var result = JSON.parse(res.text);
      _self.props.onChange ? _self.props.onChange(result) : '';
    });
  }
  render() {
    return (
        <DropZone onDrop={this.onDrop.bind(this)} name="file" style={{ display: 'inline-block' }} multiple={this.props.multiple || false}>
          <span className="btn btn-xs btn-primary" style={{ padding: '3px 15px' }}>
            <i className="icon-picture align-top bigger-125"></i>{this.state.fileName}
          </span>
        </DropZone>
    )
  }
}