const templateFragment = document.querySelector('#picture').content;
const templatePicture = templateFragment.querySelector('.picture');
const pictures = document.querySelector('.pictures');
console.log(pictures);

// Создание одного фото
const createPhoto = (xxx) => { // xxx - данные из model-photos.js
  const img = templatePicture.cloneNode(true);
  img.querySelector('.picture__img').src = xxx.url // xxx - данные из model-photos.js
  img.querySelector('.picture__comments').value = xxx.url // xxx - данные из model-photos.js
  img.querySelector('.picture__likes').value = xxx.url // xxx - данные из model-photos.js
  return img;
};

// Создание массива фотографий
const createArrayPhotos = (yyy) => { // yyy - данные из функции createArrayPhotos из model-photos.js
  const fragment = document.createDocumentFragment();
  for(let i = 1; i <= yyy.length; i++) {
    const newPhoto = createPhoto(i);
    fragment.appendChild(newPhoto);
  }
  pictures.appendChild(fragment);
};

createArrayPhotos();
