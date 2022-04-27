const express = require('express');
const app = express();

//local
const {
  getTweets,
  filterTweets,
  recordData,
  likeTweets,
} = require('./twitter');

//main function
const main = async () => {
  const search = await getTweets();

  const filteredUser = await filterTweets(search);
  const filteredTweets = '';

  // send data to browser to display
  // app.get('/', (req, res) => {
  //   res.send(search);
  // });
  // app.get('/1', (req, res) => {
  //   res.send(filtered);
  // });
};
main();

// node server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
