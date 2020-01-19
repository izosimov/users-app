module.exports.fromDBToApi = (dbModel) => {
	return {
		'name': `${dbModel.name} ${dbModel.surname}`,
		'phone': dbModel.phone,
		'email': dbModel.email,
	}
};
