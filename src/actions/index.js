//import { browserHistory } from 'react-router';

export const LOAD_TWEET = 'LOAD_TWEETS';
export const TOGGLE_STREAM = 'TOGGLE_STREAM';
export const CHANGE_FILTER = 'CHANGE_FILTER';

//recieve new tweet from server
export const loadTweet = tweet => {
    return {
        type: LOAD_TWEET,
        tweet
    }
};

//turn stream on/off
export const toggleStream = () => {
    return {
        type: TOGGLE_STREAM
    }
};

export const toggleStreamSocket = (ws) => {
    return (dispatch, getState) => {
        ws.emit('new-stream', JSON.stringify({track:"pewdiepie"}))
    }
}

export const changeTrackerSocket = (ws) => {

}
