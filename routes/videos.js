const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = 'AIzaSyAgY9eCjzeggH9qq009kpAlwlW9PAh4BHk';
const baseURL = 'https://www.googleapis.com/youtube/v3';

router.get('/', async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(`${baseURL}/search`, {
      params: {
        part: 'snippet',
        maxResults: 10000,
        q: query,
        key: API_KEY,
        regionCode: 'BR',
        relevanceLanguage: 'en'
      }
    });
    res.json(response.data.items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;