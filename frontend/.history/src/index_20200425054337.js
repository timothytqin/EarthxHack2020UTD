import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { fetchListings } from './actions/fetchListings';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import Products from './containers/Listings';
import Product from './containers/Listing';
import NavBar from './containers/NavBar';
import Landing from './containers/Landing';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(reduxThunk))
);
// store.dispatch(fetchLiquors());

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route exact path="/" component={Landing} />
            <Route path="/liquors" component={NavBar} />
            <Route exact path="/liquors" component={Products} />
            <Route exact path="/liquors/:id" component={Product} />
        </Router>
    </Provider>,
    document.getElementById('root')
);
