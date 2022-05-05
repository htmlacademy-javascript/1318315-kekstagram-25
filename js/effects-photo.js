const STEP_VALUE = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const STEP_SCALE = 0.25;
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleMore = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const boxPhotoPreview = document.querySelector('.img-upload__preview'); // обертка фото
const photoPreview = document.querySelector('.img-upload__preview img'); // собственно фото // должно меняться значение и тогда будет визуальный эффект на фото
const effects = document.querySelector('.effects__list'); // список эффектов
const slider = document.querySelector('.img-upload__effect-level'); // обертка слайдера ? или ? фото+эффект ? или ? наложение эффекта на фото
const sliderControl = document.querySelector('.effect-level__slider'); // собственно слайдер, div, ручка, шкала
const levelEffect = document.querySelector('.effect-level__value'); // скрытое поле инпута


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

const toUpdateControl = (effect, value) => {
  switch (effect) {
    case 'none':
      noneUpdateOptions();
      photoPreview.style.filter = '';
      // console.log('none UpdateControl');
      break;
    case 'chrome':
      chromeUpdateOptions();
      photoPreview.style.filter = `grayscale(${value})`;
      // console.log('chrome UpdateControl');
      break;
    case 'sepia':
      sepiaUpdateOptions();
      photoPreview.style.filter = `sepia(${value})`;
      // console.log('sepia UpdateControl');
      break;
    case 'marvin':
      marvinUpdateOptions();
      photoPreview.style.filter = `invert(${value}%)`;
      // console.log('marvin UpdateControl');
      break;
    case 'phobos':
      phobosUpdateOptions();
      photoPreview.style.filter = `blur(${value}px)`;
      // console.log('phobos UpdateControl');
      break;
    case 'heat':
      heatUpdateOptions();
      photoPreview.style.filter = `brightness(${value})`;
      // console.log('heat UpdateControl');
      break;
  }
};

// Наложение эффекта на загружаемую фотографию
const removeDisabled = () => {
  slider.removeAttribute('disabled');
  sliderControl.removeAttribute('disabled');
  levelEffect.removeAttribute('disabled');
};

const toAddEffects = (effect, value) => {
  switch (effect) {
    case 'none':
      slider.setAttribute('disabled', '');
      sliderControl.setAttribute('disabled', '');
      levelEffect.setAttribute('disabled' ,'');
      // noneUpdateOptions();
      // toUpdateControl(effect, value);
      photoPreview.style.filter = '';
      photoPreview.removeAttribute('class');
      // console.log('none', photoPreview);
      break;
    case 'chrome':
      removeDisabled();
      photoPreview.style.filter = `grayscale(${value})`;
      // chromeUpdateOptions();
      // toUpdateControl(effect, value);
      photoPreview.removeAttribute('class');
      photoPreview.classList.add('effects__preview--chrome');
      // console.log('chrome', photoPreview);
      break;
    case 'sepia':
      removeDisabled();
      photoPreview.style.filter = `sepia(${value})`;
      // sepiaUpdateOptions();
      // toUpdateControl(effect, value);
      photoPreview.removeAttribute('class');
      photoPreview.classList.add('effects__preview--sepia');
      // console.log('sepia', photoPreview);
      break;
    case 'marvin':
      removeDisabled();
      photoPreview.style.filter = `invert(${value}%)`;
      // marvinUpdateOptions();
      // toUpdateControl(effect, value);
      photoPreview.removeAttribute('class');
      photoPreview.classList.add('effects__preview--marvin');
      // console.log('marvin', photoPreview);
      break;
    case 'phobos':
      removeDisabled();
      photoPreview.style.filter = `blur(${value}px)`;
      // phobosUpdateOptions();
      // toUpdateControl(effect, value);
      photoPreview.removeAttribute('class');
      photoPreview.classList.add('effects__preview--phobos');
      // console.log('phobos', photoPreview);
      break;
    case 'heat':
      removeDisabled();
      photoPreview.style.filter = `brightness(${value})`;
      // heatUpdateOptions();
      // toUpdateControl(effect, value);
      photoPreview.removeAttribute('class');
      photoPreview.classList.add('effects__preview--heat');
      // console.log('heat', photoPreview);
      break;
  }
};

const selectedEffect = (evt) => {
  evt.preventDefault();
  toAddEffects(evt.target.value, sliderControl.noUiSlider.get());
  toUpdateControl(evt.target.value, sliderControl.noUiSlider.get());
};

effects.addEventListener('change', selectedEffect);


sliderControl.noUiSlider.on('update', () => {
  const value = sliderControl.noUiSlider.get();
  levelEffect.value = value;
  // console.log(`noUiSlider levelEffect(${levelEffect.value})`);
  const effect = document.querySelector('input[name="effect"]:checked').value;
  // console.log(`noUiSlider effect(${effect})`);
  toAddEffects(effect, value);
});


export {scaleSmaller, scaleMore, photoPreview, effects, slider, toEnlargePhoto, toReducePhoto, selectedEffect};
