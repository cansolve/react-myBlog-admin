import React from 'react';
import _ from 'lodash';

/*
	* 下拉搜索组件 (SelectSearch)
	------------------------
	* @param {String} defaultValue
	* @param {Boolean} default
	* @param {Object} style
	* @param {Object} data
	* @param {Boolean} disabled
	* @param {String} id
	* @param {String} name
	* @param {Function} onChange @return {Array}
	------------------------
 */

class SelectSearch extends React.Component {
	constructor(props) {
		super(props);
		var _self = this,
			val = {};

		if (this.props.defaultValue) {
			this.props.data.every((chr) => {
				if (chr[_self.props.id] == _self.props.defaultValue) {
					val = chr;
					return false;
				}
				return true;
			});
		}

		this.state = {
			val: val,
			data: this.props.data || [],
			disabled: this.props.disabled || false,
			id: this.props.id || 'id',
			name: this.props.name || 'name',
			default: this.props.default || false,
			isShow: 0,  // 是否显示选择项
			value: ''   // 过滤值
		}

		this.showChange = this.showChange.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		var _self = this;
		var _val = this.state.val;

		if (this.state.val[this.state.id] != nextProps.defaultValue) {
			nextProps.data.every((chr) => {
				if (chr[_self.state.id] == nextProps.defaultValue) {
					_val = chr;
					return false;
				}
				return true;
			});
		}

		this.setState({
			val: _val,
			data: nextProps.data,
			disabled: nextProps.disabled
		});

	}
	selectChange(val, event) {
		event.preventDefault();
		this.setState({
			val: val,
			value: '',
			isShow: 0
		});
		this.props.onChange(val);
	}
	selectNull(event) {
		event.preventDefault();

		this.setState({
			val: {},
			value: '',
			isShow: 0
		});

		this.props.onChange(null);
	}
	showSelect(event) {
		event.preventDefault();

		var _isShow = this.state.isShow ? 0 : 1;

		this.setState({
			isShow: _isShow
		});

		if (_isShow) {
			window.addEventListener('click', this.showChange, false);
			event.stopPropagation();
		}

	}
	showChange(){
		this.setState({
			isShow: 0,
			value : ''
		});
		window.removeEventListener('click', this.showChange);
	}
	changeValue(event) {
		this.setState({
			value: event.target.value
		})
	}
	propagationEvent(event) {
		event.stopPropagation();
	}
	render() {
		var _self = this,
			_data = [];

		if (!this.state.value) {
			_data = this.state.data;
		}
		else {
			//过滤数据
			this.state.data.forEach((chr)=>{
				if (chr[_self.state.name].indexOf(_self.state.value) > -1) {
					_data.push(chr);
				}
			});
		}

		var _classname = this.state.isShow ? 'selectsearch-control selectsearch-control-select' : 'selectsearch-control';

		var _isDis = !this.state.value && !this.state.default;

		var _value = this.state.default ? '' : '请选择';
		_value = this.state.val[this.state.name] ? this.state.val[this.state.name] : _value;

		return (
			<div className={_classname} style={this.props.style}>
				<div className="selectsearch-title" onClick={this.showSelect.bind(this)}>{_value}</div>
				<div className="selectsearch-con" onClick={this.propagationEvent.bind(this)}>
					<div className="input-group">
						<input className="form-control" onChange={this.changeValue.bind(this)} type="text" value={this.state.value} />
						<span className="input-group-addon">
							<i className="icon-search"></i>
						</span>
					</div>
					<ul className="selectsearch-list">
						{_isDis ? <li><a href="#" onClick={this.selectNull.bind(this)}>请选择</a></li> : ''}
						{
							_data.map((items, i) => {
								return (<li key={i}><a href="#" id={items[this.state.id]} onClick={this.selectChange.bind(this, items)}>{items[this.state.name]}</a></li>)
							})
						}
					</ul>
				</div>
			</div>
		)
	}
}

export default SelectSearch;