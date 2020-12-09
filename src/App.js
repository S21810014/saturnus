import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Main from './components/Main.js'
import NavBar from './components/NavBar.js'

function App() {

  return (
    <Router>
      <div style={{width: "100%"}}>
        <NavBar/>

        <Switch>
          <Route path="/">
            <Main/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
