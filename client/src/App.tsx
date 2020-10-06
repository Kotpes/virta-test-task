import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './components/Home'
import Station from './components/Station'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/stations/:id">
          <Station />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>


  );
}

export default App;
