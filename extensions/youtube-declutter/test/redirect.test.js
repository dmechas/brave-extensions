const test = require('node:test');
const assert = require('node:assert/strict');
const cases = require('./cases.js');
const { redirectTarget } = require('../redirect.js');

for (const { name, from, to } of cases) {
  test(`redirect function: ${name}`, () => {
    assert.equal(redirectTarget(from), to);
  });
}
