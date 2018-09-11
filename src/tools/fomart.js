export default function format(format) {
  var args = Array.prototype.slice.call(arguments, 1, arguments.length);
  if (format) {
    return format.replace(/%s/ig, function (original) {
      var replacement = args.shift();
      if (undefined === replacement) {
        return original;
      }
      return replacement
    });
  }
  return '';
}

//format(' %s , %s !','hello','world')  => 'hello , world !'

//format(' %s , %s ! %s','hello','world','javascript')  => 'hello , world ! javascript'