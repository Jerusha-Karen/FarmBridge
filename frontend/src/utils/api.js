import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' }
})

export const sendMessage = (message, language) =>
  API.post('/api/chat', { message, language })

export const getSchemes = (data) =>
  API.post('/api/schemes', data)

export const getListings = (category) =>
  API.get('/api/marketplace', { params: category ? { category } : {} })

export const postListing = (data) =>
  API.post('/api/marketplace', data)