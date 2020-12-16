import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {applyMiddleware, createStore} from 'redux';
import {save, load} from 'redux-localstorage-simple';
import './index.css';
import Map from './pages/Map';
import App2 from './pages/App2';
import combineReducers from './reducers';


export const store = createStore(combineReducers, load(), applyMiddleware(save()));

ReactDOM.render(
    <Provider store={store}>
        <Router basename="/mapbox-gl-app/#">
            <Route path="/" component={Map} exact/>
            <Route path="/welcome" component={App2} exact/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
