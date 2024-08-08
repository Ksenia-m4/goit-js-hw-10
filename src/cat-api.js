const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_PdAupx8zeAfGwmA0Usl71dWW8CCCHLe1lcHgLH5IMiTqvWGKEfsMBKJmDkUjtR84';

export default class CatApiService {
  constructor() {
    this.breedId = '';
  }

  // 4. Напиши функцию fetchBreeds() которая делает HTTP-запрос и возвращает промис с массивом пород - результатом запроса. Вынеси её в файл cat-api.js и сделай именованный экспорт.

  fetchBreeds() {
    return fetch(`${BASE_URL}breeds?api_key=${API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(err => console.log(err));
  }

  // 6. Напиши функцию fetchCatByBreed(breedId) которая ожидает идентификатор породы, делает HTTP-запрос и возвращает промис с данными о коте - результатом запроса. Вынеси её в файл cat-api.js и сделай именованный экспорт.

  fetchCatByBreed() {
    return fetch(
      `${BASE_URL}images/search?api_key=${API_KEY}&breed_ids=${this.breedId}`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(err => console.log(err));
  }
}
