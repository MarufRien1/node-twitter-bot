const express = require('express');
const app = express();
const rateLimitPlugin = require('./auth');
//local
const {
  getTweets,
  filterTweets,
  recordData,
  likeTweets,
} = require('./twitter');

const main = async () => {
  try {

    const searchResult = await getTweets();
    const selectedTweets = await filterTweets(searchResult);
    const operationResult = await likeTweets(selectedTweets);
    console.log(operationResult);

  } catch (err) { console.log(err) }
};

setInterval(main, 1000 * 60 * 5);
