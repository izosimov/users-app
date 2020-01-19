const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const { logger } = require('./utils/logger');
const { apiRouter } = require('./api/index');

const app = express();

// Middlewares
app.use(logger);
app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));

// Main routes
app.use('/api', apiRouter);

// Start server
app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
