import {drawArrayPhotos} from './rendering-photos.js';
import {drawFullScreenPhoto} from './full-photo.js';

const photos = drawArrayPhotos();

photos.addEventListener('click', drawFullScreenPhoto());
