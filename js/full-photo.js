import {createArrayComments} from './model-photos.js';

const dataComments = createArrayComments();

const fullScreenPhoto = document.querySelector('.big-picture');
const body = document.querySelector('body');

const IMG_WIDTH = 35;
const IMG_HEIGHT = 35;

// Подстановка одного комментария
const insertComment = (object) => {
  const newComment = document.createElement('li');
  newComment.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');

  img.src = object.avatar;
  img.alt = object.name;
  img.width = IMG_WIDTH;
  img.height = IMG_HEIGHT;
  newComment.appendChild(img);

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = object.messagge;
  newComment.appendChild(text);

  return newComment;
};

// Функция по подстановке комментариев
const insertComments = (comments) => {
  const commentsArray = fullScreenPhoto.querySelector('.social__comments');
  for (let i = 0; i < comments.length; i++) {
    const newComment = insertComment(comments[i]);
    commentsArray.appendChild(newComment);
  }
  return commentsArray;
};

// Функция-шаблон отрисовки полноэкранного фото
const drawFullScreenPhoto = (photo) => {
  fullScreenPhoto.querySelector('.social__comment-count').classList.add('hidden');
  fullScreenPhoto.querySelector('.comments-loader').classList.add('hidden');
  fullScreenPhoto.classList.remove('hidden');
  body.classList.add('modal-open');
  return function () {  //  callback
    fullScreenPhoto.querySelector('.big-picture__img').src = photo.url;
    fullScreenPhoto.querySelector('.likes-count').textContent = photo.likes;
    fullScreenPhoto.querySelector('.comments-count').textContent = `photo.${insertComments(dataComments)}.length`;
    fullScreenPhoto.querySelector('.social__comments').textContent = insertComments(dataComments);
    fullScreenPhoto.querySelector('.social__caption').textContent = photo.description;
  };
};

export {drawFullScreenPhoto, fullScreenPhoto, body};
