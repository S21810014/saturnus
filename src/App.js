import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Main from './components/Main.js'
import NavBar from './components/NavBar.js'

function App() {
  const [imageApi, setImageApi] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("https://picsum.photos/v2/list").then(resp => resp.json()).then(data => {
      setImageApi(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <Router>
      <div style={{width: "100%", height: window.innerHeight}}>
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
