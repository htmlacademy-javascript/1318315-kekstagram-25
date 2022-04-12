import {isEscKeydown} from './utils.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const openFile = form.querySelector('#upload-file');
const imageUpload = form.querySelector('.img-upload__overlay');
const close = form.querySelector('#upload-cancel');
const hashtagsField = form.querySelector('.text__hashtags');
const commentsField = form.querySelector('.text__description');
const hashtagError = 'Должно быть минимум два символа. Максимальная длина одного #ХэшТега - 20 символов, можно написать самое большее пять #ХэшТегов. Используйте кириллицу, латиницу и цифры.';

// Открытие формы для подстановки своего фото
const openFormUpload = () => {
  imageUpload.classList.remove('hidden');
  body.classList.add('modal-open');
};

const toOpenForm = () => {
  openFormUpload();
  toCreateEventListeners();
};

openFile.addEventListener('change', toOpenForm);

// Закрытие формы по подстановке своего фото
const closeFormUpload = () => {
  imageUpload.classList.add('hidden');
  body.classList.remove('modal-open');
  openFile.value = '';
  hashtagsField.value = '';
  commentsField.value = '';
};

const toCloseForm = () => function () {
  closeFormUpload();
  toDeleteEventListeners();
};

//close.addEventListener('click', closeFormUpload);

const toEscCloseForm = () => function (evt) {
  if (isEscKeydown(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagsField || document.activeElement === commentsField) {
      evt.stopPropagation();
    } else {
      toCloseForm();
    }
  }
};

//document.addEventListener('keydown', toEscCloseForm);

function toCreateEventListeners () {
  close.addEventListener('click', closeFormUpload);
  document.addEventListener('keydown', toEscCloseForm);
}

function toDeleteEventListeners () {
  openFile.removeEventListener('change', openFormUpload);
  close.removeEventListener('click', toCloseForm);
  document.removeEventListener('keydown', toEscCloseForm);
}

// Валидация
const hashtagSymbol = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/im;

window.onload = function () {
  const pristine = new Pristine(form);

  const validateHashtagsField = (value) => {
    const hashtagArray = value.split(/\s/); // разбивает строку на массив

    const isHashtagUnique = (val) => (
      val.length === new Set(val.map((text) => (text.toLowerCase()))).size
    );

    const isHashtagPattern = () => {
      if (hashtagArray.length === 1) {  // Для пустого поля хэштегов
        return true;
      } else {
        for (let i = 0; i < hashtagArray.length; i++) {
          const currentHashtag = hashtagArray[i];
          if (hashtagSymbol.exec(currentHashtag)) {
            return true;
          }
          return false;
          //return hashtagSymbol.exec(currentHashtag); // В такой форме записи функция возвращает не тот результат, который нужен
        }
      }
    };

    const isHashtagLength = (val) => (
      val.length <= 5
    );

    return isHashtagUnique(hashtagArray) && isHashtagPattern(hashtagArray) && isHashtagLength(hashtagArray);
  };

  pristine.addValidator(hashtagsField, validateHashtagsField, hashtagError);

  form.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    return isValid ? form.submit() : evt.preventDefault();
  });
};
