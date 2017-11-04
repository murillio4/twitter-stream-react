export const NEW_TWEET = 'NEW_TWEET';
export const TOGGLE_STREAM = 'TOGGLE_STREAM';


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
		
		if (!getState().twitter.stream)
			ws.emit('stop-stream', {})
		else
			ws.emit('start-stream', JSON.stringify({ track: ["video"], filter:"tweet"}))
	}
}
