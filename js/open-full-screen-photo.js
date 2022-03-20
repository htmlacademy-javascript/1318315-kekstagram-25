import {data, drawArrayPhotos} from './rendering-photos.js';
import {drawFullScreenPhoto} from './full-photo.js';
//console.log(data);   // определяется
const sectionPictures = drawArrayPhotos(data);
//console.log(sectionPictures);   // определяется
const photos = Array.from(sectionPictures.querySelectorAll('.picture'));
//console.log(photos);   // определяется
photos.forEach((photo) => {
  photo.addEventListener('click', function (evt) {
    // console.log(evt.currentTarget);   // определяется
    // console.log(data[evt.currentTarget.dataset.id]);  // не определяется!!!
    drawFullScreenPhoto(data[evt.currentTarget.dataset.id]);
  });
});
