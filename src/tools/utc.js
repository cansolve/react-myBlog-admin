function pluszore(val) {
  return val >= 10 ? val : '0' + val;
}

function minuszore(val) {
  if (val > -10) {
    val = new String(val);
    val = val.replace(/(\-)(\d+)/g, '$10$2')
  }
  return val;
}

export function TimeToUTC(value, timezone) {
  if (!value) {
    return '';
  }
  var timezone = parseInt(timezone || '+0');
  var t = value.replace(/(-|\/|:)/g, ' ').split(' ');
  var utc = Date.UTC(t[0], parseInt(t[1]) - 1, t[2], t[3] || '00', t[4] || '00', t[5] || '00');

  var newTime = utc - 3600000 * timezone;

  return Math.floor(newTime / 1000);
}

//console.log(TimeToUTC('2017-06-22 12:06:16','+3')); 
// ==> 1498122376

//console.log(TimeToUTC('2017-06-22')); 
// ==> 1498089600

export function UTCToTime(value, timezone, isShowUTC) {
  if (!value) {
    return '';
  }

  var timezone = parseInt(timezone || '+0');
  var isShowUTC = isShowUTC || false;
  var newDate = new Date(value * 1000 + 3600000 * timezone);

  var y = newDate.getUTCFullYear(),
    m = newDate.getUTCMonth() + 1,
    d = newDate.getUTCDate(),
    h = newDate.getUTCHours(),
    t = newDate.getUTCMinutes(),
    s = newDate.getUTCSeconds();


  var utcTime = '';
  if (isShowUTC) {
    if (timezone < 0) {
      utcTime = ' UTC' + minuszore(timezone) + '00';
    }
    else {
      utcTime = ' UTC+' + pluszore(timezone) + '00';
    }
  }

  return pluszore(y) + '-'
    + pluszore(m) + '-'
    + pluszore(d) + ' '
    + pluszore(h) + ':'
    + pluszore(t) + ':'
    + pluszore(s) + utcTime
}

// console.log(UTCToTime('1498122376','+3',true));
// ==> 2017-06-22 12:06:16 UTC+0300

// console.log(UTCToTime('1498122376'));
// ==> 2017-06-22 9:06:16 UTC+0000

export default {
  TimeToUTC,
  UTCToTime
}