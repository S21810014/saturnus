import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Main from './components/Main.js'
import NavBar from './components/NavBar.js'
import PostDetails from './components/PostDetail'
import Drawer from './components/MyDrawer'
//import * as color from 'color'

function App() {
  const [layoutState, setLayoutState] = useState(null)
  const [imageApi, setImageApi] = useState(null)
  const [drawerState, setDrawerState] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
  })
  

  const fetchImages = (endLayoutCallback) => {
      if(imageApi === null) {
          fetch(`https://api.unklab.fun/latest/1/`).then(resp => resp.json()).then(data => {
                  setImageApi(() => {
                      return {
                          ...data.data,
                          page_now: parseInt(data.data.page_now),
                          posts: data.data.posts.map((el, idx) => ({...el, groupKey: 0, id: idx}))
                      }
                  })
                  endLayoutCallback()
              })
      } else {
          if(parseInt(imageApi.page_now) !== imageApi.last_page) {
              fetch(`https://api.unklab.fun/latest/${parseInt(imageApi.page_now) + 1}/`).then(resp => resp.json()).then(data => {
                  setImageApi(prevState => {
                    return {
                        page_now: data.data.page_now,
                        last_page: data.data.last_page,
                        posts: [...prevState.posts, ...data.data.posts.map((el, idx) => ({...el, groupKey: parseInt(data.data.page_now) - 1, id: prevState.posts.length + idx}))]
                    }
                  })
                  return true
              }).then(idk => endLayoutCallback())
          }
      }
  }

  useEffect(() => {
    fetchImages(() => console.log("firstFetch"))
    document.title = "Unklab.fun"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Router>


      <ThemeProvider theme={theme}>
          <Drawer drawerState={drawerState} setDrawerState={setDrawerState} setDarkMode={setDarkMode} darkMode={darkMode}/>
          <NavBar setDrawerState={setDrawerState}/>

          <Switch>
            <Route exact path="/">
              {imageApi !== null ? 
                <Main 
                  layoutState={layoutState} 
                  setLayoutState={setLayoutState} 
                  imageApi={imageApi}
                  fetchImages={fetchImages}
                /> : <div> Getting posts... </div>}
            </Route>
            <Route exact path="/post/:postId">
              <PostDetails/>
            </Route>
          </Switch>

      </ThemeProvider>


    </Router>
  );
}

export default App;
