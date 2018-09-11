import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import DropZone from 'react-dropzone';
import request from 'superagent';


/*
  * 上传图片组件 (Upload)
  ------------------------
  * @param {Boolean} disabled  是否可以上传
  * @param {Boolean} drop  是否可以拖拽
  * @param {Boolean} multiple  是否允许多张上传
  * @param {Number} maxLength  图片上传的最大数
  * @param {Boolean} maxTip  是否允许上传超过最大数的错误提示
  * @param {String} url
  * @param {Function} onChange @return {String, String}
  * @param {String || Array} defaultValue 默认值
  -------------------------
*/

import Host from '../tools/host';
import Cookie from '../tools/cookie';

var isDrop = false, cache;
var element, eleArr = [], x, y, posTop, posLeft, oldIndex, newIndex, maxHeight, maxWidth, maxLen, baseWidth, baseHeigth, maxX, maxY;
var domHtml = '<span class="img-show seat"></span>';

class Index extends React.Component {
  constructor(props) {
    super(props)
    var val = [];
    if (this.props.defaultValue) {
      if (Object.prototype.toString.call(this.props.defaultValue) === '[object Array]') {
        val = this.props.defaultValue
      }
      else {
        val = this.props.defaultValue.split(',');
      }
    }

    this.state = {
      result: val,
      data: val,
      maxTip: 0
    }
  }
  // componentWillReceiveProps(nextProps){
  //   if(nextProps.defaultValue){
  //     if(Object.prototype.toString.call(nextProps.defaultValue)==='[object Array]'){
  //       this.setState({
  //         data : nextProps.defaultValue,
  //         result : this.state.result.length > 0  ? this.state.result : nextProps.defaultValue
  //       });
  //     }
  //     else{
  //       var arr = nextProps.defaultValue.split(',');
  //       this.setState({
  //         data : arr,
  //         result : this.state.result.length > 0  ? this.state.result : arr
  //       });
  //     }
  //   }
  // }
  onDrop(files) {

    //判断上传的图片是否大于限定的最大数
    if (this.props.maxLength && this.state.result.length + files.length > this.props.maxLength) {
      this.setState({
        maxTip: 1
      });
      return;
    }

    if (this.state.maxTip) {
      this.setState({
        maxTip: 0
      });
    }

    var _this = this;
    var req = request.post(this.props.url);

    req.set('contentType', 'application/json')
    req.set('clientversion', '3.0')
    req.field('request', JSON.stringify(this.props.param))

    files.forEach((file) => {
      req.attach(file.name, file);
    });

    req.end((err, res) => {
      var result = JSON.parse(res.text);

      if (result.succeed) {
        if (this.props.multiple) {
          _this.setState({
            result: _this.state.result.concat(_.map(files, 'preview')),
            data: _this.state.data.concat(result.rspdata.fileName)
          })
        } else {
          _this.setState({
            result: _.map(files, 'preview'),
            data: result.rspdata.fileName
          })
        }

        _this.props.onChange ? _this.props.onChange(this.state.data, this.state.result) : '';
      }
      else {

      }
    });
  }
  onRemove(val, event) {
    event.stopPropagation();

    var data = this.state.data;
    var result = this.state.result;

    data.splice(val, 1);
    result.splice(val, 1);

    this.setState({
      data: data,
      result: result
    });

    this.props.onChange(data, result)
  }
  mousedown(event) {

    isDrop = true;

    var _parent = $(this.myDiv);
    var _top = _parent.offset().top;
    var _left = _parent.offset().left;

    var _ele = $(event.currentTarget);

    var left = _ele.offset().left - _left;
    var top = _ele.offset().top - _top;

    _ele.addClass('img-move').css({ left: left + 2 + 'px', top: top + 2 + 'px' });

    posTop = parseInt(_ele.css('top'));
    posLeft = parseInt(_ele.css('left'));

    x = event.pageX;
    y = event.pageY;

    _parent.children().each(function () {
      eleArr.push($(this));
    });

    oldIndex = _ele.index();
    cache = oldIndex + 1;
    maxWidth = _parent.width();
    maxHeight = _parent.height();
    maxLen = this.state.result.length; // 共几张图片
    baseWidth = _ele.outerWidth() + parseInt(_ele.css('margin-right'));
    baseHeigth = _ele.outerHeight() + parseInt(_ele.css('margin-bottom'));
    maxX = Math.floor(maxWidth / baseWidth); // x轴最大数
    maxY = Math.floor(maxHeight / baseHeigth); // y轴最大数
    element = _ele;

    _ele.before(domHtml);

  }
  mousemove(event) {
    event.preventDefault();

    if (!isDrop) {
      return;
    }

    var _x = event.pageX - x;
    var _y = event.pageY - y;

    var top = posTop + _y;
    var left = posLeft + _x;
    element.css({ left: left + 'px', top: top + 'px' });

    var xpos = Math.floor(left / baseWidth); //拖动处于x轴第几张位置
    var ypos = Math.floor(top / baseHeigth); //拖动处于y轴第几张位置

    xpos >= maxX ? xpos = maxX : '';
    ypos >= maxY ? ypos = maxY : '';

    xpos <= 0 ? xpos = 0 : '';
    ypos <= 0 ? ypos = 0 : '';

    var postion = ypos * maxX + xpos;

    postion = postion >= maxLen ? maxLen - 1 : postion;
    postion = postion <= 0 ? 0 : postion;

    if (postion >= oldIndex && postion < maxLen) {
      postion++;
    }

    if (cache === postion) {
      return;
    }

    $('.seat').remove();
    postion == maxLen ? eleArr[postion - 1].after(domHtml) : eleArr[postion].before(domHtml);
    newIndex = postion >= oldIndex ? postion - 1 : postion;
    cache = postion;

  }
  mouseup(event) {

    isDrop = false;
    eleArr = [];
    cache = '';

    $('.seat').remove();
    element.removeClass('img-move').css({ left: '0px', top: '0px' });

    //console.log('oldIndex:'+oldIndex+';newIndex:'+newIndex);

    if (oldIndex === '' || newIndex === '' || typeof oldIndex === 'undefined' || typeof newIndex === 'undefined') {
      oldIndex = '';
      newIndex = '';
      return;
    }

    var result = this.state.result;
    var data = this.state.data;

    var cacheArr = '';
    cacheArr = result[oldIndex];
    result.splice(oldIndex, 1);
    result.splice(newIndex, 0, cacheArr);

    cacheArr = data[oldIndex];
    data.splice(oldIndex, 1);
    data.splice(newIndex, 0, cacheArr);

    this.setState({
      result: result,
      data: data
    });

    oldIndex = '';
    newIndex = '';

  }
  render() {
    return (
      <div>
        <div className="img-con" ref={(ref) => this.myDiv = ref}>
          {
            this.state.result.map((items, i) => {

              if (this.props.drop && !this.props.disabled) {
                return (
                  <a key={i} className="img-show"
                    onMouseDown={this.mousedown.bind(this)}
                    onMouseMove={this.mousemove.bind(this)}
                    onMouseUp={this.mouseup.bind(this)}>
                    <img src={items} />
                    {
                      this.props.disabled ? '' :
                        <em onClick={this.onRemove.bind(this, i)}>
                          <i className="icon-remove"></i>
                        </em>
                    }
                  </a>
                )
              }
              else {
                return (
                  <a key={i} className="img-show">
                    <img src={items} />
                    {this.props.disabled ? '' :
                      <em onClick={this.onRemove.bind(this, i)}>
                        <i className="icon-remove"></i>
                      </em>
                    }
                  </a>
                )
              }

            })
          }
        </div>
        {
          this.props.disabled ? '' :
            <DropZone onDrop={this.onDrop.bind(this)} style={{ display: 'inline-block' }} multiple={this.props.multiple || false}>
              <span className="btn btn-xs btn-primary">
                <i className="icon-picture align-top bigger-125"></i>Upload
              </span>
              <div style={{ display: this.state.maxTip ? 'block' : 'none' }}>
                <i className="icon-remove-sign red">只能上传{this.props.maxLength}张</i>
              </div>
            </DropZone>
        }
      </div>
    )
  }
}

export default Index;


export class ImageUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultLen: 3,
      min: 3,
      data: [],
      maxTip: 0,
      minTip: 0
    }
  }
  // componentWillReceiveProps(nextProps){
  //   if(nextProps.defaultValue.length > 0){
  //     let _len = nextProps.defaultValue.length >= this.state.min ? nextProps.defaultValue.length : this.state.defaultLen;
  //     this.setState({
  //       data : nextProps.defaultValue,
  //       defaultLen : _len
  //     })
  //   }
  // }
  onDrop(n, files) {
    var _this = this;
    var req = request.post(this.props.url);

    req.set('contentType', 'application/json')
    req.set('clientversion', '3.0')
    req.field('request', JSON.stringify(this.props.param))

    files.forEach((file) => {
      req.attach(file.name, file);
    });

    req.end((err, res) => {
      var result = JSON.parse(res.text);

      if (result.succeed) {
        let _data = this.state.data;

        _data[n] = _data[n] ? _data[n] : {};

        _data[n].preimg = _.map(files, 'preview')[0];
        _data[n].img = result.rspdata.fileName[0];

        _this.setState({
          data: _data
        });
        _this.props.onChange ? _this.props.onChange(_data) : '';
      }
      else {

      }

    });
  }
  onRemove(n, event) {
    event.stopPropagation();

    let _data = this.state.data;
    let _Len = this.state.defaultLen;

    _data.splice(n, 1);
    _Len--;

    this.setState({
      data: _data,
      defaultLen: _Len
    });

    this.props.onChange(_data);
  }
  changeValue(n, evnet) {
    let _data = this.state.data;

    _data[n] = _data[n] ? _data[n] : {};

    _data[n].text = evnet.target.value;

    this.setState({
      data: _data
    });

    this.props.onChange(_data);
  }
  addLength() {
    var _len = this.state.defaultLen;
    _len++;

    this.setState({
      defaultLen: _len
    });
  }
  render() {
    return (
      <div>
        {
          new Array(this.state.defaultLen).join(',').split(',').map((items, i) => {
            return (
              <div className="imgupload-items" key={i}>
                <DropZone onDrop={this.onDrop.bind(this, i)} className="imgupload-list">
                  {
                    this.state.data[i] && this.state.data[i].preimg ? <img src={this.state.data[i].preimg} /> :
                      <span>
                        <i className="icon-cloud-upload"></i>
                      </span>
                  }

                  {
                    i < this.state.min ? '' : <div className="imgupload-remove" onClick={this.onRemove.bind(this, i)}>
                      <i className="icon-remove"></i>
                    </div>
                  }

                </DropZone>
                <input type="text" className="col-sm-12" value={this.state.data[i] && this.state.data[i].text ? this.state.data[i].text : ''} onChange={this.changeValue.bind(this, i)} />
              </div>
            )
          })
        }
        <div className="imgupload-add" onClick={this.addLength.bind(this)}>
          <span>
            <i className="icon-plus"></i>
          </span>
        </div>
      </div>
    )
  }
}