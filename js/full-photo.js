import {createArrayComments} from './model-photos.js';

const dataComments = createArrayComments();

const fullScreenPhoto = document.querySelector('.big-picture');
const commentsCurrentPhoto = fullScreenPhoto.querySelector('.big-picture__social');
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

const commentsPhoto = insertComments(dataComments);

// Функция-шаблон отрисовки полноэкранного фото
const drawFullScreenPhoto = (photo) => {
  fullScreenPhoto.querySelector('.social__comment-count').classList.add('hidden');
  fullScreenPhoto.querySelector('.comments-loader').classList.add('hidden');
  fullScreenPhoto.classList.remove('hidden');
  body.classList.add('modal-open');

  fullScreenPhoto.querySelector('.big-picture__img img').src = photo.url;
  fullScreenPhoto.querySelector('.likes-count').textContent = '';
  fullScreenPhoto.querySelector('.likes-count').append(photo.likes);
  fullScreenPhoto.querySelector('.comments-count').append(`photo.${commentsPhoto}.length`);
  fullScreenPhoto.querySelector('.social__caption').append(photo.description);
  fullScreenPhoto.querySelector('.social__comments').append('');

  fullScreenPhoto.querySelector('.social__comments').append(commentsPhoto); // появляется ошибка - Uncaught DOMException: Element.append: The new child is an ancestor of the parent

  //fullScreenPhoto.querySelector('.big-picture__social').append(commentsPhoto); // блок для написания своего комментария (social__footer) становится выше списка комментариев (social__comment)
};

export {drawFullScreenPhoto, fullScreenPhoto, body};
