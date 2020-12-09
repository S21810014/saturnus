import React, { useEffect, useState } from 'react'
import {Typography} from '@material-ui/core'
import Card from './Card.js'
import {GridLayout} from '@egjs/react-infinitegrid'

const Main = () => {
    const [imageApi, setImageApi] = useState(null)

    const fetchImages = (endLayoutCallback) => {
        if(imageApi === null) {
            fetch(`https://api.unklab.fun/latest/1/`).then(resp => resp.json()).then(data => {
                    setImageApi(() => {
                        return {
                            ...data.data,
                            page_now: parseInt(data.data.page_now),
                            posts: data.data.posts.map(el => ({...el, groupKey: 1}))
                        }
                    })
                })
        } else {
            if(parseInt(imageApi.page_now) !== imageApi.last_page) {
                fetch(`https://api.unklab.fun/latest/${parseInt(imageApi.page_now) + 1}/`).then(resp => resp.json()).then(data => {
                    setImageApi(prevState => ({
                        page_now: data.data.page_now,
                        last_page: data.data.last_page,
                        posts: [...prevState.posts, ...data.data.posts.map(el => ({...el, groupKey: prevState.page_now + 1}))]
                    }))
                    endLayoutCallback()
                })
            }
        }
    }

    useEffect(() => {
        console.log("component mount")
        fetchImages(() => console.log("ye"))
    }, [])

    if(imageApi === null) {
        return(
            <div>loading</div>
        )
    } else {
        return (
            <div>
                <GridLayout
                    style={{width: "100%"}}
                    loading={<div style={{
                                height: '5rem',
                                width: '100%'}}
                            >
                                <Typography variant="body1" display="block" align="center" style={{marginTop: '2rem'}}>
                                    Sedang memuat lebih banyak post...
                                </Typography>
                            </div>}
                    groupBy={item => item.props['data-groupkey']}
                    options={{
                        isOverflowScroll: false,
                        useRecycle: true,
                        horizontal: false,
                        useFit: false
                    }}
                    onAppend={e => {
                        if (e.currentTarget.isProcessing()) {
                            return;
                        }
                        
                        e.startLoading()
                        fetchImages(e.endLoading)
                    }}
                >
                    <div style={{height: '2rem', display: 'block'}}></div>
                    {
                        imageApi.posts.map(el =>
                            <Card data-groupkey={el.groupKey} key={el.id} imgTitle={el.caption} img={el.media} hasMedia={el.has_media}/>
                        )
                    }
                </GridLayout>
                
            </div>
        )
    }
}

export default Main