const express = require('express');
const path = require('path');
const videos = require('./routes/videos');
const saveQuery = require('./routes/saveQuery');
const getQueries = require('./routes/getQueries');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/videos', videos);
app.use('/api/saveQuery', saveQuery);
app.use('/api/queries', getQueries);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));