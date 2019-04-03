const builder = require('./builder');

module.exports = () => {
  const content = '<a href="#">Logo</a>';

  return builder('header', content, 'header');
};
