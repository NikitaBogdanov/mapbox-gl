import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {createStore} from 'redux';
import './index.css';
import App from './pages/App';
import App2 from './pages/App2';
import combineReducers from './reducers';


const initialState = localStorage.getItem("geoData") ? {
    map: {
        geoData: {
            payload: JSON.parse(localStorage.getItem("geoData")),
        }
    },
} : {};

export const store = createStore(combineReducers, initialState);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={App} exact/>
            <Route path="/welcome" component={App2} exact/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
