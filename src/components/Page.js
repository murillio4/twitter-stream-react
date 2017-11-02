import React, { Component } from 'react'
import { connect } from 'react-redux'
import Vtdlist from './Test'
import { toggleStreamSocket, loadTweet } from '../actions'
import io from 'socket.io-client'

let ws;

const mapStateToProps = (state = {}) => {
    return {...state};
};


class Menu extends Component {
	constructor(props) {
		super(props)
		const {dispatch} = this.props

		ws = io.connect('http://localhost:9000')

		dispatch(toggleStreamSocket(ws))

		ws.on('new-stream-data', (res)=>{
			console.dir(res)
			dispatch(loadTweet(res))
		});

		ws.on('wrong-format', (res)=>{
			console.dir(res)
		});
	}

	componentWillUnmount() {
		ws.disconnect()
	}

	render() {
		return (
			<div></div>
		)
	}
}

export default connect(mapStateToProps)(Menu)