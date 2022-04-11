import {isEscKeydown} from './utils.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const openFile = form.querySelector('#upload-file');
const imageUpload = form.querySelector('.img-upload__overlay');
const close = form.querySelector('#upload-cancel');
const hashtagsField = form.querySelector('.text__hashtags');
const commentsField = form.querySelector('.text__description');
const hashtegError = 'Должно быть минимум два символа. Максимальная длина одного #ХэшТега - 20 символов, можно написать самое большее пять #ХэшТегов. Используйте кириллицу, латиницу и цифры.';

// Открытие формы для подстановки своего фото
const openFormUpload = () => {
  imageUpload.classList.remove('hidden');
  body.classList.add('modal-open');
};

openFile.addEventListener('change', () => (openFormUpload()));
openFile.removeEventListener('change', () => (openFormUpload()));

// Закрытие формы по подстановке своего фото
const closeFormUpload = () => {
  imageUpload.classList.add('hidden');
  body.classList.remove('modal-open');
  openFile.value = '';
  hashtagsField.value = '';
  commentsField.value = '';
};

close.addEventListener('click', () => (closeFormUpload()));
close.removeEventListener('click', () => (closeFormUpload()));

const toEscFormClose = (evt) => {
  if (isEscKeydown(evt)) {
    evt.preventDefault();
    closeFormUpload();
  }
};

document.addEventListener('keydown', toEscFormClose());
document.removeEventListener('keydown', toEscFormClose());

// Валидация
const heshtegSymbol = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/im;

window.onload = function () {
  const pristine = new Pristine(form);

  const validateHeshtegsField = (value) => {
    const heshtegArray = value.split(/\s/); // разбивает строку на массив

    const isHeshtegUnique = (val) => (
      val.length === new Set(val.map((text) => (text.toLowerCase()))).size
    );

    const isHeshtegPattern = () => {
      if (heshtegArray.length === 1) {  // Для пустого поля хэштегов
        return true;
      } else {
        for (let i = 0; i < heshtegArray.length; i++) {
          const currentHashtag = heshtegArray[i];
          if (heshtegSymbol.exec(currentHashtag)) {
            return true;
          }
          return false;
        }
      }
    };

    const isHeshtegLength = (val) => (
      val.length <= 5
    );

    return isHeshtegUnique(heshtegArray) && isHeshtegPattern(heshtegArray) && isHeshtegLength(heshtegArray);
  };

  pristine.addValidator(hashtagsField, validateHeshtegsField, hashtegError);

  form.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    return isValid ? form.submit() : evt.preventDefault();
  });
};

// Отмена закрытия формы при нажатии на Esc
const toEscFormDontClose = (evt) => {
  evt.stopPropagation();
};

if (hashtagsField.activeElement) {
  hashtagsField.activeElement.addEventListener('keydown', toEscFormDontClose, false);
  hashtagsField.activeElement.removeEventListener('keydown', toEscFormDontClose, false);
}

if (commentsField.activeElement) {
  commentsField.activeElement.addEventListener('keydown', toEscFormDontClose, false);
  commentsField.activeElement.removeEventListener('keydown', toEscFormDontClose, false);
}
