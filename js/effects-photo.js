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


// Наложение эффекта на загружаемую фотографию

const toAddEffects = (effect, value) => {
  switch (effect) {
    case 'none':
      slider.setAttribute('disabled', '');
      sliderControl.setAttribute('disabled', '');
      levelEffect.setAttribute('disabled' ,'');
      noneUpdateOptions();
      photoPreview.style.filter = '';
      photoPreview.removeAttribute('class');
      break;
    case 'chrome':
      slider.removeAttribute('disabled');
      sliderControl.removeAttribute('disabled');
      levelEffect.removeAttribute('disabled');
      photoPreview.style.filter = `grayscale(${value})`;
      chromeUpdateOptions();
      photoPreview.removeAttribute('class');
      photoPreview.classList.add('effects__preview--chrome');
      break;
    case 'sepia':
      slider.removeAttribute('disabled');
      sliderControl.removeAttribute('disabled');
      levelEffect.removeAttribute('disabled');
      photoPreview.style.filter = `sepia(${value})`;
      sepiaUpdateOptions();
      photoPreview.removeAttribute('class');
      photoPreview.classList.add('effects__preview--sepia');
      break;
    case 'marvin':
      slider.removeAttribute('disabled');
      sliderControl.removeAttribute('disabled');
      levelEffect.removeAttribute('disabled');
      photoPreview.style.filter = `invert(${value}%)`;
      marvinUpdateOptions();
      photoPreview.removeAttribute('class');
      photoPreview.classList.add('effects__preview--marvin');
      break;
    case 'phobos':
      slider.removeAttribute('disabled');
      sliderControl.removeAttribute('disabled');
      levelEffect.removeAttribute('disabled');
      photoPreview.style.filter = `blur(${value}px)`;
      phobosUpdateOptions();
      photoPreview.removeAttribute('class');
      photoPreview.classList.add('effects__preview--phobos');
      break;
    case 'heat':
      slider.removeAttribute('disabled');
      sliderControl.removeAttribute('disabled');
      levelEffect.removeAttribute('disabled');
      photoPreview.style.filter = `brightness(${value})`;
      heatUpdateOptions();
      photoPreview.removeAttribute('class');
      photoPreview.classList.add('effects__preview--heat');
      break;
  }
};

const selectedEffect = (evt) => {
  evt.preventDefault();
  toAddEffects(evt.target.value, sliderControl.noUiSlider.get());
};

effects.addEventListener('change', selectedEffect);


sliderControl.noUiSlider.on('update', () => {
  const value = sliderControl.noUiSlider.get();
  levelEffect.value = value;

  const effect = document.querySelector('input[name="effect"]:checked').value;

  toAddEffects(effect, value);
});


export {scaleSmaller, scaleMore, photoPreview, effects, slider, toEnlargePhoto, toReducePhoto, selectedEffect};
