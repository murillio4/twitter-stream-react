import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppBar, MuiThemeProvider } from 'material-ui';
import 'normalize.css';

import Menu from './components/Menu';
import Page from './components/Page';

import store from './store';

const App = () => (
	<Provider store={store}>
		<MuiThemeProvider>
			<div>
        <Menu/>
        <div style={{paddingLeft: "300px"}}>
          <AppBar showMenuIconButton={false} />
          <Page />
        </div>
      </div>
		</MuiThemeProvider>
	</Provider>
);

render(
  <App />,
  document.getElementById('app')
);