const test = require('node:test');
const assert = require('node:assert/strict');
const cases = require('./cases.js');
const rules = require('../rules.json');

// Mirrors declarativeNetRequest for a main-frame request: the highest-priority
// matching redirect rule replaces the first match of its regexFilter with its
// regexSubstitution (\1 back-references). Filters are case-insensitive unless
// the rule sets isUrlFilterCaseSensitive, as in Chrome.
const filterOf = ({ condition }) =>
  new RegExp(condition.regexFilter, condition.isUrlFilterCaseSensitive ? '' : 'i');

function applyRules(href) {
  const matching = rules
    .filter((r) => r.action.type === 'redirect' && r.condition.resourceTypes.includes('main_frame'))
    .filter((r) => filterOf(r).test(href))
    .sort((a, b) => (b.priority ?? 1) - (a.priority ?? 1));
  if (matching.length === 0) return null;
  const rule = matching[0];
  // Turn DNR's \1 into JS's $1 ('$$' is a literal '$' in a replacement string).
  const substitution = rule.action.redirect.regexSubstitution.replace(/\\(\d)/g, '$$$1');
  return href.replace(filterOf(rule), substitution);
}

for (const { name, from, to } of cases) {
  test(`redirect rules: ${name}`, () => {
    assert.equal(applyRules(from), to);
  });
}
