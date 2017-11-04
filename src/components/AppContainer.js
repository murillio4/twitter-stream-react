import React, { Component } from 'react'
import io from 'socket.io-client'
import { MuiThemeProvider, AppBar } from 'material-ui'

import Menu from './Menu';
import Page from './Page';

let ws;

class AppContainer extends Component {
	constructor(props) {
		super(props)

		ws = io.connect('http://localhost:9000')
	}

	componentWillUnmount() {
		ws.disconnect()
	}

	render() {
		return (
            <MuiThemeProvider>
            <div>
              <Menu ws={ws}/>
              <div style={{paddingLeft: "290px"}}>
                <AppBar showMenuIconButton={false} />
                <Page ws={ws}/>
              </div>
            </div>
          </MuiThemeProvider>
		)
	}
}

export default AppContainer