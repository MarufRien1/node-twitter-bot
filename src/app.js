const express = require('express');
// const bodyParser = require('body-parser');
const { TwitterApi } = require('twitter-api-v2');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// authontication
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

const getUser = async () => {
  const user = await rwClient.v2.me();
  console.log(user);
};
getUser();

// node server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
