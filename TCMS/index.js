const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const authRoutes = require('./server/routes/authApi.js');
const apiRoutes = require('./server/routes/entryFormApi.js');
const gridRoutes = require('./server/routes/gridApi.js');

// all of our routes will be prefixed with /api
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/grid', gridRoutes);

//start the server
app.listen(port, () => console.log(`Listening on port ${port}`));
