import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2),
    },
}))

const MyCard = ({img, imgTitle, hasMedia}) => {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardActionArea>
                {hasMedia ? <CardMedia component="img" image={img}/> : null}
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