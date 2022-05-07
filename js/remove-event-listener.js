import {closeForm, toCloseForm, toEscCloseForm} from './form-image-upload.js';
import {closePicture, toCloseFullScreen, toEscFullScreen} from './open-full-screen-photo.js';
import {scaleSmaller, scaleMore, effects, toEnlargePhoto, toReducePhoto, selectedEffect} from './effects-photo.js';

const toDeleteCloseFormEventListeners = () => {
  closeForm.removeEventListener('click', toCloseForm);
  document.removeEventListener('keydown', toEscCloseForm);
  scaleSmaller.removeEventListener('click', toEnlargePhoto);
  scaleMore.removeEventListener('click', toReducePhoto);
  effects.removeEventListener('change', selectedEffect);
};

const toDeleteCloseFullScreenEventListeners = () => {
  closePicture.removeEventListener('click', toCloseFullScreen);
  document.removeEventListener('keydown', toEscFullScreen);
}; // Нужно будет перенести вдругой модуль, когда будет фильтрация и перерисовка фото.

export {toDeleteCloseFormEventListeners, toDeleteCloseFullScreenEventListeners};
