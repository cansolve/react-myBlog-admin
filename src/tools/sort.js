/*
  * 排序 (Sort)
  ------------------------
  * @param {Object} options   {data:[],key:'',type:'number|string',order:'asc|desc'}
*/
export function Sorting(options) {

  var defaults = {
    data: [],
    key: '',
    type: 'number'
  }

  var options = Object.assign(defaults, options);

  if (!options.order) {
    options.order = 'asc'
  }
  else {
    options.order = options.order === 'desc' ? 'asc' : 'desc';
  }

  var newData = [];

  if (defaults.type === 'number') {
    newData = options.data.sort(function (a, b) {
      if (options.key) {
        return options.order === 'asc' ? a[options.key] - b[options.key] : b[options.key] - a[options.key];
      }
      else {
        return options.order === 'asc' ? a - b : b - a;
      }
    });
  }
  else {
    newData = options.data.sort(function (a, b) {
      if (options.key) {
        return options.order === 'asc' ? a[options.key].localeCompare(b[options.key]) : b[options.key].localeCompare(a[options.key]);
      }
      else {
        return options.order === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
      }
    })
  }

  return {
    key: options.key,
    order: options.order,
    data: newData
  };
}

/*
  * 排序样式 (sortClass)
  ------------------------
  * @param {String} str
  * @param {Object} obj
*/

export function SortClass(str, obj) {
  if (!str || !obj || Object.prototype.toString.call(obj) !== '[object Object]') {
    return 'sorting';
  }

  if (obj.name !== str) {
    return 'sorting';
  }
  else {
    if (obj.order === 'desc') {
      return 'sorting_desc'
    }
    else {
      return 'sorting_asc'
    }
  }
}