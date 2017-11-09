import { NEW_TWEET, INIT_WEBSOCKET } from '../actions';

const initialState = {
	new_tweets: [],
	ws: null
}

const tweet = (state = initialState, action) => {
	switch (action.type) {
		case NEW_TWEET:
			let isIn = state.new_tweets.find((tweet) => {
				return tweet.id === action.tweet.id
			});

			if (isIn === undefined) {
				return {
					...state,
					new_tweets: [
						action.tweet,
						...state.new_tweets
					].slice(0, 50)
				}
			}

			return state

		case INIT_WEBSOCKET:
			return {
				...state,
				ws: action.ws
			}

		default:
			return state
	}
}

export default tweet