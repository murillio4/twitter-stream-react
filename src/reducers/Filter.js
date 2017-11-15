import { UPDATE_FILTER, TOGGLE_STREAM } from '../actions';

const initialState = {
  stream: false,
  language: '',
  trackers: []
};

const filter = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FILTER:
      return {
        ...state,
        trackers: action.trackers,
        language: action.language
      };

    case TOGGLE_STREAM:
      return {
        ...state,
        stream: state.stream ? false : true
      };

    default:
      return state;
  }
};

export default filter;
