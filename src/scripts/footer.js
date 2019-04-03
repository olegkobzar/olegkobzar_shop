const builder = require('./builder');

module.exports = () => {
  const content = '<p>Easycode 2019 (c)</p>';

  return builder('footer', content, 'footer');
};
