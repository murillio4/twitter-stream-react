export const NEW_TWEET = 'NEW_TWEET';
export const TOGGLE_STREAM = 'TOGGLE_STREAM';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const INIT_WEBSOCKET = 'INIT_WEBSOCKET';

/**
 *
 * @param {Object} tweet tweet as JSON object
 */
export const newTweet = tweet => {
  return { type: NEW_TWEET, tweet };
};

/**
 *  Toggles stream on or of
 */
export const toggleStream = () => {
  return { type: TOGGLE_STREAM };
};

/**
 * Updates the filter s with content in parameters
 *
 * @param {String[]} trackers List of strings that you want to track
 * @param {String} language Language code ex; "en", "no"
 */
export const updateFilter = (trackers, language) => {
  return { type: UPDATE_FILTER, trackers, language };
};

/**
 * Initialize open websocket stream you want the program to use
 *
 * @param {Object} ws Websocket object
 */
export const initWebsocket = ws => {
  return { type: INIT_WEBSOCKET, ws };
};

/**
 * Thunk async action thats dispatches toggle stream and stops and starts the server stream according
 * to the current stream state
 */
export const toggleStreamSocket = () => {
  return (dispatch, getState) => {
    let { ws } = getState().tweet;
    let { trackers, language, stream } = getState().filter;

    dispatch(toggleStream());

    if (stream) {
      ws.emit('stop-stream');
    } else {
      ws.emit(
        'start-stream',
        JSON.stringify({ track: trackers, lang: language })
      );
      ws.emit('ready-stream');
    }
  };
};

/**
 * Thunk async action that updates state filter and server filter
 *
 * @param {String[]} trackers List of strings that you want to track
 * @param {String} language Language code ex; "en", "no"
 */

export const updateFilterAsync = (trackers, language) => {
  return (dispatch, getState) => {
    let { stream } = getState().filter;
    let { ws } = getState().tweet;

    dispatch(updateFilter(trackers, language));

    if (stream && trackers.length === 0) {
      dispatch(toggleStreamSocket());
    } else if (stream) {
      ws.emit(
        'start-stream',
        JSON.stringify({ track: trackers, lang: language })
      );
      ws.emit('ready-stream');
    }
  };
};

/**
 * Thunk async action that informs the server that the clien is ready for data
 */
export const newTweetSocket = tweet => {
  return (dispatch, getState) => {
    let { ws } = getState().tweet;

    dispatch(newTweet(tweet));
    ws.emit('ready-stream');
  };
};
