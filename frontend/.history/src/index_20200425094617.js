import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { fetchListings } from "./actions/fetchListings";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import Products from "./containers/Listings";
import Product from "./containers/Listing";
import NavBar from "./containers/NavBar";
import Landing from "./containers/Landing";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

import theme from "./css/theme";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(reduxThunk))
);
// store.dispatch(fetchLiquors());

useEffect(() => {

}, []);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router >
        <NavBar />
        <Switch >
          <Route exact path="/" component={Landing} />
          {/* <Route path="/liquors" component={NavBar} /> */}
          {/* <Route exact path="/liquors" component={Products} />
          <Route exact path="/liquors/:id" component={Product} /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
