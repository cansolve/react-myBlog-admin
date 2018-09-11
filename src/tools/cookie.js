function setCookie(key, value, time) {
  var now = new Date(),
    cookies = '';

  now.setTime(now.getTime() + time);
  cookies = key + "=" + escape(value) + ";expires=" + now.toGMTString();
  document.cookie = cookies;
}

function getCookie(key) {
  var str = '',
    i = 0,
    cookie = document.cookie,
    arr = unescape(cookie).split(';'),
    len = arr.length;
  for (i; i < len; i++) {
    if (arr[i].indexOf(key) > -1) {
      str = arr[i];
    }
  }

  return str ? str.replace(key + '=', '') : str;
}

function removeCookie(key) {
  var now = new Date(),
    cookies = '';
  now.setTime(now.getTime() + (-1 * 1000 * 60 * 60));

  cookies = key + "=" + escape('') + ";expires=" + now.toGMTString();
  document.cookie = cookies;
}

export default {
  set: setCookie,
  get: getCookie,
  remove: removeCookie
};


