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
  console.log(isEscKeydown(evt));
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
          return heshtegSymbol.exec(currentHashtag) ? true : false; // Если не указывать "? true : false", то условие выполняется некорректно!!!
        }
      }
    };

    const isHeshtegLength = (val) => (
      val.length <= 5
    );

    // console.log(isHeshtegUnique(heshtegArray));
    // console.log(isHeshtegPattern(heshtegArray));
    // console.log(isHeshtegLength(heshtegArray));

    return isHeshtegUnique(heshtegArray) && isHeshtegPattern(heshtegArray) && isHeshtegLength(heshtegArray);
  };

  pristine.addValidator(hashtagsField, validateHeshtegsField, hashtegError);

  form.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    return isValid ? form.submit() : evt.preventDefault();

    // const isValid = pristine.validate();
    // if (isValid) {
    //   console.log('Mozhno otpravliat');
    //   form.submit();
    //   return true;
    // }
    // evt.preventDefault();
    // console.log('forma nevalidna - est oshibki');
    // //pristine.addError(hashtagsField, hashtegError);
    // return false;
  });
};

// Вариант 1
// document.addEventListener('keydown', (evt) => {
//   console.log(evt.target.addValidator);
//   if (isEscKeydown(evt) && pristine.validate(evt.target.addValidator)) {
//     //evt.preventDefault();
//     evt.stopPropagation();
//   }
// });

// Вариант 2
// document.addEventListener('keydown', (evt) => {
//   if (isEscKeydown(evt) && evt.target.addValidator) {
//     //evt.preventDefault();
//     evt.stopPropagation();
//   }
// }, false);

// Вариант 3
// const toEscFormDontClose = () => function (evt) {
//   evt.stopPropagation();
// };

// if (isEscKeydown && `hashtagsField${:active}`) {
//   document.addEventListener('keydown', toEscFormDontClose, false);
// }

// // Вариант 4
// const toEscFormDontClose = (evt) => {
//   evt.stopPropagation();
// };

// const activeHeshtegsField = document.activeElement;
// const activeCommentsField = document.activeElement;

// activeHeshtegsField.addEventListener('keydown', toEscFormDontClose, false);
// activeHeshtegsField.removeEventListener('keydown', toEscFormDontClose, false);
// activeCommentsField.addEventListener('keydown', toEscFormDontClose, false);
// activeCommentsField.removeEventListener('keydown', toEscFormDontClose, false);

// Вариант 5
// const toEscFormDontClose = (evt) => {
//   evt.stopPropagation();
// };

// const activeField = document.querySelector('.img-upload__text').activeElement;

// if (activeField) {
//   activeField.addEventListener('keydown', toEscFormDontClose, false);
//   activeField.removeEventListener('keydown', toEscFormDontClose, false);
// }

// Вариант 6
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
