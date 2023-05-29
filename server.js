const express = require('express');
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const htmlRoutes = require('./routes/html');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/html', htmlRoutes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
