const getRandomNumber = (min, max) => {
  if (0 <= min < max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  return 'Ошибка при введении чисел';
};

const isEscKeydown = (evt) => evt.key === 'Escape';

export {getRandomNumber, isEscKeydown};
