import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2),
    },
}))

const MyCard = ({img, imgTitle}) => {
    const [imageData, setImageData] = useState('')
    const classes = useStyles()

    useEffect(() => {
        setImageData(`https://picsum.photos/id/${img.id}/${parseInt(img.w/img.h * window.innerHeight)}/${parseInt(img.h/img.w * window.innerWidth)}`)
    }, [])

    return (
        <Card className={classes.root}>
            <CardActionArea>
                {
                    imageData.length < 1 ? null : <CardMedia image={imageData} style={{height: img.h/img.w * window.innerWidth}}/>
                }
                <CardContent>
                    <Typography variant="body2">
                        {imgTitle}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default MyCard