const express = require('express');
const PORT = process.env.PORT || 3001;

const api = require('./routes/api');
const html = require('./routes/html');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api', api);
app.use('/', html);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
