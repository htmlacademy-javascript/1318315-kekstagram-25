import {isEscKeydown} from './utils.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const open = form.querySelector('#upload-file');
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

open.addEventListener('click', () => {openFormUpload()});
open.removeEventListener('click', () => {openFormUpload()});

// Закрытие формы по подстановке своего фото
const closeFormUpload = () => {
  imageUpload.classList.add('hidden');
  body.classList.remove('modal-open');
  open.value = '';
  hashtagsField.value = '';
  commentsField.value = '';
};

close.addEventListener('click', () => {closeFormUpload()});
close.removeEventListener('click', () => {closeFormUpload()});

const toEscFormClose = () => function (evt) {
  if (isEscKeydown(evt)) {
    evt.preventDefault();
    closeFormUpload();
  }
};

document.addEventListener('keydown', toEscFormClose());
document.removeEventListener('keydown', toEscFormClose());

document.addEventListener('keydown', (evt) => {
  if (form.querySelector('.img-upload fieldset:focus')) {
    if (isEscKeydown) {
      evt.stopPropagation();
    }
  }
});

// Валидация
const heshtegSymbol = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/im;

window.onload = function () {
  const pristine = new Pristine(form);
  // , {
  // classTo: 'img-upload__text',
  // errorTextParent: 'img-upload__text',
  //   errorTextClass: 'img-upload__text-error', // Этого класса нет в разметке и нет в стилях
  // });

  const validateHeshtegsField = (value) => {
    const heshtegArray = value.split(/\s/, 5); // разбивает строку на массив, показывает 5шт
    // for (let i = 0; i < heshtegArray.length; i++) {
    //   if (!heshtegSymbol.test(heshtegArray[i])) {
    //     console.log(heshtegSymbol.test(heshtegArray[i]));
    //     console.log('error');
    //   } else {
    //     console.log('ok');
    //   }
    // }

    let i = 0;
    while (i < heshtegArray.length) {
      if (!heshtegSymbol.test(heshtegArray[i])) {
        console.log('error');
        break;
      }
      console.log('ok');
    }
    console.log(heshtegArray);

    heshtegSymbol.test(value);// i -хештеги нечувствительны к регистру, m - поиск по всей строке.

    //value.split(heshtegSymbol);
    //value.match(heshtegSymbol);

    // console.log(heshtegSymbol.test(value));
    //console.log(heshtegSymbol.match(value));
  };

  // хэштеги разделены пробелами #cat #DOG #F1ш #СЛоН35 #2птицЫ
  // хэштеги не должны повторяться
  // не больше 5 хэштегов

  pristine.addValidator(hashtagsField, validateHeshtegsField, hashtegError);

  const validateCommentsField = (value) => value.length <= 140;

  pristine.addValidator(commentsField, validateCommentsField, 'До 140 символов');

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      console.log('Mozhno otpravliat');
    } else {
      console.log('forma nevalidna - est oshibki');
    }
  });
};
// const cancellation = (evt) => {
//   evt.stopPropagation();
// };

//hashtagsField.addEventListener('active', (evt) => evt.stopPropagation());
// commentsField.addEventListener('focus', cancellation());
