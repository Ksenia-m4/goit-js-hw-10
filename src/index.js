// Использовать ключ необходимо в HTTP-заголовке x-api-key. Рекомендуется использовать axios и добавить заголовок для всех запросов.

// import axios from 'axios';
// axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
// axios.defaults.headers.common['x-api-key'] =

import CatApiService from './cat-api';

const selectEl = document.querySelector('.breed-select');
const catContainer = document.querySelector('.cat-info');

selectEl.addEventListener('input', onSelect);

const catApiService = new CatApiService();

catApiService.fetchBreeds().then(data =>
  data.forEach(({ id, name }) => {
    let newOption = new Option(name, id);
    selectEl.append(newOption);
  })
);

function onSelect(evt) {
  catApiService.breedId = evt.target.value;

  catApiService
    .fetchCatByBreed()
    .then(data => (catContainer.innerHTML = createMarkup(data)));
}

function createMarkup(arr) {
  return arr
    .map(
      ({ url: img, breeds }) =>
        `<img src="${img}" alt="${breeds[0].name}" class="img" width="500" />
<div class="text-container">
  <h2>${breeds[0].name}</h2>
  <p class="subtitle">${breeds[0].origin}</p>
  <p>${breeds[0].description}</p>
  <p><span>Temperament:</span>${breeds[0].temperament}</p>
  <p><span>Life span:</span>${breeds[0].life_span}</p>`
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

// Протестировать работоспособноть отображения ошибки очень просто - измени адрес запроса добавив в конец любой символ, например вместо https://api.thecatapi.com/v1/breeds используй https://api.thecatapi.com/v1/breeds123. Запрос получения списка пород будет отклонен с ошибкой. Аналогично для запроса информации о коте по породе.
