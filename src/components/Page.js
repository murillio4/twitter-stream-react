import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleStreamSocket, newTweet, readySocket } from '../actions'
import Tweet from './Tweet/Tweet'
import { Card } from 'material-ui/Card'

const mapStateToProps = (state = {}) => {
	return { ...state.twitter };
};

class Page extends Component {
	constructor(props) {
		super(props)
		const { dispatch, ws } = this.props

		//dispatch(toggleStreamSocket(ws))

		ws.on('new-stream-data', (res) => {
			dispatch(newTweet(res))
		});
	}

	componentWillUnmount() {
		this.props.ws.disconnect()
	}

	componentDidUpdate() {
		this.props.dispatch(readySocket(this.props.ws))
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