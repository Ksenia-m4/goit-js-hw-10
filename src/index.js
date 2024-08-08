// Создай фронтенд часть приложения поиска информации о коте по его породе.

// 1. Используй публичный The Cat API.
// Рекомендуется использовать axios и добавить заголовок для всех запросов.

// import axios from 'axios';
// axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
// axios.defaults.headers.common['x-api-key'] = "твой ключ";

import CatApiService from './cat-api';

const selectEl = document.querySelector('.breed-select');
const catContainer = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

const catApiService = new CatApiService();

selectEl.addEventListener('input', onSelect);

selectEl.classList.add('is-hidden');
errorEl.classList.add('is-hidden');

// 3. При загрузке страницы должен выполняться HTTP-запрос за коллекцией пород. При успешном запросе, необходимо наполнить select.breed-select опциями так, чтобы value опции содержал id породы, а в интерфейсе пользователю отображалось название породы.

catApiService
  .fetchBreeds()
  .then(data => {
    loaderEl.classList.add('is-hidden');
    selectEl.classList.remove('is-hidden');
    return data.forEach(({ id, name }) => {
      let newOption = new Option(name, id);
      selectEl.append(newOption);
    });
  })
  .catch(err => {
    errorEl.classList.remove('is-hidden');
    loaderEl.classList.add('is-hidden');
    selectEl.classList.add('is-hidden');
  });

// 5. Когда пользователь выбирает опцию в селекте, необходимо выполнять запрос за полной информацией о коте на ресурс https://api.thecatapi.com/v1/images/search.

function onSelect(evt) {
  loaderEl.classList.remove('is-hidden');
  catContainer.innerHTML = '';

  catApiService.breedId = evt.target.value;

  catApiService.fetchCatByBreed().then(data => {
    loaderEl.classList.add('is-hidden');
    catContainer.innerHTML = createMarkup(data);
  });
}

// 7. Если запрос был успешный, под селектом, в блоке div.cat-info появляется изображение и развернутая информация о коте: название породы, описание и темперамент.

function createMarkup(arr) {
  return arr
    .map(
      ({ url: img, breeds }) =>
        `<div class ="thumb"><img src="${img}" alt="${breeds[0].name}" class="img" /></div>
      <div class="text-container">
      <h2>${breeds[0].name}</h2>
      <p class="subtitle">${breeds[0].origin}</p>
      <p class="text">${breeds[0].description}</p>
      <p class="text"><span>Temperament:</span>${breeds[0].temperament}</p>
      <p class="text"><span>Life span:</span>${breeds[0].life_span} years</p>`
    )
    .join('');
}

// Обработка состояния загрузки
// Пока идет любой HTTP-запрос, необходимо показывать загрузчик - элемент p.loader. Пока запросов нет или когда запрос завершился, загрузчик необходимо скрывать. Используй для этого дополнительные CSS классы.
// Пока идет запрос за списком пород, необходимо скрыть select.breed-select и показать p.loader.
// Пока идет запрос за инфорацией о коте, необходимо скрыть div.cat-info и показать p.loader.
// Когда любой запрос завершился, p.loader необходимо скрыть

// Обработка ошибки
// Если у пользователя произошла ошибка любого HTTP-запроса, например упала сеть, была потеря пакетов и т. п., то есть промис был отклонен, необходимо отобразить элемент p.error, а при каждом последующем запросе скрывать его. Используй для этого дополнительные CSS классы.
