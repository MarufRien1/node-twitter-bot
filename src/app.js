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

    //////////////
    console.log(selectedTweets);
    app.get("/", (req, res) => {
      ;
      res.send(selectedTweets)
    })

    /////////////////

    // likeTweets
    // const result = await likeTweets(dummyData.arrayOfTweets);
    // if (result.success) {
    //   console.log(result);
    //   console.log("success fully liked selected tweets");
    // } else {
    //   console.log("failed to like selected tweets");
    // }


  } catch (err) { console.log(err) }
};

main();


app.listen(3000, () => { console.log("server in running"); })