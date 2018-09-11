import forEach from 'lodash/forEach';
// import { timestamp } from '../common/header';

/*
  * 表单验证 组件
*/

/*
 @param val [Object] {}

 -----------------------------------
 
 @param validations [Object]
 ** required [boolean] 判断是否控制
 ** regexp [regexp] 正则判断
 ** tip 提示内容
 ** len 文本长度
 ** type=date 时间验证
*/
function valLength(val) {
  var i = 0, len = val.length;
  var sum = 0;

  for (i; i < len; i++) {
    if (/[\u4E00-\u9FA5]/.test(val.charAt(i))) {
      sum += 2;
    }
    else {
      sum++
    }
  }

  return sum;
}

var validation = function (val, validations) {
  //var val = val || {};
  //var validationsDemo = validations || { name: { required: true, extends: function () { } }, intro: { required: true }, status: { regexp: '^\\d+$' } };
  //console.log(val);
  var result = {};
  var items = validations || {};
  for (var k in items) {

    //判断是否是空值
    if (items[k].required) {
      if (!val[k] || val[k].length < 1) {
        result[k] = {
          name: k,
          tip: items[k].requiredTip || '内容不能为空'
        };
        continue;
      }
    }

    //正则判断内容格式
    if (items[k].regexp) {
      var reg = new RegExp(items[k].regexp, items[k].regexpGlobal || 'gi');
      if (!reg.test(val[k])) {
        result[k] = {
          name: k,
          tip: items[k].regexpTip || '内容格式不匹配'
        };
        continue;
      }
    }

    //判断内容长度
    if (items[k].len) {
      if (valLength(val[k]) > items[k].len) {
        result[k] = {
          name: k,
          tip: items[k].lenTip || '限制' + items[k].len + '字以内'
        };
        continue;
      }
    }

    //比较大小
    if (items[k].equal) {
      if (items[k].equalValue) {
        var tip = '';
        switch (items[k].equal) {
          case 'eq':
            if (val[k] != items[k].equalValue) {
              tip = '两者值不相等'
            }
            break;
          case 'gt':
            if (val[k] <= items[k].equalValue) {
              tip = '值要大于对应的值'
            }
            break;
          case 'lt':
            if (val[k] >= items[k].equalValue) {
              tip = '值要小于对应的值'
            }
            break;
          case 'egt':
            if (val[k] < items[k].equalValue) {
              tip = '值要大于等于对应的值'
            }
            break;
          case 'elt':
            if (val[k] > items[k].equalValue) {
              tip = '值要小于等于对应的值'
            }
            break;
          default:
            tip = '校验的符号不对';
            break;
        }
        result[k] = {
          name: k,
          tip: items[k].equalTip || tip
        };
      }
      else {
        result[k] = {
          name: k,
          tip: '没有配置对比域的验证对象'
        };

      }
      continue;
    }

    //扩展校验
    if (items[k].extends && typeof items[k].extends === 'function') {
      result = items[k].extends(val, validations, result);
    }
  }

  var sum = 0;
  for(var i in result){
    sum++;
    break;
  }
  return sum ? result : null;
}

//validation();

export default validation;