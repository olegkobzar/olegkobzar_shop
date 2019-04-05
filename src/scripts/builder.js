const $ = require('jquery');

const builder = (tag = 'div', content = '', className = 'box') => {
  const element = $(`<${tag} />`);
  
  element.addClass(className);
  element.html(content);

  return element;
};

export default builder;
