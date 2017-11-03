//import { browserHistory } from 'react-router';

export const LOAD_TWEETS = 'LOAD_TWEETS';
export const NEW_TWEET = 'NEW_TWEET';
export const TOGGLE_STREAM = 'TOGGLE_STREAM';


//recieve new tweet from server
export const loadTweets = () => {
	return {
		type: LOAD_TWEETS
	}
};

export const newTweet = (tweet) => {
	return {
		type: NEW_TWEET,
		tweet
	}
}

//turn stream on/off
export const toggleStream = () => {
	return {
		type: TOGGLE_STREAM
	}
};

export const toggleStreamSocket = (ws) => {
	return (dispatch, getState) => {
		dispatch(toggleStream());
		
		if (!getState().stream)
			ws.emit('stop-stream', {})
		else
			ws.emit('start-stream', JSON.stringify({ track: ["trump"], filter:"tweet"}))
	}
}

export const loadTweetsAsync = () => {
	return (dispatch, getState) => {
		console.log(getState().new_tweets.length)
		console.log(getState().loaded_tweets.length)
		if(getState().new_tweets.length !== 0){
			dispatch(loadTweets())
		}
	}
}
