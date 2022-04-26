const STEP_VALUE = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const STEP_SCALE = 0.25;
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleMore = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const boxPhotoPreview = document.querySelector('.img-upload__preview');
const photoPreview = document.querySelector('.img-upload__preview img');
const effects = document.querySelector('.effects__list');
const slider = document.querySelector('.img-upload__effect-level');
const sliderControl = document.querySelector('.effect-level__slider');
const levelEffect = document.querySelector('.effect-level__value');


// Изменение масштаба загружаемой фотографии
let valueScaleControl = 100;
scaleValue.value = `${valueScaleControl}%`;
let valueScale = 1;

const toEnlargePhoto = (evt) => {
  evt.preventDefault();
  if (valueScaleControl > MIN_VALUE) {
    scaleValue.value = `${valueScaleControl -= STEP_VALUE}%`;
    boxPhotoPreview.style.transform = `scale(${valueScale -= STEP_SCALE})`;
  }
};

const toReducePhoto = (evt) => {
  evt.preventDefault();
  if (valueScaleControl < MAX_VALUE) {
    scaleValue.value = `${valueScaleControl += STEP_VALUE}%`;
    boxPhotoPreview.style.transform = `scale(${valueScale += STEP_SCALE})`;
  }
};

scaleSmaller.addEventListener('click', toEnlargePhoto);
scaleMore.addEventListener('click', toReducePhoto);
// Удаление обработчиков при закрытии окна нужно в другом модуле - ???
// scaleSmaller.removeEventListener('click', toEnlargePhoto);
// scaleMore.removeEventListener('click', toReducePhoto);


// Наложение эффекта на загружаемую фотографию
slider.classList.add('visually-hidden');

const toAddEffects = (evt) => {
  evt.preventDefault();
  // photoPreview.classList.add(`effects__preview--${evt.target.value}`);
  switch (evt.target.value) {
    case 'none':
      photoPreview.style.filter = '';
      break;
    case 'chrome':
      photoPreview.style.filter = `grayscale(${levelEffect.value})`;
      break;
    case 'sepia':
      photoPreview.style.filter = `sepia(${levelEffect.value})`;
      break;
    case 'marvin':
      photoPreview.style.filter = `invert(${levelEffect.value}%)`;
      break;
    case 'phobos':
      photoPreview.style.filter = `blur(${levelEffect.value}px)`;
      break;
    case 'heat':
      photoPreview.style.filter = `brightness(${levelEffect.value})`;
      break;
  }
};

effects.addEventListener('change', toAddEffects);
// Удаление обработчиков при закрытии окна нужно в другом модуле - ???
// effects.removeEventListener('change', toAddEffects);


// Регулировка эффекта слайдером

noUiSlider.create(sliderControl, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const noneUpdateOptions = () => {
  sliderControl.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  });
};

const chromeUpdateOptions = () => {
  sliderControl.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });
};

const sepiaUpdateOptions = () => {
  sliderControl.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });
};

const marvinUpdateOptions = () => {
  sliderControl.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  });
};

const phobosUpdateOptions = () => {
  sliderControl.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  });
};

const heatUpdateOptions = () => {
  sliderControl.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  });
};

sliderControl.noUiSlider.on('update', () => {
  levelEffect.value = sliderControl.noUiSlider.get();
  // console.log(`полузнок с изменяемым значением 1 - ${levelEffect.value}`); // полузнок с изменяемым значением

  //Как связать этот levelEffect.value = sliderControl.noUiSlider.get() с const toAddEffects  --- ??? ctr.47 --- ???
});

effects.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    switch (evt.target.value) {
      case 'none':
        noneUpdateOptions();
        slider.classList.add('visually-hidden');
        photoPreview.style.filter = '';
        // photoPreview.removeAttribute('class');
        break;
      case 'chrome':
        chromeUpdateOptions();
        slider.classList.remove('visually-hidden');
        photoPreview.style.filter = `grayscale(${levelEffect.value})`;
        // photoPreview.classList.remove('effects__preview--none', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
        break;
      case 'sepia':
        sepiaUpdateOptions();
        slider.classList.remove('visually-hidden');
        photoPreview.style.filter = `sepia(${levelEffect.value})`;
        // photoPreview.classList.remove('effects__preview--none', 'effects__preview--chrome', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
        break;
      case 'marvin':
        marvinUpdateOptions();
        slider.classList.remove('visually-hidden');
        photoPreview.style.filter = `invert(${levelEffect.value}%)`;
        // photoPreview.classList.remove('effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia',  'effects__preview--phobos', 'effects__preview--heat');
        break;
      case 'phobos':
        phobosUpdateOptions();
        slider.classList.remove('visually-hidden');
        photoPreview.style.filter = `blur(${levelEffect.value}px)`;
        // photoPreview.classList.remove('effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--heat');
        break;
      case 'heat':
        heatUpdateOptions();
        slider.classList.remove('visually-hidden');
        photoPreview.style.filter = `brightness(${levelEffect.value})`;
        // photoPreview.classList.remove('effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos');
        break;
    }
  }
});
