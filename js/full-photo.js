import {createArrayComments} from './model-photos.js';

const dataComments = createArrayComments();

const fullScreenPhoto = document.querySelector('.big-picture');
const body = document.querySelector('body');

const IMG_WIDTH = 35;
const IMG_HEIGHT = 35;

// Обнуляю комментарии записанные ранее
const deleteComments = () => {
  const comments = fullScreenPhoto.querySelector('.social__comments');
  const items = comments.children;
  //console.log(items);
  if (items.length > 0) {
    for (let i = items.length; i > 0; i--) {
      //console.log(number);
      //console.log(items[0]);
      items[0].remove();
      //console.log(items);
    }
  }
  //console.log(items);
  return items;
};

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
// console.log(commentsPhoto.children);
const commentsPhotoToObject = Array.from(commentsPhoto);
// console.log(commentsPhotoToObject);

// Функция-шаблон отрисовки полноэкранного фото
const drawFullScreenPhoto = (photo) => {
  fullScreenPhoto.querySelector('.social__comment-count').classList.add('hidden');
  fullScreenPhoto.querySelector('.comments-loader').classList.add('hidden');
  fullScreenPhoto.classList.remove('hidden');
  body.classList.add('modal-open');

  fullScreenPhoto.querySelector('.big-picture__img img').src = photo.url;
  fullScreenPhoto.querySelector('.likes-count').textContent = '';
  fullScreenPhoto.querySelector('.likes-count').append(photo.likes);

  //console.log(fullScreenPhoto.querySelector('.comments-count').append(photo.comments.length));
  fullScreenPhoto.querySelector('.comments-count').append(photo.comments.length);  //  Не подставляется количество комментариев
  fullScreenPhoto.querySelector('.comments-count').append(`photo.${commentsPhoto}.length`);  //  Не подставляется количество комментариев
  fullScreenPhoto.querySelector('.comments-count').append(`photo.${commentsPhotoToObject}.length`);  //  Не подставляется количество комментариев

  fullScreenPhoto.querySelector('.social__caption').append(photo.description);

  deleteComments();
  // console.log(fullScreenPhoto.querySelector('.social__comments').replaceWith(photo.comments));
  // console.log(fullScreenPhoto.querySelector('.social__comments').replaceWith(commentsPhoto));
  // console.log(fullScreenPhoto.querySelector('.social__comments').replaceWith(`photo.${commentsPhotoToObject}`));
  fullScreenPhoto.querySelector('.social__comments').replaceWith(`photo.${commentsPhotoToObject}`); //  Не подставляется массив комментариев
  fullScreenPhoto.querySelector('.social__comments').replaceWith(`photo.${commentsPhoto}`); //  Не подставляется массив комментариев
  fullScreenPhoto.querySelector('.social__comments').replaceWith(commentsPhoto);  //  Не подставляется массив комментариев
  fullScreenPhoto.querySelector('.social__comments').replaceWith(photo.comments); //  Не подставляется массив комментариев
};

export {drawFullScreenPhoto, fullScreenPhoto, body};
