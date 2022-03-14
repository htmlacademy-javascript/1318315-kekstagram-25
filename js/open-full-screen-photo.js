//import {drawArrayPhotos} from './rendering-photos.js';
import {drawFullScreenPhoto} from './full-photo.js';
//import {createArrayPhotos} from './model-photos.js';
const photos = document.querySelector('.pictures');
//const photo = photos.children;
//const data = createArrayPhotos();
//const photos = drawArrayPhotos(data);

// for (let i = 0; i < data.length; i++) {
//   console.log(data[i]);
//   data[i].addEventListener('click', function() {
//     return drawFullScreenPhoto(data[i])});
// };

// photo.addEventListener('click', function(evt) {
//   console.log('Клик произошел');
//   return evt.target = drawFullScreenPhoto(photo);
// });

photos.forEach((photo) => {
  drawFullScreenPhoto(photo);
});
