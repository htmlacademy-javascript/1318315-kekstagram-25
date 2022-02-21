let getRandomNumber = function (min, max) {
  if (min >= max) {
    return 'Ошибка при введении чисел';
  }
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
// https://schoolsw3.com/js/js_random.php
getRandomNumber(0, 15);

let entryComment = 'Поле ввода комментариев';
let maxLine = 140;
let getLengthLine = function (line, maxLine) {
  if (line <= maxLine) {
    return true;
  }
  return false;
}
// https://schoolsw3.com/js/js_strings.php
getLengthLine(entryComment, maxLine);
