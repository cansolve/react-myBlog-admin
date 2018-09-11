import React from 'react';


// import Upload from './upload';
// import Emoji from './emoji';
/*公共控件*/


/*
  * 表单 input text 控件
  ------------------------
  ** 组件传递属性props
  ------------------------
  ** title [String]
  ** onChange [Function] 
  ** defaultValue [String]
  ** placeholder [String]
  ** validations [Object Object]  {name : '', tip :''}
  ** disabled [boolean]
  ** maxLength [Number]
  ** children [Object]
  -------------------------
*/

export class FromInput extends React.Component{
	constructor(props){
    	super(props);
  	}
  	render(){
      var className = this.props.ar ? 'col-sm-9 direction' : 'col-sm-9';
      var _val = this.props.defaultValue;
      var _maxLength = this.props.maxLength;

      var _resultLength = this.props.maxLength;

      if(this.props.maxLengthTip && _val && typeof _val ==='string'){
        _resultLength = _resultLength - _val.length;
      }

  		return(
  			<div className="form-group">
	  			<label className="col-sm-3 control-label no-padding-right">{this.props.title}</label>
	  			<div className="col-sm-9">
	  				{
	  					this.props.disabled ? <input type="text" className={className} value={this.props.defaultValue} disabled  /> :
	  					<input type="text" className={className} value={_val} placeholder={this.props.placeholder} onChange={this.props.onChange} maxLength={_maxLength} />
	  				}
            {this.props.maxLengthTip ? <span className="col-sm-3 max-text-tip">可以输入{_resultLength}字符</span> : ''}
            {this.props.children}
			    	{this.props.validations && this.props.validations.name ? <div className="form-tip"><i className="icon-remove-sign red"></i>{this.props.validations.tip}</div> : ''}
	  			</div>
  			</div>
  		)
  	}
}

/*
  * 表单 checkbox 控件
  ------------------------
  ** 组件传递属性props
  ------------------------
  ** title [String]
  ** onChange [Function] 
  ** multiple [boolean]  //false 单个；true 多个
  ** defaultValue [String]
  ** validations [Object Object]  {name : '', tip :''}
  ** disabled [boolean]
  ** data [Object Array]
  ** id [String]
  ** value [String]
  ** children [Object]
  ** row [boolean]
  -------------------------
*/

export class FromCheckBox extends React.Component{
	constructor(props){
    	super(props);
  	}
  	render(){
  		if(!this.props.multiple){
  			return (
  				<div className="form-group">
		  			<label className="col-sm-3 control-label no-padding-right">{this.props.title}</label>
		  			<div className="col-sm-9">
		  				<label className="label-right">
		  					{
		  						this.props.disabled ? 
		  						<input type="checkbox" name={this.props.name} checked={this.props.defaultValue ? true : false} disabled value={this.props.id} /> :
		  						<input type="checkbox" name={this.props.name} checked={this.props.defaultValue ? true : false} value={this.props.id} onChange={this.props.onChange}  /> 
		  					}

			          {this.props.value}
		  				</label>
              {this.props.children}
		  				{this.props.validations && this.props.validations.name ? <div className="form-tip"><i className="icon-remove-sign red"></i>{this.props.validations.tip}</div> : ''}
		  			</div>
	  			</div>
  			)
  		}
      var _display = this.props.row ? 'table' : '';
  		return(
  			<div className="form-group">
	  			<label className="col-sm-3 control-label no-padding-right">{this.props.title}</label>
	  			<div className="col-sm-9">
            {
              this.props.disabled ? 
                this.props.data.map((items,i)=>{
                return (<label className="label-right" key={i} style={{display:_display}}><input type="checkbox" value={items[this.props.id || 'id']} checked={(()=>{
                  var checked = false;
                  this.props.defaultValue.map((val,k)=>{
                      val == items[this.props.id || 'id'] ? checked = true : '';
                  });
                  return checked;
                })()}  disabled />{items[this.props.value || 'value']}</label>)
              }) :
              this.props.data.map((items,i)=>{
                if(items.disabled){
                  return (<label className="label-right" key={i} style={{display:_display}}><input type="checkbox" value={items[this.props.id || 'id']} checked={(()=>{
                    var checked = false;
                    this.props.defaultValue.map((val,k)=>{
                        val == items[this.props.id || 'id'] ? checked = true : '';
                    });
                    return checked;
                  })()} disabled />{items[this.props.value || 'value']}</label>)
                }
                return (<label className="label-right" key={i} style={{display:_display}}><input type="checkbox" value={items[this.props.id || 'id']} checked={(()=>{
                  var checked = false;
                  this.props.defaultValue.map((val,k)=>{
                      val == items[this.props.id || 'id'] ? checked = true : '';
                  });
                  return checked;
                })()} onChange={this.props.onChange} />{items[this.props.value || 'value']}</label>)
              })
            }

	  				{this.props.children}
            {this.props.validations && this.props.validations.name ? <div className="form-tip"><i className="icon-remove-sign red"></i>{this.props.validations.tip}</div> : ''}
	  			</div>
  			</div>
  		)
  	}
}

/*
  * 表单 textarea 控件
  ------------------------
  ** 组件传递属性props
  ------------------------
  ** title [String]
  ** onChange [Function] 
  ** defaultValue [String]
  ** validations [Object Object]  {name : '', tip :''}
  ** disabled [boolean]
  ** children [Object]
  -------------------------
*/

export class FromTextArea extends React.Component{
	constructor(props){
    	super(props);
  	}
  	render(){
      var _val = this.props.defaultValue;
      var _maxLength = this.props.maxLength;

      var _resultLength = this.props.maxLength;

      if(this.props.maxLengthTip && _val && typeof _val ==='string'){
        _resultLength = _resultLength - _val.length;
      }
  		return(
  			<div className="form-group">
	  			<label className="col-sm-3 control-label no-padding-right">{this.props.title}</label>
	  			<div className="col-sm-9">
	  				{
	  					this.props.disabled ?
	  					<textarea className={this.props.className ? 'col-sm-9 ' + this.props.className : 'col-sm-9'} value={_val} disabled></textarea>:
	  					<textarea className={this.props.className ? 'col-sm-9 ' + this.props.className : 'col-sm-9'} value={_val} maxLength={_maxLength} placeholder={this.props.placeholder} onChange={this.props.onChange}></textarea>
	  				}
            {this.props.maxLengthTip ? <span className="col-sm-3 max-text-tip">可以输入{_resultLength}字符</span> : ''}
	  				{this.props.children}
			    	{this.props.validations && this.props.validations.name ? <div className="form-tip"><i className="icon-remove-sign red"></i>{this.props.validations.tip}</div> : ''}
	  			</div>
  			</div>
  		)
  	}
}

/*
  * 表单 select 控件
  ------------------------
  ** 组件传递属性props
  ------------------------
  ** onChange [Function] 
  ** defaultValue [String]
  ** title [String]
  ** validations [Object Object]  {name : '', tip :''}
  ** disabled [boolean]
  ** data [Object Array]
  ** id [String]
  ** value [String]
  ** children [Object]
  -------------------------
*/

export class FromSelect extends React.Component{
	constructor(props){
    	super(props);
  	}
  	render(){
  		return(
  			<div className="form-group">
	  			<label className="col-sm-3 control-label no-padding-right">{this.props.title}</label>
	  			<div className="col-sm-9">
            {
              this.props.disabled ?
              <select value={this.props.defaultValue} disabled>
                <option value=''>请选择</option>
                {
                  this.props.data.map((items, i)=>{
                    return (<option key={i} value={items[this.props.id || 'id']}>{items[this.props.value || 'value']}</option>)
                  })
                }
              </select> : 
              <select value={this.props.defaultValue} onChange={this.props.onChange}>
                {this.props.default ? '' : <option value=''>请选择</option> }
                {
                  this.props.data.map((items, i)=>{
                    return (<option key={i} value={items[this.props.id || 'id']}>{items[this.props.value || 'value']}</option>)
                  })
                }
              </select>
            }
            {this.props.children}
			    	{this.props.validations && this.props.validations.name ? <div className="form-tip"><i className="icon-remove-sign red"></i>{this.props.validations.tip}</div> : ''}
	  			</div>
  			</div>
  		)
  	}
}


/*
  * 表单 radio 控件
  ------------------------
  ** 组件传递属性props
  ------------------------
  ** onChange [Function] 
  ** defaultValue [String]
  ** title [String]
  ** validations [Object Object]  {name : '', tip :''}
  ** disabled [boolean]
  ** data [Object Array]
  ** id [String]
  ** value [String]
  ** children [Object]
  -------------------------
*/

export class FromRadio extends React.Component{
  constructor(props){
      super(props);
    }
    render(){
      return(
        <div className="form-group">
          <label className="col-sm-3 control-label no-padding-right">{this.props.title}</label>
          <div className="col-sm-9">
            {
              this.props.disabled ?
              this.props.data.map((items,i)=>{
                return (
                  <label className="label-right" key={i}>
                    <input type="radio" name={this.props.name} value={items[this.props.id || 'id']} checked={this.props.defaultValue==items[this.props.id || 'id'] ? true : false} disabled />
                    {items[this.props.value || 'value']}
                  </label>
                )
              }) : 
              this.props.data.map((items,i)=>{
                if(items.disabled){
                  return(
                    <label className="label-right" key={i}>
                      <input type="radio" name={this.props.name} value={items[this.props.id || 'id']} checked={false} disabled />
                      {items[this.props.value || 'value']}
                    </label>
                  )
                }
                return (
                  <label className="label-right" key={i}>
                    <input type="radio" name={this.props.name} value={items[this.props.id || 'id']} checked={this.props.defaultValue==items[this.props.id || 'id'] ? true : false} onChange={this.props.onChange} />
                    {items[this.props.value || 'value']}
                  </label>
                )
              })
            }
            {this.props.children}
            {this.props.validations && this.props.validations.name ? <div className="form-tip"><i className="icon-remove-sign red"></i>{this.props.validations.tip}</div> : ''}
          </div>
        </div>
      )
    }
}


// /*
//   * 表单 file 控件
//   ------------------------
//   ** 组件传递属性props
//   ------------------------
//   ** onChange [Function] 
//   ** defaultValue [String]
//   ** title [String]
//   ** multiple [boolean] //true 多图上传
//   ** validations [Object Object]  {name : '', tip :''}
//   ** disabled [boolean]
//   ** children [Object]
//   -------------------------
// */

// export class FromUpload extends React.Component{
//   constructor(props){
//       super(props);
//     }
//     render(){
//       return(
//         <div className="form-group">
//           <label className="col-sm-3 control-label no-padding-right">{this.props.title}</label>
//           <div className="col-sm-9">
//             <Upload drop={this.props.drop} disabled={this.props.disabled} maxLength={this.props.maxLength} multiple={this.props.multiple} onChange={this.props.onChange} defaultValue={this.props.defaultValue}/>
//             {this.props.children}
//             {this.props.validations && this.props.validations.name ? <div className="form-tip"><i className="icon-remove-sign red"></i>{this.props.validations.tip}</div> : ''}
//           </div>
//         </div>
//       )
//     }
// }


// /*
//   * 表单 emoji 控件
//   ------------------------
//   ** 组件传递属性props
//   ------------------------
//   ** onChange [Function] 
//   ** defaultValue [String]
//   ** title [String]
//   ** validations [Object Object]  {name : '', tip :''}
//   ** disabled [boolean]
//   ** children [Object]
//   -------------------------
// */

// export class FromEmoji extends React.Component{
//   constructor(props){
//       super(props);
//     }
//     render(){
//       return(
//         <div className="form-group">
//           <label className="col-sm-3 control-label no-padding-right">{this.props.title}</label>
//           <div className="col-sm-9">
//             <Emoji onChange={this.props.onChange} defaultValue={this.props.defaultValue} disabled={this.props.disabled}/>
//             {this.props.children}
//             {this.props.validations && this.props.validations.name ? <div className="form-tip"><i className="icon-remove-sign red"></i>{this.props.validations.tip}</div> : ''}
//           </div>
//         </div>
//       )
//     }
// }