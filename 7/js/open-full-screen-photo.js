import {data, drawArrayPhotos} from './rendering-photos.js';
import {drawFullScreenPhoto, fullScreenPhoto, body} from './full-photo.js';
import {isEscKeydown} from './utils.js';

const sectionPictures = drawArrayPhotos(data);
const photos = Array.from(sectionPictures.querySelectorAll('.picture'));
const close = fullScreenPhoto.querySelector('.big-picture__cancel');

photos.forEach((photo) => {
  photo.addEventListener('click', (evt) => {
    drawFullScreenPhoto(data[evt.currentTarget.id]);
  });
});

// Закрытие полноэкранного фото
const closePhoto = () => {
  fullScreenPhoto.querySelector('.social__comment-count').classList.remove('hidden');
  fullScreenPhoto.querySelector('.comments-loader').classList.remove('hidden');
  fullScreenPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
};

const toCloseFullScreen = () => function (evt) {
  evt.preventDefault();
  closePhoto();
};

const toEscFullScreen = () => function (evt) {
  if (isEscKeydown(evt)) {
    evt.preventDefault();
    closePhoto();
  }
};

close.addEventListener('click', toCloseFullScreen());
close.removeEventListener('click', toCloseFullScreen());

document.addEventListener('keydown', toEscFullScreen());
document.removeEventListener('keydown', toEscFullScreen());
