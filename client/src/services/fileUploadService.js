import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://katsu-the-pig-fish-app.herokuapp.com/api'
    baseURL: 'http://localhost:8000/api'
});

const uploadFile = formData => {
  return api.post('/upload', formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
}

export {
    uploadFile,
}