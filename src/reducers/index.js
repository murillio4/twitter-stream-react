import { LOAD_TWEET, TOGGLE_STREAM } from '../actions';

const initialState = {
  stream: false,
  tweets: [] 
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TWEET:
      return {
        ...state,
        data: [...state.tweets, action.tweet]
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