const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const queriesFilePath = path.join(__dirname, '..', 'queries.json');

router.post('/', (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).send('Query is required');
  }

  let queries = [];
  if (fs.existsSync(queriesFilePath)) {
    const fileContent = fs.readFileSync(queriesFilePath, 'utf-8');
    queries = JSON.parse(fileContent);
  }

  if (!queries.includes(query)) {
    queries.push(query);
  }

  fs.writeFileSync(queriesFilePath, JSON.stringify(queries, null, 2));
  res.status(200).send('Query saved');
});

module.exports = router;