import "./App.css";
import React, { Component } from "react";
import HomePage from "./components/HomePage";
import UserPage from "./components/UserPage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/user" key={this.props.userID} component={UserPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userID: state.userID,
  };
};

export default connect(mapStateToProps)(App);
