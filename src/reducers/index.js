import { NEW_TWEET, TOGGLE_STREAM } from '../actions';

const initialState = {
  stream: false,
  new_tweets: [],
  loaded_tweets: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {    
    case NEW_TWEET:
      let isIn = state.new_tweets.find((tweet) => {
        return tweet.id === action.tweet.id
      });

      if(isIn === undefined && state.stream){
        return {
          ...state,
          new_tweets: [ 
            action.tweet,
            ...state.new_tweets
          ].slice(0,50)
        }  
      }
      
      return state

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