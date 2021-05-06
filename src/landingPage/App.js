import React, { Component } from "react";
import "./App.css";
import routes from "./routes";
import {
  withRouter,
  Route,
  Switch,
  BrowserRouter as Router
} from "react-router-dom";

//  Magnific-popup
import "./assets/css/magnific-popup.css";

//  css
import "./assets/css/bootstrap.min.css";
import "./assets/css/icons.css";
import "./assets/css/style.css";
import Index from "./pages2/index5/index5";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Index />;
  }
}

export default withRouter(App);
