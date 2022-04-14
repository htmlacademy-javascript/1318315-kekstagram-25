const fullScreenPhoto = document.querySelector('.big-picture');
const body = document.querySelector('body');
const loaderComments = document.querySelector('.social__comment-count');

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
  commentsArray.textContent = '';

  for (let i = 0; i < comments.length; i++) {
    const newComment = insertComment(comments[i]);
    commentsArray.appendChild(newComment);
  }
  return commentsArray;
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
  fullScreenPhoto.querySelector('.social__caption').append(photo.description);
  fullScreenPhoto.querySelector('.comments-count').textContent = photo.comments.length;

  let n = 0;
  const currentComments = insertComments(photo.comments.slice(n, n += 5));

  loaderComments.addEventListener('click', () => {
    currentComments.concat(currentComments);
    return currentComments;
  });

  fullScreenPhoto.querySelector('.social__comment-count').textContent = `${photo.comments.slice(n, n += 5).length} из комментариев`;

  fullScreenPhoto.querySelector('.social__comments').replaceWith(currentComments);
};

export {drawFullScreenPhoto, fullScreenPhoto, body};
