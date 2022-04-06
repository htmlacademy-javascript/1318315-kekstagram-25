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

openFile.addEventListener('change', () => {openFormUpload()});
openFile.removeEventListener('change', () => {openFormUpload()});

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
  if (form.querySelector('.text__hashtags input:focus') && isEscKeydown) {
    evt.stopPropagation();
  }
});

// Валидация
const heshtegSymbol = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/im;// i -хештеги нечувствительны к регистру, m - поиск по всей строке.

window.onload = function () {
  const pristine = new Pristine(form);
  // , {
  // classTo: 'img-upload__text',
  // errorTextParent: 'img-upload__text',
  //   errorTextClass: 'img-upload__text-error', // Этого класса нет в разметке и нет в стилях
  // });

  const validateHeshtegsField = (value) => {
    const heshtegArray = value.split(/\s/, 5); // разбивает строку на массив, показывает 5шт
    //
    // for (let i = 0; i < heshtegArray.length; i++) {
    //   if (!heshtegSymbol.test(heshtegArray[i])) {
    //     return console.log('error - heshteg napisan ne pravilno'); // Нужно передать Пристине сообщение об ошибке!!!
    //   } else {
    //     return console.log('ok - heshteg napisan pravilno'); // Нужно выполнить следующую проверку.
    //   }
    // }

    for (let i = 0; i < heshtegArray.length; i++) {
      const currentHeshteg = heshtegArray[i];
      console.log(value.exec());
      // if (value.exec(currentHeshteg)) {
      //   console.log(currentHeshteg);
      //   return console.log('error - heshteg povtoriaetsia');
      // } else {
      //   console.log(currentHeshteg);
      //   return console.log('ok - heshteg ne povtoriaetsia'); // Нужно выполнить следующую проверку.
      // }
    }
  };

  // ====================================================================
  // хэштеги разделены пробелами #cat #C0Бака #F1ш #СЛоН35 #2птицЫ #DOG
  // хэштеги не должны повторяться #C0Бака #C0Бака #C0Бака #C0Бака
  // не больше 5 хэштегов
  // ====================================================================

  pristine.addValidator(hashtagsField, validateHeshtegsField, hashtegError); // удалить за ненадобностью, Пристин сама все проверяет

  // const validateCommentsField = (value) => value.length <= 140; // удалить за ненадобностью, Пристин сама все проверяет
  // pristine.addValidator(commentsField, validateCommentsField, 'До 140 символов'); // удалить за ненадобностью, Пристин сама все проверяет

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
