import React, { useCallback, useEffect, useRef } from 'react'
import {Typography} from '@material-ui/core'
import Card from './Card.js'
import {GridLayout} from '@egjs/react-infinitegrid'

const Main = ({layoutState, setLayoutState, imageApi, fetchImages}) => {
    const gridLayout = useRef()

    const saveScrollPosition = useCallback((groupKey, idx) => {
        setLayoutState({status: gridLayout.current.getStatus(), element: gridLayout.current.getElements(), groupKey, idx})

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        document.title = "Unklab.fun - Home"
    }, [])

    return (
        <div>
            <GridLayout
                ref={gridLayout}
                style={{width: "100%", marginTop:'5rem'}}
                loading={
                    <div style={{
                        height: '5rem',
                        width: '100%'}}
                    >
                        <Typography variant="body1" display="block" align="center" style={{marginTop: '2rem'}}>
                            Sedang memuat lebih banyak post...
                        </Typography>
                    </div>
                }
                groupBy={item => item.props['data-groupkey']}
                layoutOptions={{
                    margin: 10,
                    align: "center",
                }}
                options={{
                    isOverflowScroll: false,
                    useRecycle: true,
                    horizontal: false,
                    useFit: false,
                    threshold: 2500
                }}
                onAppend={e => {
                    if (e.currentTarget.isProcessing()) {
                        return
                    }

                    if(parseInt(imageApi.page_now) === imageApi.last_page)
                        return
                    
                    e.startLoading()
                    fetchImages(e.endLoading)
                }}
                onLayoutComplete={e => {
                    if(layoutState !== null) {
                        gridLayout.current.moveTo(layoutState.groupKey, layoutState.idx)
                        setLayoutState(null)
                    }
                }}
            >
                {
                    imageApi.posts.map(el =>
                        <Card 
                            data-groupkey={el.groupKey} 
                            key={el.id} 
                            imgTitle={el.caption} 
                            img={el.media} 
                            hasMedia={el.has_media} 
                            postId={el.post_id} 
                            saveScrollPosition={saveScrollPosition}

                            groupKey={el.groupKey}
                            idx={el.id}
                        />
                    )
                }
            </GridLayout>
            
        </div>
    )
}

export default Main