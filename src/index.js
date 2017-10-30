import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
//import registerServiceWorker from './registerServiceWorker';
import {MuiThemeProvider} from 'material-ui/styles';
import {Toolbar} from 'material-ui';
import 'normalize.css';

const App = () => (
	<Provider >
		<MuiThemeProvider>
			<Toolbar />
		</MuiThemeProvider>
	</Provider>
);

render(
  <App />,
  document.getElementById('app')
);

//registerServiceWorker();
