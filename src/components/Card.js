import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core'
import React from 'react'

const MyCard = ({img, imgTitle, hasMedia}) => {
    return (
        <div style={{width: '100%'}}>
            <Card style={{margin: '1rem'}}>
                <CardActionArea>
                    {hasMedia ? <CardMedia component="img" image={img}/> : null}
                    <CardContent>
                        <Typography variant="body2">
                            {imgTitle}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>

        // <div style={{width: window.innerWidth}}>
        //     {hasMedia ? <img src={img} style={{width: '100%'}}/> : null}
        //     {hasMedia ? "HAS" : " TIDAK HAS"}
        // </div>
    )
}

export default MyCard