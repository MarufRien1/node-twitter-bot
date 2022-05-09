const { rwClient, rateLimitPlugin, ApiResponseError } = require('./auth.js');

const getCurrentUser = async () => {
	const user = await rwClient.v2.me()
	return user.data;
}


const getLimitInfo = async (type) => {
	try {
		let limit
		if (type === "like") {
			limit = await rateLimitPlugin.v2.getRateLimit('users/:id/likes', 'POST')

			if (!limit) {

				const { id } = await getCurrentUser();

				// if limit not found  send new request to get limit info
				const testLike = await rwClient.v2.like(id, "1522271563487272960")
				//! breaks when unable to like 
				//TODO: handel error

				console.log(testLike);

				limit = await rateLimitPlugin.v2.getRateLimit('users/:id/likes', 'POST')
				console.log(limit); //t
				return { limitFound: true, limit: limit };

			} else {
				return { limitFound: false, limit: limit };

			}


		} else if (type === "search") {
			let limit = await rateLimitPlugin.v2.getRateLimit("tweets/search/recent")

			if (!limit) {
				await rwClient.v2.search(process.env.Q, {
					'user.fields': 'name,description',
					expansions: 'author_id',
					max_results: 10,
				});
				limit = await rateLimitPlugin.v2.getRateLimit("tweets/search/recent")
			}
			return { limitFound: true, limit: limit };
		}

		else { return { limitFound: false } }
	} catch (err) {


	}
}


module.exports = { getLimitInfo, getCurrentUser };