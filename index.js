var fs = require('fs');
var path = require('path');

var root = require.main ? path.dirname(require.main.filename) : process.cwd();
while (root !== '/' && !fs.existsSync(root + '/node_modules')) {
  root = path.dirname(root);
}

if (root === '/') {
  return console.error('can\'t find project root');
}

root += '/node_modules';

function find() {
  var modules = [];
  [].forEach.call(arguments, function (array) {
    array = array instanceof Array ? array : [array];
    var module = path.dirname(root);
    for (var i in array) {
      var x = array[i];
      module += '/node_modules';
      module = fs.existsSync(module + '/' + x) ? module + '/' + x :
        module !== root ? path.resolve(module, '../..') : root;
      if (module === root) {
        module = undefined;
        break;
      }
    }
    modules.push(module);
  });
  return arguments.length > 1 ? modules : modules[0];
}

module.exports = function (value) {
  if (value) {
    if (!value.endsWith('/')) {
      value += '/';
    }
    root = value + 'node_modules';
  }
  return find;
}
