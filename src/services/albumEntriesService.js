import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api'
});

const getAlbumEntriesByPage = (pageIndex, pageSize) => api.get(`/albumEntries?page=${pageIndex}&size=${pageSize}`).then(response => response.data);

export {
    getAlbumEntriesByPage
}