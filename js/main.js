const getRandomNumber = function (min, max) {
  if (min < 0 && min >= max) {
    return 'Ошибка при введении чисел';
  }
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

getRandomNumber(0, 15);

const entryComment = input.value;
const getLengthLine = function (line, maxLine) {
  if (line.length <= maxLine) {
    return true;
  }
  return false;
};

getLengthLine(entryComment, 140);
