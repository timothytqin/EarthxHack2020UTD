import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import Listings from "./containers/Listings";
import Listing from "./containers/Listing";
import NavBar from "./containers/NavBar";
import Landing from "./containers/Landing";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ChatList from "./containers/ChatList";
import ChatFeed from "./containers/ChatFeed";
import Notifications from "./containers/Notifications";
import Profile from "./containers/Profile";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

import theme from "./css/theme";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <Route path="/" component={NavBar} />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/listings" component={Listings} />
          <Route exact path="/listings/:id" component={Listing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/chat" component={ChatList} />
          <Route exact path="/chat/:id" component={ChatFeed} />
          <Route exact path="/notifications" component={Notifications} />
          <Route exact path="/u/:username" component={Profile} />
        </Switch>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
