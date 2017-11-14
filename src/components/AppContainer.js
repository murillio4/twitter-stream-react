import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { MuiThemeProvider, AppBar } from 'material-ui'
import { initWebsocket, newTweetSocket } from '../actions'

import Menu from './Menu';
import Page from './Page';

const mapStateToProps = (state = {}) => {
	return { ...state.tweet.ws };
};

/**
 * Wrapper for whole client with websocket setup
 */
class AppContainer extends Component {
	constructor(props) {
		super(props)
		let { dispatch } = this.props

		let ws = io.connect('http://localhost:9000')
		dispatch(initWebsocket(ws))

		ws.on('new-stream-data', tweet => {
			dispatch(newTweetSocket(tweet))
		});
	}

	componentWillUnmount() {
		if (this.props.ws !== null)
			this.props.ws.disconnect()
	}

	render() {
		return (
			<MuiThemeProvider>
				<div>
					<Menu />
					<div style={{ paddingLeft: "290px" }}>
						<AppBar showMenuIconButton={false} />
						<Page />
					</div>
				</div>
			</MuiThemeProvider>
		)
	}
}

export default connect(mapStateToProps)(AppContainer)