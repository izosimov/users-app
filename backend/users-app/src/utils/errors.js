const internal = (res, err) => {
	console.error('Error has occurred', err);
	res.send('Internal Server Error.', 500);
};

const badRequest = (res, err) => {
	console.log('Bad request', err);
	res.send(`Bad request: ${err}`, 400);
};

const errorWrapper = (handler) => {
	return async (req, res) => {
		try {
			await handler(req, res);
		} catch (e) {
			internal(res, e);
		}
	};
};

module.exports.internal = internal;
module.exports.errorWrapper = errorWrapper;
module.exports.badRequest = badRequest;