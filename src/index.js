import CatApiService from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selectEl = document.querySelector('.breed-select');
const catContainer = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

const catApiService = new CatApiService();

selectEl.addEventListener('change', onSelect);

onLoading();

catApiService
  .fetchBreeds()
  .then(data => {
    selectEl.classList.remove('is-hidden');

    loaderEl.classList.add('is-hidden');

    let makeNewOption = data.map(({ id, name }) => {
      return `<option value ='${id}'>${name}</option>`;
    });

    selectEl.innerHTML = makeNewOption.join('');

    new SlimSelect({
      select: selectEl,
      settings: {
        showSearch: false,
      },
    });

    onSelect({ target: selectEl });
  })
  .catch(onError);

function onSelect(evt) {
  onLoading();
  catContainer.innerHTML = '';

  catApiService.breedId = evt.target.value;

  catApiService
    .fetchCatByBreed()
    .then(data => {
      loaderEl.classList.add('is-hidden');
      catContainer.innerHTML = createMarkup(data);
    })
    .catch(onError);
}

function createMarkup(arr) {
  return arr
    .map(({ url: img = '', breeds = [] }) => {
      const {
        name = 'Unknown',
        origin = 'Unknown',
        description = 'No description available',
        temperament = 'Unknown',
        life_span = 'Unknown',
      } = breeds[0] || {};

      return `<div class ="thumb"><img src="${img}" alt="${name}" class="img" /></div>
      <div class="text-container">
      <h2>${name}</h2>
      <p class="subtitle">${origin}</p>
      <p class="text">${description}</p>
      <p class="text"><span>Temperament:</span>${temperament}</p>
      <p class="text"><span>Life span:</span>${life_span} years</p>`;
    })
    .join('');
}

function onError() {
  Notify.failure(errorEl.textContent);

  loaderEl.classList.add('is-hidden');
  selectEl.classList.add('is-hidden');
}

function onLoading() {
  loaderEl.classList.remove('is-hidden');
}
