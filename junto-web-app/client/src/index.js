import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
import React from 'react';

// Load Global CSS
import '_static/css/main';

import configureStore from './store/configureStore';
import DevTools from 'containers/DevTools'

export const store = configureStore({});


import createRootRoute from './routes/rootRoute';


const muiTheme = getMuiTheme({
  palette: {
  },
});

const appMountPoint = 'root';

render((
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <DevTools />
        <Router
          history={browserHistory}
          routes={createRootRoute(store)}
        />
      </div>
    </MuiThemeProvider>
  </Provider>
),
  document.getElementById(appMountPoint)
);
