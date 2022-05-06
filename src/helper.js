const { rwClient, rateLimitPlugin, ApiResponseError } = require('./auth.js');

const getCurrentUser = async () => {
	const user = await rwClient.v2.me()
	return user.data;
}


const getLimitInfo = async () => {
	let limit = await rateLimitPlugin.v2.getRateLimit('users/:id/likes', 'POST')

	if (!limit) {
		const { id } = await getCurrentUser();

		// if limit not found  send new request to get limit info
		await rwClient.v2.like(id, "1522271563487272960")

		limit = await rateLimitPlugin.v2.getRateLimit('users/:id/likes', 'POST')
		return { limitFound: true, limit: limit };





	} else {
		return { limitFound: false, limit: limit };

	}


}


module.exports = { getLimitInfo, getCurrentUser };