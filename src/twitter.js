require('dotenv').config();
const { rwClient, rateLimitPlugin, ApiResponseError } = require('./auth.js');
const { getLimitInfo, getCurrentUser } = require("./helper")
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


const filterTweets = async () => { };

const likeTweets = async (tweets) => {
  try {
    const currentLimit = await getLimitInfo()
    const currentUser = await getCurrentUser();


    if (currentLimit.limitFound && currentLimit.limit.remaining > 0) {

      let maxLoops;

      if (+currentLimit.limit.remaining >= tweets.length) {
        maxLoops = tweets.length

      } else {
        maxLoops = +currentLimit.limit.remaining
      }

      for (let i = 0; i < maxLoops; i++) {

        await rwClient.v2.like(currentUser.id, tweets[i].id)

        console.log("liked tweet with id: " + tweets[i].id);
      }

      // calculate remaining time to next limit
      const currentTime = Date.now()
      let resetTime = currentLimit.limit.reset
      resetTime = resetTime.toString() + "000"
      resetTime = Number(resetTime)


      const diff = (resetTime - currentTime) / 1000 / 60
      console.log(currentTime, resetTime, diff)

      return { success: true, remaining: diff }

    } else {
      console.log("failed to like tweets");

    }

    // if has limit
    //like tweet until limit is reached
    // return limit and reset data

    // else
    // handel err 
    // return error, limit and reset data   
  } catch (err) { console.log(err); }
};


// send statical data to a database or a spreed sheet
const recordData = async () => { };

module.exports = { getTweets, likeTweets, filterTweets, recordData };
