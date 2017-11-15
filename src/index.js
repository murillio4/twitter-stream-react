import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import 'normalize.css';

import AppContainer from './components/AppContainer';

import { store, history } from './store';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={AppContainer} />
    </ConnectedRouter>
  </Provider>
);

render(<App />, document.getElementById('app'));
