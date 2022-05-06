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
  const dummyData = {
    arrayOfTweets: [
      { id: '1', text: 'test' },
      { id: '2', text: 'test 2' },
    ],
  };

  likeTweets(dummyData.arrayOfTweets[0]);
};

main();
