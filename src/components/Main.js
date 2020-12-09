import React from 'react'
import {Typography} from '@material-ui/core'
import Card from './Card.js'
import {GridLayout} from '@egjs/react-infinitegrid'

const Main = ({imageApi, isLoading}) => {
    if(isLoading) {
        return (
            <Typography>Loading...</Typography>
        )
    } else {
        return (
            <div style={{height: '100%'}}>
                {
                    imageApi.data.posts.map((el) =>
                        <Card key={el.id} imgTitle={el.caption} img={el.media} hasMedia={el.has_media}/>
                    )
                }
            </div>
        )
    }
}

export default Main