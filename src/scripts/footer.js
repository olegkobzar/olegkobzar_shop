import builder from './builder';
require('./footer.css');

const footer = () => {
  const content = '<p>Easycode 2019 (c)</p>';

  return builder('footer', content, 'footer');
};

export { footer };