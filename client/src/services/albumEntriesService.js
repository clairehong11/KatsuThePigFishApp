import axios from 'axios';

const api = axios.create({
    baseURL: 'https://katsu-the-pig-fish-app.herokuapp.com/api'
});

const getAlbumEntriesByPage = (pageIndex, pageSize) => api.get(`/albumEntries?page=${pageIndex}&size=${pageSize}`).then(response => response.data);

const createAlbumEntry = requestData => api.post('/albumEntry', requestData);

const updateAlbumEntry = (albumEntryId, requestData) => api.put(`/albumEntry/${albumEntryId}`, requestData);

const deleteAlbumEntry = albumEntryId => api.delete(`/albumEntry/${albumEntryId}`);

export {
    getAlbumEntriesByPage,
    createAlbumEntry,
    updateAlbumEntry,
    deleteAlbumEntry
}