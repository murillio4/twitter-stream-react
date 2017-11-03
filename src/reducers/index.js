import { LOAD_TWEETS, NEW_TWEET, TOGGLE_STREAM } from '../actions';

const initialState = {
  stream: false,
  new_tweets: [],
  loaded_tweets: [] 
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TWEETS:
      return {
        ...state,
        loaded_tweets: [
          ...state.new_tweets,
          ...state.loaded_tweets
        ].slice(0,100), //max store 100 tweets
        new_tweets: []
      }
    
    case NEW_TWEET:
      return {
        ...state,
        new_tweets: [ 
          JSON.parse(action.tweet),
          ...state.new_tweets
        ].slice(0,100)
      }

    case TOGGLE_STREAM: 
      return {
        ...state,
        stream: (state.stream?false:true)
      }

    default:
      return state
  }
}

export default reducer