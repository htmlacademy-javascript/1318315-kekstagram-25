import {getRandomNumber} from './utils.js';

const DESCRIPTIONS = [
  'Кто-то сделал эти 1200 тонные блоки? Это не цемент. Сейчас даже кранов таких нет, чтоб их поднять, не говоря уже о том, чтобы сделать.',
  'Стадион, где будет проходить чемпионат мира по футболу 2022, Доха, Катар.',
  'Раз в год между двумя островами южнокорейского уезда Чиндо расступается море, обнажая проход длиной 2 км и шириной 40 м.',
  'Над Антарктикой запрещены полеты вертолетов, так как пингвины, у которых короткая шея, пытаются посмотреть на них и валятся с ног, как домино.',
  'Японский капсульный отель под названием «9 часов». Номер напоминает капсулу томографа. Места столько же. Это — весь номер. Залез в него, закрылся, переночевал и вылез.',
  'Тигр идёт через покрытый ряской водоем.',
  'Самая большая скорость в животном мире – 322 км/ч. Эту скорость развивает сапсан при пикировании на добычу.',
  '14-летний штангист из США.',
  'Игра тени. На самом деле верблюды — это те белые черточки на песке.',
  'Анхель — самый высокий в мире водопад, общая высота 979 метров, высота непрерывного падения 807 метров. Водопад находится в тропических лесах Венесуэлы, на территории Национального парка Канайма.',
  'Дверная цепочка в виде лабиринта. Выведет из себя любого гостя.',
  'В языке эскимосов нет слова «вчера».',
  'Карта мира 1581 года. Более или менее точная, надо сказать!',
  'Этому дереву бонсай 800 лет.',
  'В зоопарке Цюриха впервые за 18 лет родился в неволе черный носорог. Это очень редкая порода.',
  'В 17 веке термометры наполняли коньяком, а не ртутью.',
  'Скорпионы могут ничего не есть 2 года, а клещи - до 10 лет.',
  'Птица под названием пересмешник может имитировать практически любой звук.',
  'Мировой рекорд по количеству подпрыгиваний камня на воде установил Курт Штайнер: американцу удалось заставить камень подскочить 88 раз.',
  'Акула может почувствовать каплю крови в 100 литрах влды.',
  'В среднем человек засыпает в течении 7 минут.',
  'На Гавайях сёрфинг включен в школьную программу.',
  'На шлемах астронавтов есть специальные приспособления, которыми при необходимости можно почесать нос.',
  'Колибри - единственная птица, способная летать назад.',
  'Улицы в Японии не имеют названий.',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Георгий',
  'Мария',
  'Виктория',
  'Леонид',
  'Анастасия',
  'Максим',
  'Александр',
  'Константин',
  'Матвей',
  'Георгий',
  'Иван',
  'Роман',
  'Артём',
  'Фёдор',
  'Екатерина',
  'Ксения',
  'Алексей',
  'Полина',
  'Анна',
  'Диана',
  'Варвара',
  'София',
  'Кира',
  'Вера',
  'Вероника',
];

let commentId = 1;

const createComment = () => {
  const comment = {
    id: commentId++,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    messagge: MESSAGES[getRandomNumber(0, MESSAGES.length - 1)],
    name: NAMES[getRandomNumber(0, NAMES.length - 1)],
  };
  return comment;
};

const createArrayComments = () => {
  const comments = [];
  for (let i = 0; i <= 3; i++) {
    const newComment = createComment();
    comments.push(newComment);
  }
  return comments;
};

const createDescriptionPhoto = (index) => {
  const descriptionPhoto = {
    id: index,
    url: `photos/${index}.jpg`,
    description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
    likes: getRandomNumber(15, 200),
    comments: createArrayComments(),
  };
  return descriptionPhoto;
};

const createArrayPhotos = () => {
  const photos = [];
  for (let index = 1; index <= 25; index++) {
    const newPhoto = createDescriptionPhoto(index);
    photos.push(newPhoto);
  }
  return photos;
};

createArrayPhotos();

export {createArrayPhotos, createArrayComments};
