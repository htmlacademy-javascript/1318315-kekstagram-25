const getRandomNumber = function (min, max) {
  if (0 <= min < max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  return 'Ошибка при введении чисел';
};

getRandomNumber(0, 15);

const entryComment = 'Строка ввода комментария'; //input.value;
const getLengthLine = function (line, maxLine) {
  if (line.length <= maxLine) {
    return true;
  }
  return false;
};

getLengthLine(entryComment, 140);
