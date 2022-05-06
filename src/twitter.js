require('dotenv').config();
const { rwClient, rateLimitPlugin, ApiResponseError } = require('./auth.js');
const blackListWords = [
  'bot',
  'robot',
  'retweet',
  'retweets',
  '_bot',
  '_robot',
];

// get tweets with selected query
const getTweets = async () => {};

// filter tweets,user,description for blacklisted words
const filterTweets = async () => {};

const likeTweets = async () => {};

// send statical data to a database or a spreed sheet
const recordData = async () => {};

module.exports = { getTweets, likeTweets, filterTweets, recordData };
