const express = require('express');
const fetch = require('node-fetch');
const app = express();
const rateLimitPlugin = require('./auth');
//local
const {
  getTweets,
  filterTweets,
  recordData,
  likeTweets,
} = require('./twitter');

app.get('/', (req, res) => { res.send('Node JS twitter bot') });
const main = async () => {
  try {

    awake = await fetch("https://node-twitter-bot-js.herokuapp.com/")


    const searchResult = await getTweets();
    const selectedTweets = await filterTweets(searchResult);
    const operationResult = await likeTweets(selectedTweets);
    console.log(operationResult);

  } catch (err) { console.log(err) }
};

setInterval(main, 1000 * 60 * 1);

app.listen(process.env.PORT, () => { console.log('Server started') });