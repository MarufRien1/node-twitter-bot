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
    const dummyData = {
      arrayOfTweets: [
        { id: '1522419632438747137', text: 'test' },
        { id: '1522486320463073283', text: 'test 2' },
      ],
    };

    const result = await likeTweets(dummyData.arrayOfTweets);
    if (result.success) {
      console.log(result);
      console.log("success fully liked selected tweets");
    } else {
      console.log("failed to like selected tweets");
    }


  } catch (err) { console.log(err) }
};

main();
