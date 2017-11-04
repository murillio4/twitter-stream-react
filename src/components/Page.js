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

		//rate limiting
		let last_check = Date.now(),
			rate = 4,
			per = 1,
			allowence = rate

		ws.on('new-stream-data', (res) => {
			const current = Date.now(),
				time_passed = current - last_check
			
			last_check = current
			allowence += time_passed * (rate / per)		
			
			if(allowence > rate) allowence = rate

			if(allowence != 0){
				dispatch(newTweet(res))
				allowence--
			}

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