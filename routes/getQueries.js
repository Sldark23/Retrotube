const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const queriesFilePath = path.join(__dirname, '..', 'queries.json');

router.get('/', (req, res) => {
  if (fs.existsSync(queriesFilePath)) {
    const fileContent = fs.readFileSync(queriesFilePath, 'utf-8');
    const queries = JSON.parse(fileContent);
    return res.json(queries);
  }

  res.json([]);
});

module.exports = router;