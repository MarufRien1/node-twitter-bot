require('dotenv').config();
const { rwClient, rateLimitPlugin, ApiResponseError } = require('./auth.js');
const { getLimitInfo } = require("./helper")
const blackListWords = [
  'bot',
  'robot',
  'retweet',
  'retweets',
  '_bot',
  '_robot',
];

// get tweets with selected query
const getTweets = async () => { };

// filter tweets,user,description for blacklisted words
const filterTweets = async () => { };

const likeTweets = async (tweets) => {
  // 1 check if has limit
  const currentLimit = await getLimitInfo()
  console.log(currentLimit);

  // if has limit
  //like tweet until limit is reached
  // return limit and reset data

  // else
  // handel err 
  // return error, limit and reset data   

};


// send statical data to a database or a spreed sheet
const recordData = async () => { };

module.exports = { getTweets, likeTweets, filterTweets, recordData };
