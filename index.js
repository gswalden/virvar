'use strict';

function virvar(name, required, type) {
  var val = process.env[name];
  if (val == null) {
    if (required) throw new Error('Environment variable must be defined: ' + name);
  } else if (type) {
    switch (type) {
      case 'a':
        return val.split(',');
      case 'b':
        val = val.toLowerCase();
        return val == 'true' || val == '1' || val == 'yes';
      case 'f':
        return parseFloat(val);
      case 'i':
        return parseInt(val, 10);
      case 'j':
        return JSON.parse(val);
    }
  }
  return val;
}

module.exports = virvar;
