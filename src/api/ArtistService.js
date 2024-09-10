import axios from "axios"

const API_URL = 'http://localhost:8080/artists';

export async function saveArtist(artist) {
    return await axios.post(API_URL, artist);
}

export async function getArtists(page = 0, size = 10) {
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function getArtist(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function updateArtist(artist) {
    return await axios.post(API_URL, artist);
}

export async function updatePhoto(formData) {
    return await axios.put(`${API_URL}/photo`, formData);
}

export async function deleteArtist(id) {
    return await axios.delete(`${API_URL}/${id}`);
}