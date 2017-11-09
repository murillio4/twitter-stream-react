export const NEW_TWEET = 'NEW_TWEET'
export const TOGGLE_STREAM = 'TOGGLE_STREAM'
export const UPDATE_FILTER = 'UPDATE_FILTER'
export const INIT_WEBSOCKET = 'INIT_WEBSOCKET'


export const newTweet = tweet => {
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
}

export const updateFilter = (trackers, language, stream_filter) => {
	return {
		type: UPDATE_FILTER,
		trackers,
		language,
		stream_filter
	}
}

export const initWebsocket = ws => {
	return {
		type: INIT_WEBSOCKET,
		ws
	}
}


export const toggleStreamSocket = () => {
	return (dispatch, getState) => {
		let { ws } = getState().tweet
		let { trackers, stream_filter, language, stream } = getState().filter

		dispatch(toggleStream())

		if (stream){
			ws.emit('stop-stream')
		} else {
			ws.emit('start-stream', JSON.stringify({ track: trackers, lang: language, filter: stream_filter }))
			dispatch(readySocket())
		}	
	}
}

export const updateFilterAsync = (trackers, language, stream_filter) => {
	return (dispatch, getState) => {
		let { stream } = getState().filter
		let { ws } = getState().tweet

		dispatch(updateFilter(trackers, language, stream_filter))

		if (stream && trackers.length == 0){
			dispatch(toggleStreamSocket())
		} else if (stream) {
			ws.emit('start-stream', JSON.stringify({ track: trackers, lang: language, filter: stream_filter }))
			dispatch(readySocket())
		}	
	}
}

export const readySocket = () => {
	return (dispatch, getState) => {
		getState().tweet.ws.emit('ready-stream')
	}
}
