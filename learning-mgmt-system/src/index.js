import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.css';
import App from './components/App';
import reducers from './components/reducers';
import * as serviceWorker from './serviceWorker';

const initialState = {
    login: {
        user: "Tamar Jacobs",
        email: "tajacobs@deloitte.com.au"
    },
    plan: {
        activePlan: null,
        userPlan: null,
        allPlan: null
    }
}

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </HashRouter>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
