/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import './styles/styles.css';
import '../node_modules/toastr/build/toastr.min.css';
import App from './components/App';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {loadUser} from './actions/userActions';
import {loadGames} from './actions/gamesActions';
import "react-datepicker/dist/react-datepicker-cssmodules.css";

const store = configureStore();
store.dispatch(loadUser());
store.dispatch(loadGames());

render(<Provider store={store}>
        <App/>
      </Provider>,
  document.getElementById('app')
);
