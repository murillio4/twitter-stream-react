import React, { Component } from 'react'
import { connect } from 'react-redux'
import { newTweet, readySocket } from '../actions'
import Tweet from './Tweet/Tweet'

const mapStateToProps = (state = {}) => {
	return { ...state.tweet };
};

class Page extends Component {
	constructor(props) {
		super(props)
		const { dispatch, ws } = this.props

		ws.on('new-stream-data', res => {
			dispatch(newTweet(res))
			dispatch(readySocket())
		});
	}

	render() {
		const { new_tweets } = this.props

		return (
			<ol style={{ width: "588px", listStyle: "none", listStylePosition: "inside", margin: "auto" }}>
				{new_tweets.map((tweet, index) =>
					<li key={tweet.id}>
						<Tweet data={tweet} />
					</li>
				)}
			</ol>
		)
	}
}

export default connect(mapStateToProps)(Page)