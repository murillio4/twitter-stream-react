import { UPDATE_FILTER, TOGGLE_STREAM } from '../actions';

const initialState = {
	stream: false,
	stream_filter: "statuses/filter",
	trackers: []
}

const filter = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_FILTER:
			return {
				...state,
				trackers: action.trackers,
				stream_filter: action.stream_filter
			}

		case TOGGLE_STREAM:
			return {
				...state,
				stream: state.stream ? false : true
			}

		default:
			return state
	}
}

export default filter
