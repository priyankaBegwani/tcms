import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, HashRouter, Switch } from 'react-router-dom';
import  configureStore from './store';
import App from './containers/App/index.js';
import HomePage from './containers/HomePage/index.js';
import LoginPage from './containers/LoginPage/index.js';
import SignUpPage from './containers/SignUpPage/index.js';
import SearchPage from './containers/SearchPage/index.js';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import EnsureLoggedInContainer from './containers/EnsureLoggedInContainer/index.js';

const store = configureStore();
ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
  <Provider store={store}>
  	<HashRouter hashType="noslash">
    		<App>
          <Switch>
      			<Route exact path="/" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/home" component={EnsureLoggedInContainer(HomePage)} />
            <Route exact path="/search" component={EnsureLoggedInContainer(SearchPage)} />
          </Switch>
    		</App>
  	</HashRouter>
  </Provider></MuiThemeProvider>,document.getElementById('react-app')
);
