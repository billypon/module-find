var assert = require('assert');
var path = require('path');

var cwd = process.cwd();
var find = require('..')(cwd);
cwd += '/node_modules/';

it('undefined', function () {
  assert.equal(undefined, find('fake-module'));
});

it('parent', function () {
  assert.equal(cwd + 'dependency-parent', find('dependency-parent'));
});

it('parent && child', function () {
  var dependencies = ['dependency-parent', 'dependency-child'];
  find.apply(this, dependencies).forEach(function (x, i) {
    assert.equal(cwd + dependencies[i], x);
  });
});

it('child of parent', function () {
  assert.equal(cwd + 'dependency-parent/node_modules/dependency-child', find(['dependency-parent', 'dependency-child']));
});

it('undefine child', function () {
  assert.equal(undefined, find(['dependency-parent', 'fake-child']));
});
