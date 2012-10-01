// these have to match up with the cases in `local` and `utc`
var tokens = ['DDth', 'DD', 'Dth', 'D', 'MM', 'M', 'YYYY', 'YY', 'hh', 'h',
              'mm', 'm', 'ss', 's', 'mmms', 'ms', 'Weekday', 'Wkd', 'Month',
              'Mnth', 'AM', 'am', 'zzzz', 'zz:zz']
  , match = new RegExp('\\b(' + tokens.join('|') + ')\\b', 'g');


// prints the Date object `t` according to `format`
function local(format, t) {
  var h, e = module.exports;
  t = t || new Date();

  return format.replace(match, function(match) {
    switch (match) {
      case 'DDth':    return e.zerofill(e.suffix(t.getDate()));
      case 'DD':      return e.zerofill(t.getDate(), 2);
      case 'Dth':     return e.suffix(t.getDate());
      case 'D':       return t.getDate();
      case 'MM':      return e.zerofill(t.getMonth() + 1, 2);
      case 'M':       return t.getMonth() + 1;
      case 'YYYY':    return t.getFullYear();
      case 'YY':      return ('' + t.getFullYear()).substring(2);

      case 'hh':      return e.zerofill(t.getHours(), 2);
      case 'h':       return (h = t.getHours()) === 0 ? '12' : h % 12;
      case 'mm':      return e.zerofill(t.getMinutes(), 2);
      case 'm':       return t.getMinutes();
      case 'ss':      return e.zerofill(t.getSeconds(), 2);
      case 's':       return t.getSeconds();
      case 'mmms':    return e.zerofill(t.getMilliseconds(), 3);
      case 'ms':      return t.getMilliseconds();

      case 'Weekday': return e.longWeekday[t.getDay()];
      case 'Wkd':     return e.shortWeekday[t.getDay()];
      case 'Month':   return e.longMonth[t.getMonth()];
      case 'Mnth':    return e.shortMonth[t.getMonth()];
      case 'AM':      return t.getHours() < 12 ? 'AM' : 'PM';
      case 'am':      return t.getHours() < 12 ? 'am' : 'pm';

      case 'zzzz':    return e.timezone(t.getTimezoneOffset(), false);
      case 'zz:zz':   return e.timezone(t.getTimezoneOffset(), true);
    }
  });
}


// works just like `local`, but the corresponding UTC values are used instead
function utc(format, t) {
  var h, e = module.exports;
  t = t || new Date();

  return format.replace(match, function(match) {
    switch (match) {
      case 'DDth':    return e.zerofill(e.suffix(t.getUTCDate()));
      case 'DD':      return e.zerofill(t.getUTCDate(), 2);
      case 'Dth':     return e.suffix(t.getUTCDate());
      case 'D':       return t.getUTCDate();
      case 'MM':      return e.zerofill(t.getUTCMonth() + 1, 2);
      case 'M':       return t.getUTCMonth() + 1;
      case 'YYYY':    return t.getUTCFullYear();
      case 'YY':      return ('' + t.getUTCFullYear()).substring(2);

      case 'hh':      return e.zerofill(t.getUTCHours(), 2);
      case 'h':       return (h = t.getUTCHours()) === 0 ? '12' : h % 12;
      case 'mm':      return e.zerofill(t.getUTCMinutes(), 2);
      case 'm':       return t.getUTCMinutes();
      case 'ss':      return e.zerofill(t.getUTCSeconds(), 2);
      case 's':       return t.getUTCSeconds();
      case 'mmms':    return e.zerofill(t.getUTCMilliseconds(), 3);
      case 'ms':      return t.getUTCMilliseconds();

      case 'Weekday': return e.longWeekday[t.getUTCDay()];
      case 'Wkd':     return e.shortWeekday[t.getUTCDay()];
      case 'Month':   return e.longMonth[t.getUTCMonth()];
      case 'Mnth':    return e.shortMonth[t.getUTCMonth()];
      case 'AM':      return t.getUTCHours() < 12 ? 'AM' : 'PM';
      case 'am':      return t.getUTCHours() < 12 ? 'am' : 'pm';

      case 'zzzz':    return '+0000';
      case 'zz:zz':   return '+00:00';
    }
  });
}


// export `local` and `utc`
module.exports = local;
local.utc = utc;


// prepends `num` with zeroes until it reaches `min` digits
function zerofill(num, min) {
  var out = '' + num;
  while (out.length < min) {
    out = '0' + out;
  }
  return out;
}


// append the appropriate ordinal number suffix
function suffix(n) {
  switch (n) {
    case 11: return '11th';
    case 12: return '12th';
    case 13: return '13th';
  }

  switch (n % 10) {
    case 1:  return n + 'st';
    case 2:  return n + 'nd';
    case 3:  return n + 'rd';
    default: return n + 'th';
  }
}


// turns a timezone offset into either "+0123" or "+01:23"
function timezone(offset, colon) {
  var h, m
    , s = '-'
    , e = module.exports;

  if (offset < 0) {
    s = '+';
    offset = -offset;
  }

  h = e.zerofill(Math.floor(offset / 60), 2);
  m = e.zerofill(Math.floor(offset % 60), 2);

  return s + (colon ? ('' + h + ':' + m) : ('' + h + e.zerofill(m)));
}


// export number formatting functions
module.exports.suffix = suffix;
module.exports.zerofill = zerofill;
module.exports.timezone = timezone;


// export weekday/month localisation options
module.exports.shortWeekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
module.exports.longWeekday  = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                               'Thursday', 'Friday', 'Saturday'];
module.exports.shortMonth   = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
                               'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
module.exports.longMonth    = ['January', 'February', 'March', 'April', 'May',
                               'June', 'July', 'August', 'September', 'October',
                               'November', 'December'];
