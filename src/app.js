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

//main function
const main = async () => {
  let filteredTweets = [];

  while (filteredTweets.length < 49) {
    const search = await getTweets();
    const newTweets = await filterTweets(search);
    filteredTweets = [...filteredTweets, ...newTweets];
  }

  if (filteredTweets.length > 50) {
    const newTweets = filteredTweets.filter((tweet, i) => i < 50);
    filteredTweets = [...newTweets];
  }

  likeTweets(filteredTweets);

  // // send data to browser to display
  // app.get('/', (req, res) => {
  //   res.send(filteredTweets);
  // });
};

setInterval(main, 900000);

// node server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
