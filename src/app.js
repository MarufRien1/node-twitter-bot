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
      { id: '1522419632438747137', text: 'test' },
      { id: '1522486320463073283', text: 'test 2' },
    ],
  };

  likeTweets(dummyData.arrayOfTweets);
};

main();
