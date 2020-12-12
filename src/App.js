import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Main from './components/Main.js'
import NavBar from './components/NavBar.js'
import PostDetails from './components/PostDetail'

function App() {
  const [layoutState, setLayoutState] = useState(null)
  const [imageApi, setImageApi] = useState(null)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    document.title = "Unklab.fun"
  }, [])

  return (
    <Router>
      <div style={{width: "100%"}}>
        <NavBar/>

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
      </div>
    </Router>
  );
}

export default App;
