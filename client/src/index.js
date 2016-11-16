import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router , Route , IndexRoute , browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import Profile from './components/profile';
import Edit from './components/edit';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
import reducers from './reducers';
import {AUTH_USER} from './actions/types'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store =createStoreWithMiddleware(reducers);
const token =localStorage.getItem('token');

//If we have a token , consider the user to be signed in
if (token) {
    //we need to update application state
    store.dispatch({type : AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
      <Router history={browserHistory}>
          <Route path="/" component={App}>
              <IndexRoute component ={Welcome}/>
              <Route path="signin" component={Signin}/>
              <Route path="signout" component={RequireAuth(Signout)}/>
              <Route path="signup" component={Signup}/>
              <Route path="feature" component={RequireAuth(Feature)}/>
              <Route path="profile" component={RequireAuth(Profile)}/>
              <Route path="edit" component={RequireAuth(Edit)}/>

          </Route>
      </Router>
  </Provider>
  , document.querySelector('.container'));
