const { TwitterApi } = require('twitter-api-v2');
const dotenv = require('dotenv');
dotenv.config();

// authentication
const client = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY,

  appSecret: process.env.TWITTER_APP_SECRET,
  // Following access tokens are not required if you are
  // at part 1 of user-auth process (ask for a request token)
  // or if you want a app-only client (see below)
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

rwClient = client.readWrite;

module.exports = rwClient;
