import {createArrayComments} from './model-photos.js';
import {createArrayPhotos} from './model-photos.js';
import {isEscKeydown} from './utils.js';

const dataComments = createArrayComments();
const dataPotos = createArrayPhotos();

const fullScreenPhoto = document.querySelector('.big-picture');
const body = document.querySelector('body');
const close = fullScreenPhoto.querySelector('.big-picture__cancel');

// Функция по подстановке комментариев
const insertComments = (comment) => {
  const comments = fullScreenPhoto.querySelector('.social__comments');

  const newComment = document.createElement('li');
  newComment.classList.add('social__comment');

  const img = newComment.createElement('img');
  img.classList.add('social__picture');

  img.src = comment.avatar;
  img.alt = comment.name;
  img.width = 35;
  img.height = 35;

  const text = newComment.createElement('p');
  text.classList.add('social__text');
  text.textContent = comment.messagge;

  comments.appendChild(newComment);

  return comments;
};

// Функция-шаблон отрисовки полноэкранного фото
const drawFullScreenPhoto = (photo) => {
  fullScreenPhoto.classList.remove('hidden');

  fullScreenPhoto.querySelector('.big-picture__img').src = photo.url;
  fullScreenPhoto.querySelector('.likes-count').textContent = photo.likes;
  fullScreenPhoto.querySelector('.comments-count').textContent = photo.comments.length;
  fullScreenPhoto.querySelector('.social__comments').textContent = insertComments(dataComments);
  fullScreenPhoto.querySelector('.social__caption').textContent = photo.description;

  fullScreenPhoto.querySelector('.social__comment-count').classList.add('hidden');
  fullScreenPhoto.querySelector('.comments-loader').classList.add('hidden');

  body.classList.add('modal-open');
};

drawFullScreenPhoto(dataPotos);

// Закрытие полноэкранного фото
const onFullScreen = (evt) => {
  evt.preventDefault();
  body.classList.remove('modal-open');
};

close.addEventListener('click', onFullScreen());
close.removeEventListener('click', onFullScreen());

document.addEventListener(isEscKeydown, onFullScreen());
document.removeEventListener(isEscKeydown, onFullScreen());

export {drawFullScreenPhoto};
