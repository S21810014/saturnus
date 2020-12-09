import React from 'react'
import {Typography} from '@material-ui/core'
import Card from './Card.js'

const Main = ({imageApi, isLoading}) => {
    if(isLoading) {
        return (
            <Typography>Loading...</Typography>
        )
    } else {
        return (
            <div>
                {
                    imageApi.map((el) =>
                        <Card key={el.id} imgTitle={el.author} img={{id: el.id, w: el.width, h: el.height}}/>
                    )
                }
            </div>
        )
    }
}

export default Main