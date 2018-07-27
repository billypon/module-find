var fs = require('fs');
var path = require('path');

module.exports = function (root) {
  if (root === true) {
    root = path.dirname(require.main.filename);
  } else if (root) {
    if (root.endsWith('/')) {
      root = root.substr(0, root.length - 1);
    }
  } else {
    root = process.cwd();
  }

  var origin = root;
  while (!fs.existsSync(root + '/node_modules')) {
    root = path.dirname(root);
    if (root === '/') {
      throw {message: 'can\'t find project root', path: origin};
    }
  }

  root += '/node_modules';

  return function () {
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
}
