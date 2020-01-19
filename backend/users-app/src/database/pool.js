const { Pool } = require('pg');

const pool = new Pool({
	user: 'users-app',
	host: 'db',
	database: 'users-app',
	password: 'users-app',
	port: 5432,
});

module.exports.pool = pool;