import React from 'react';
import moment from 'moment';

import { Calendar } from 'react-date-range';

/*
  * 时间下拉选择 组件
  * @param {String} default
  * @param {String} defaultValue
  * @param {Boolean} disabled
  * @param {String} type
  * @param {Object} style
  * @param {Function} onChange @return {String}
*/

var hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
var minutes = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];

class DateTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: this.props.type.indexOf('HH') > -1 ? moment(this.props.result).format('HH') : '',
      minute: this.props.type.indexOf('mm') > -1 ? moment(this.props.result).format('mm') : '',
      second: this.props.type.indexOf('ss') > -1 ? moment(this.props.result).format('ss') : ''
    }
  }
  stopPropagation(event) {
    event.stopPropagation();
  }
  changeValue(type, event) {
    var newState = this.state;
    if (type === 'HH') {
      newState.hour = event.target.value;
    }
    else if (type === 'mm') {
      newState.minute = event.target.value;
    }
    else if (type === 'ss') {
      newState.second = event.target.value;
    }
    else { 
      newState.hour = '';
      newState.minute = '';
      newState.second = '';
    }
    this.setState(newState);
    this.props.timeChange(newState);
  }
  render() {
    let _h,
      _m,
      _s,
      _timeHtml;

    if (this.props.type.indexOf('ss') > -1) {
      _s = <select value={this.state.second} onChange={this.changeValue.bind(this, 'ss')}>
        {
          minutes.map((items, i) => {
            return (<option key={i} value={items}>{items}</option>)
          })
        }
      </select>
    }

    if (this.props.type.indexOf('mm') > -1) {
      _m = <select value={this.state.minute} onChange={this.changeValue.bind(this, 'mm')}>
        {
          minutes.map((items, i) => {
            return (<option key={i} value={items}>{items}</option>)
          })
        }
      </select>
    }

    if (this.props.type.indexOf('HH') < 0) {
      _timeHtml = <div />;
    }
    else {
      _h = <select value={this.state.hour} onChange={this.changeValue.bind(this, 'HH')}>
        {
          hours.map((items, i) => {
            return (<option key={i} value={items}>{items}</option>)
          })
        }
      </select>

      _timeHtml = <div className="datetime-control-time">
        <i className="icon-time bigger-110"></i> {_h} {_m ? ':' : ''} {_m} {_s ? ':' : ''} {_s}
      </div>
    }
    return (
      <div className="datetime-control-select" onClick={this.stopPropagation.bind(this)}>
        <Calendar onChange={this.props.dateChange.bind(this)} date={moment(this.props.result)} />
        {_timeHtml}
        <div className="datetime-control-button">
          <button type="button" className="btn btn-sm btn-success" onClick={this.props.submit.bind(this)}>OK</button>
          <button type="button" className="btn btn-sm btn-light" onClick={this.props.cancel.bind(this)}>Cancel</button>
        </div>
      </div>
    )
  }
}

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDateTime: 0,
      result: this.props.defaultValue  || '',
      now: '',
      date: '',
      time: '',
      type: this.props.type || 'YYYY-MM-DD HH:mm:ss'
    }

    this.changeShow = this.changeShow.bind(this);
  }
  changeShow() {
    this.setState({
      showDateTime: 0
    });
    window.removeEventListener('click', this.changeShow);
  }
  handleChange(event) {
    event.stopPropagation();
    if (this.state.showDateTime) {
      return;
    }
    let _now = this.state.result || this.props.default || moment((new Date()).getTime()).format(this.state.type);
    this.setState({
      showDateTime: 1,
      now : _now || '',
      date : _now.split(' ')[0],
      time : _now.split(' ')[1]
    });
    window.addEventListener('click', this.changeShow, false);

  }
  timeChange(data) {
    this.setState({
      time: data.hour + (data.minute ? ':' : '') + data.minute + (data.second ? ':' : '') + data.second
    });
  }
  dateChange(data) {
    this.setState({
      date: moment(data).format('YYYY-MM-DD')
    });
  }
  clear(event) {
    event.stopPropagation();

    this.setState({
      result: '',
      date: '',
      time: ''
    });

    this.props.onChange('');
  }
  cancel(event) {
    event.stopPropagation();
    this.setState({
      showDateTime: 0
    });
  }
  submit() {
    let _result,
      _now = this.state.now;
    if(this.state.time){
      if (!this.state.date && this.state.time) {
        _result = _now.split(' ')[0] + ' ' + this.state.time;
      } else if (this.state.date && !this.state.time) {
        _result = this.state.date + ' ' + _now.split(' ')[1];
      } else if (!this.state.date && !this.state.time) {
        _result = _now;
      } else {
        _result = this.state.date + ' ' + this.state.time;
      }
    }else{
      _result = this.state.date;
    }
    this.setState({
      result: _result
    });

    this.changeShow();
    this.props.onChange(_result);
  }
  render() {
    let _handleChnage,
      _inputHtml = '',
      _clearHtml = '';

    if (this.props.disabled) {
      _handleChnage = () => { };

      _inputHtml =
        <input
          className="form-control date-picker"
          type="text"
          value={this.state.result}
          disabled
        />;

    } else {
      _handleChnage = this.handleChange.bind(this);

      _inputHtml =
        <input
          className="form-control date-picker"
          onChange={() => { }}
          type="text"
          value={this.state.result}
        />;
      if (this.state.result && !this.state.showDateTime) {
        _clearHtml =
          <span className="input-group-addon" onClick={this.clear.bind(this)}>
            <i className="icon-remove bigger-110"></i>
          </span>;
      }
    }

    let _dateHtml = this.state.showDateTime
      ? <DateTime
        dateChange={this.dateChange.bind(this)}
        timeChange={this.timeChange.bind(this)}
        submit={this.submit.bind(this)}
        cancel={this.cancel.bind(this)}
        result={this.state.result || this.state.now}
        type={this.state.type}
      />
      : '';

    return (
      <div className="datetime-control" style={this.props.style}>
        <div className="input-group" onClick={_handleChnage}>
          {_inputHtml}
          {_clearHtml}
          <span className="input-group-addon">
            <i className="icon-calendar bigger-110"></i>
          </span>
        </div>

        {_dateHtml}
      </div>
    )
  }
}

export default DatePicker;