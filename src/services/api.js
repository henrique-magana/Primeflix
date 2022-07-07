// URL da API : https://api.themoviedb.org/3/movie/now_playing?api_key=768deb929c9483cf5c7cd8e498b81892

import axios from 'axios';

const api = axios.create({

    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;