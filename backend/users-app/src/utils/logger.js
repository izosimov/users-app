module.exports.logger = function (req, res, next) {
	const { end } = res;
	res.end  = function(chunk, encoding) {
		console.log(`Got request to path ${req.url}, status code: ${res.statusCode}`);
		res.end = end;
		res.end(chunk, encoding);
	};
	next();
};
