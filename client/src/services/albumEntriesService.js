import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://katsu-the-pig-fish-app.herokuapp.com/api'
    baseURL: 'http://localhost:8000/api'
});

const getAlbumEntriesByPage = (pageIndex, pageSize) => api.get(`/albumEntries?page=${pageIndex}&size=${pageSize}`).then(response => response.data);

const createAlbumEntry = requestData => api.post('/albumEntry', requestData);

export {
    getAlbumEntriesByPage,
    createAlbumEntry
}