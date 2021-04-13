import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://katsu-the-pig-fish-app.herokuapp.com/api'
    baseURL: 'http://localhost:8000/api'
});

const getAlbumEntriesByPage = (pageIndex, pageSize) => api.get(`/albumEntries?page=${pageIndex}&size=${pageSize}`).then(response => response.data);

const createAlbumEntry = requestData => api.post('/albumEntry', requestData);

const deleteAlbumEntry = albumEntryId => api.delete(`albumEntry/${albumEntryId}`);

export {
    getAlbumEntriesByPage,
    createAlbumEntry,
    deleteAlbumEntry
}