import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppBar, MuiThemeProvider } from 'material-ui';
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

import 'normalize.css';

import Menu from './components/Menu';
import Page from './components/Page';

import { store, history } from './store';

const AppContainer = () => (
  <MuiThemeProvider>
    <div>
      <Menu/>
      <div style={{paddingLeft: "400px"}}>
        <AppBar showMenuIconButton={false} />
        <Page />
      </div>
    </div>
  </MuiThemeProvider>
);

const App = () => (
	<Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={AppContainer} />
    </ConnectedRouter>
	</Provider>
);

render(
  <App />,
  document.getElementById('app')
);