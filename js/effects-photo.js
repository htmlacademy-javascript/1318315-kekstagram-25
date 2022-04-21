const STEP_VALUE = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const STEP_SCALE = 0.25;
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleMore = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const photoPreview = document.querySelector('.img-upload__preview');
const effects = document.querySelector('.effects__list');
const slider = document.querySelector('.effect-level__slider');
const levelEffect = document.querySelector('.effect-level__value');


// Изменение масштаба загружаемой фотографии
let valueScaleControl = 100;
scaleValue.value = `${valueScaleControl}%`;
let valueScale = 1;

const toEnlargePhoto = (evt) => {
  evt.preventDefault();
  if (valueScaleControl > MIN_VALUE) {
    scaleValue.value = `${valueScaleControl -= STEP_VALUE}%`;
    photoPreview.style.transform = `scale(${valueScale -= STEP_SCALE})`;
  }
  // if (scaleValue.value == MIN_VALUE) { // не получается написать такое условие, чтобы оно срабатывало для блокирования кнопки
  //   console.log('click === 25');
  //   scaleSmaller.setAttribute('disabled', true);
  // }
};

const toReducePhoto = (evt) => {
  evt.preventDefault();
  if (valueScaleControl < MAX_VALUE) {
    scaleValue.value = `${valueScaleControl += STEP_VALUE}%`;
    photoPreview.style.transform = `scale(${valueScale += STEP_SCALE})`;
  }
  // if (scaleValue.value == MAX_VALUE) { // не получается написать такое условие, чтобы оно срабатывало для блокирования кнопки
  //   console.log('click === 25');
  //   scaleMore.setAttribute('disabled', true);
  // }
};

scaleSmaller.addEventListener('click', toEnlargePhoto);
scaleMore.addEventListener('click', toReducePhoto);
// Удаление обработчиков при закрытии окна нужно в другом модуле - ???
// scaleSmaller.removeEventListener('click', toEnlargePhoto);
// scaleMore.removeEventListener('click', toReducePhoto);

//____________________________________________
// Наложение эффекта на загружаемую фотографию
const toAddEffects = (evt) => {
  evt.preventDefault();
  photoPreview.classList.add(`effects__preview--${evt.target.value}`);
  // photoPreview.classList.add(`effects__preview--${evt.target.value}`).style.filter = ''; // сработает или не сработает -? при добавлении класса добавлять и эффект --- ???
};

effects.addEventListener('change', toAddEffects);
// Удаление обработчиков при закрытии окна нужно в другом модуле - ???
// effects.removeEventListener('change', toAddEffects);


// Регулировка эффекта слайдером

noUiSlider.create(slider, {
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
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  });
};

const chromeUpdateOptions = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });
};

const sepiaUpdateOptions = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });
};

const marvinUpdateOptions = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  });
};

const phobosUpdateOptions = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  });
};

const heatUpdateOptions = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  });
};

slider.noUiSlider.on('update', () => {
  levelEffect.value = slider.noUiSlider.get();
  //console.log(`slider value - ${levelEffect.value}`);
});

effects.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    //console.log(`click - current effect - ${evt.target.value}`);
    switch (evt.target.value) {
      case 'none':
        //console.log('none');
        noneUpdateOptions();
        slider.classList.add('visually-hidden');
        photoPreview.style.filter = '';
        // console.log(photoPreview.style.filter);
        photoPreview.classList.remove('effects__preview--none');
        photoPreview.classList.remove('effects__preview--chrome');
        photoPreview.classList.remove('effects__preview--sepia');
        photoPreview.classList.remove('effects__preview--marvin');
        photoPreview.classList.remove('effects__preview--phobos');
        photoPreview.classList.remove('effects__preview--heat');
        break;
      case 'chrome':
        //console.log('chrome');
        chromeUpdateOptions();
        slider.classList.remove('visually-hidden');
        photoPreview.style.filter = `grayscale(${levelEffect.value})`;
        photoPreview.classList.remove('effects__preview--none');
        photoPreview.classList.remove('effects__preview--sepia');
        photoPreview.classList.remove('effects__preview--marvin');
        photoPreview.classList.remove('effects__preview--phobos');
        photoPreview.classList.remove('effects__preview--heat');
        // console.log(photoPreview.style.filter);
        // console.log(`grayscale(${levelEffect.value})`);
        break;
      case 'sepia':
        //console.log('sepia');
        sepiaUpdateOptions();
        slider.classList.remove('visually-hidden');
        photoPreview.style.filter = `sepia(${levelEffect.value})`;
        photoPreview.classList.remove('effects__preview--none');
        photoPreview.classList.remove('effects__preview--chrome');
        photoPreview.classList.remove('effects__preview--marvin');
        photoPreview.classList.remove('effects__preview--phobos');
        photoPreview.classList.remove('effects__preview--heat');
        // console.log(photoPreview.style.filter);
        // console.log(`sepia(${levelEffect.value})`);
        break;
      case 'marvin':
        //console.log('marvin');
        marvinUpdateOptions();
        slider.classList.remove('visually-hidden');
        photoPreview.style.filter = `invert(${levelEffect.value}%)`;
        photoPreview.classList.remove('effects__preview--none');
        photoPreview.classList.remove('effects__preview--chrome');
        photoPreview.classList.remove('effects__preview--sepia');
        photoPreview.classList.remove('effects__preview--phobos');
        photoPreview.classList.remove('effects__preview--heat');
        // console.log(photoPreview.style.filter);
        // console.log(`invert(${levelEffect.value}%)`);
        break;
      case 'phobos':
        //console.log('phobos');
        phobosUpdateOptions();
        slider.classList.remove('visually-hidden');
        photoPreview.style.filter = `blur(${levelEffect.value}px)`;
        photoPreview.classList.remove('effects__preview--none');
        photoPreview.classList.remove('effects__preview--chrome');
        photoPreview.classList.remove('effects__preview--sepia');
        photoPreview.classList.remove('effects__preview--marvin');
        photoPreview.classList.remove('effects__preview--heat');
        // console.log(photoPreview.style.filter);
        // console.log(`blur(${levelEffect.value}px)`);
        break;
      case 'heat':
        //console.log('heat');
        heatUpdateOptions();
        slider.classList.remove('visually-hidden');
        photoPreview.style.filter = `brightness(${levelEffect.value})`;
        photoPreview.classList.remove('effects__preview--none');
        photoPreview.classList.remove('effects__preview--chrome');
        photoPreview.classList.remove('effects__preview--sepia');
        photoPreview.classList.remove('effects__preview--marvin');
        photoPreview.classList.remove('effects__preview--phobos');
        // console.log(photoPreview.style.filter);
        // console.log(`brightness(${levelEffect.value})`);
        break;
    }
  }
});

// Ниже для себя писаса схему по ТЗ по домашнему заданию
// levelEffect.value = '';
// photoPreview.style.filter = ''; // для Оригинал - effects__preview--none
// photoPreview.style.filter = `grayscale(${levelEffect.value})`; // для Хром - effects__preview--chrome
// photoPreview.style.filter = `sepia(${levelEffect.value})`; // для Сепия - effects__preview--sepia
// photoPreview.style.filter = `invert(${levelEffect.value}%)`; // для Марвин - effects__preview--marvin
// photoPreview.style.filter = `blur(${levelEffect.value}px)`; // для Фобос - effects__preview--phobos
// photoPreview.style.filter = `brightness(${levelEffect.value})`; // для Зной - effects__preview--heat
