import axios from 'axios';

const api = axios.create({
    baseURL: 'https://katsu-the-pig-fish-app.herokuapp.com/api'
});

const uploadFile = formData => {
  return api.post('/mediaFile/upload', formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

const deleteFile = requestData => api.post('/mediaFile/delete', requestData).then(response => response.data);

export {
    uploadFile,
    deleteFile
}