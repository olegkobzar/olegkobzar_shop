const $ = require('jquery');
import './app.scss';

import { header } from './scripts/header';
import { main } from './scripts/main';
import { footer } from './scripts/footer';

$('body').append(header(), main(), footer());

// import('./scripts/footer')
//   .then(module => {
//     $('body').append(module.footer());
//   })
