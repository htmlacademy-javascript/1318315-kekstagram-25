import {createArrayPhotos} from './model-photos.js';

const data = createArrayPhotos();

const templateFragment = document.querySelector('#picture').content;
const templatePicture = templateFragment.querySelector('.picture');
const pictures = document.querySelector('.pictures');

// Создание одного фото
const createPhoto = (photo) => {
  const img = templatePicture.cloneNode(true);
  img.querySelector('.picture__img').src = photo.url;
  img.querySelector('.picture__comments').textContent = photo.comments.length;
  img.querySelector('.picture__likes').textContent = photo.likes;
  return img;
};

// Создание массива фотографий
const drawArrayPhotos = (objects) => {
  for(let i = 0; i < objects.length; i++) {
    const fragment = document.createDocumentFragment();
    const newPhoto = createPhoto(objects[i]);
    fragment.appendChild(newPhoto);
    pictures.appendChild(fragment);
  }
  return pictures; // может быть стоит убрать эту строку?
};

export {data, drawArrayPhotos};
