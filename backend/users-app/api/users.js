const express = require('express');

const { pool } = require('../database/pool');
const { internal, errorWrapper, badRequest } = require('../utils/errors');
const { fromDBToApi } = require('./models');
const { validateEmail } = require('../utils/validation');

const usersRouter = express.Router();

usersRouter.get('/', errorWrapper(async (req, res) => {
	const pgRes = await pool.query('SELECT id, name, surname, phone, email FROM users;');
	if (pgRes.rows === undefined) {
		internal(res, 'rows – undefined (dafaq)');
		return;
	}

	const users = pgRes.rows.map(row => {
		return fromDBToApi(row)
	});
	res.send({users});
}));

usersRouter.get('/:id', errorWrapper(async (req, res) => {
	const { id: userId } = req.params;

	const pgRes = await pool.query(`SELECT id, name, surname, phone, email FROM users WHERE id = $1;`, [userId]);
	if (pgRes.rows.length === 0) {
		res.status(404);
		res.send(`User with id ${userId} not found`);
		return;
	}

	if (pgRes.rows.length !== 1) {
		internal(res, `Got multiple users with id ${userId}`);
		return;
	}

	res.send(fromDBToApi(pgRes.rows[0]));
}));

usersRouter.post('/', errorWrapper(async (req, res) => {
	const { name, surname, email, phone } = req.body;
	if (!validateEmail(email)) {
		badRequest(res, "'email' field must be provided and valid");
		return;
	}

	const existingUser = await pool.query(`SELECT id FROM users WHERE email = $1;`, [email]);
	if (existingUser.rows.length > 0) {
		badRequest(res, `User with email ${email} already exists`);
		return;
	}

	const newUser = await pool.query(
		`INSERT INTO users (name, surname, email, phone) VALUES ($1, $2, $3, $4) RETURNING id, name, surname, email, phone;`,
		[name, surname, email, phone]
	);
	res.send(fromDBToApi(newUser.rows[0]));
}));

module.exports.usersRouter = usersRouter;