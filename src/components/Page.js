import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleStreamSocket, newTweet } from '../actions'
import io from 'socket.io-client'
import Tweet from './Tweet/Tweet'
import { Card } from 'material-ui/Card'

let ws;

const mapStateToProps = (state = {}) => {
	return { ...state.twitter };
};

class Page extends Component {
	constructor(props) {
		super(props)
		const { dispatch } = this.props

		ws = io.connect('http://localhost:9000')

		dispatch(toggleStreamSocket(ws))

		ws.on('new-stream-data', (res) => {
			dispatch(newTweet(res))
		});
	}

	componentWillUnmount() {
		ws.disconnect()
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