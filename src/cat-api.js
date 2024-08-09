import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_PdAupx8zeAfGwmA0Usl71dWW8CCCHLe1lcHgLH5IMiTqvWGKEfsMBKJmDkUjtR84';

export default class CatApiService {
  constructor() {
    this.breedId = '';
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {
        'x-api-key': API_KEY,
      },
    });
  }

  // fetchBreeds() {
  //   return fetch(`${BASE_URL}breeds?api_key=${API_KEY}`)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(response.statusText);
  //       }
  //       return response.json();
  //     })
  //     .catch(err => console.log(err));
  // }

  // fetchCatByBreed() {
  //   return fetch(
  //     `${BASE_URL}images/search?api_key=${API_KEY}&breed_ids=${this.breedId}`
  //   )
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(response.statusText);
  //       }
  //       return response.json();
  //     })
  //     .catch(err => console.log(err));
  // }

  fetchBreeds() {
    return this.api
      .get('breeds')
      .then(response => response.data)
      .catch(err => {
        console.log('Request failed:', err.message);
        throw err;
      });
  }

  fetchCatByBreed() {
    if (!this.breedId) {
      throw new Error('Breed ID is not set.');
    }

    return this.api
      .get('images/search', {
        params: {
          breed_ids: this.breedId,
        },
      })
      .then(response => response.data)
      .catch(err => {
        console.log('Request failed:', err.message);
        throw err;
      });
  }
}
