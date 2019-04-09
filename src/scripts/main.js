import builder from './builder';
require('./main.scss');

const main = () => {
  const currentTime = new Date().toLocaleString();
  const content = `<h1>Hello, my name is h1</h1>
                  <time>Current time is: ${currentTime}`;

  return builder('main', content, 'main');
};

export { main }
