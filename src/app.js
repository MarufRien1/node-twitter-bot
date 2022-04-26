const express = require('express');
const app = express();

//local
const {
  getTweets,
  filterTweets,
  recordData,
  likeTweets,
} = require('./twitter');

const main = async () => {
  const search = await getTweets();

  const filtered = await filterTweets(search);

  app.get('/', (req, res) => {
    res.send(search);
  });
};
main();

// node server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
