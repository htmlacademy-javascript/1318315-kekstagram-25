const fullScreenPhoto = document.querySelector('.big-picture');
const body = document.querySelector('body');
//const countComments = document.querySelector('.social__comment-count');
const loaderComments = document.querySelector('.comments-loader');
const commentsArray = fullScreenPhoto.querySelector('.social__comments');

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

// Функция для вставки блока комментариев
const appendComments = (comments) => {
  const documentFragment = document.createDocumentFragment();
  for (let i = 0; i < comments.length; i++) {
    const newComment = insertComment(comments[i]);
    documentFragment.appendChild(newComment);
  }
  return documentFragment;
};

let n = 0;
// Функция по подстановке комментариев
const insertComments = (comments) => {
  commentsArray.textContent = '';
  let fragment;
  const currentComments = comments.slice(n, n += 5);
  fragment = appendComments(currentComments);
  commentsArray.appendChild(fragment);
  fullScreenPhoto.querySelector('.number-displayed-comments').textContent = n;

  loaderComments.addEventListener('click', () => {
    if (n < comments.length) {
      const nextComments = comments.slice(n, n += 5);
      fragment = appendComments(nextComments);
      commentsArray.appendChild(fragment);
      if (n >= comments.length) {
        n = comments.length;
        loaderComments.classList.add('hidden');
      }
      fullScreenPhoto.querySelector('.number-displayed-comments').textContent = n;
    }
  });

  if (n < 5) {
    const littleComments = comments.slice(n, comments.length);
    fragment = appendComments(littleComments);
    commentsArray.appendChild(fragment);
    n = comments.length;
    fullScreenPhoto.querySelector('.number-displayed-comments').textContent = n;
    loaderComments.classList.add('hidden');
  }
};

// Функция-шаблон отрисовки полноэкранного фото
const drawFullScreenPhoto = (photo) => {
  fullScreenPhoto.querySelector('.social__comment-count').classList.remove('hidden');
  fullScreenPhoto.querySelector('.comments-loader').classList.remove('hidden');
  fullScreenPhoto.classList.remove('hidden');
  body.classList.add('modal-open');

  fullScreenPhoto.querySelector('.big-picture__img img').src = photo.url;
  fullScreenPhoto.querySelector('.likes-count').textContent = '';
  fullScreenPhoto.querySelector('.likes-count').append(photo.likes);
  fullScreenPhoto.querySelector('.social__caption').textContent = '';
  fullScreenPhoto.querySelector('.social__caption').append(photo.description);
  fullScreenPhoto.querySelector('.comments-count').textContent = photo.comments.length;

  insertComments(photo.comments);
};

export {drawFullScreenPhoto, fullScreenPhoto, body};
