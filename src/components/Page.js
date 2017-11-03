import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleStreamSocket, loadTweetsAsync, newTweet } from '../actions'
import io from 'socket.io-client'
import Tweet from 'react-tweet'

let ws;

const mapStateToProps = (state = {}) => {
	return { ...state};
};

class Menu extends Component {
	constructor(props) {
		super(props)
		const { dispatch } = this.props

		ws = io.connect('http://localhost:9000')

		dispatch(toggleStreamSocket(ws))

		ws.on('new-stream-data', (res) => {
			dispatch(newTweet(res))
		});

		ws.on('wrong-format', (res) => {
			console.dir(res)
		});

		console.log(this.state)
	}

	componentDidMount() {
	  let timer = setInterval(() => {
      this.props.dispatch(loadTweetsAsync())
		}, 3000);
		
		this.setState({
			timer: timer
		});
	}

	componentWillUnmount() {
		this.clearInterval(this.state.timer);
	}

	render() {
		const { loaded_tweets, dispatch } = this.props

		return (
			<div>
				<Tweet data={loaded_tweets[0]} />

				
				<button onClick={() => { dispatch(toggleStreamSocket(ws)) }}>
					test
			</button>
			</div>
		)
	}
}

export default connect(mapStateToProps)(Menu)