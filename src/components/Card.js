import { Card, CardActionArea, CardContent, CardMedia, Typography, Zoom } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'

const MyCard = ({img, imgTitle, hasMedia, postId, saveScrollPosition, groupKey, idx}) => {
    //const [imgState, setImgState] = useState(false)
    let history = useHistory()

    // useEffect(() => {
    //     let _img = new Image()
    //     _img.src = img
    //     _img.onload = async () => setImgState(true)

    //     if(!hasMedia)
    //         setImgState(true)

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    return (
        <div style={{width: '90%'}}>
            <Zoom in={true} timeout={400} style={{transitionDelay: '500ms'}}>
                <Card>
                    <CardActionArea onClick={() => {
                            saveScrollPosition(groupKey, idx % 12)
                            history.push(`/post/${postId}`)
                        }}>
                        {hasMedia ? <CardMedia 
                            component="img" 
                            image={img} 
                            style={{width: '100%'}}
                        /> : null}
                        {imgTitle.length > 0 ? <CardContent>
                            <Typography variant="body2">
                                {imgTitle}
                            </Typography>
                        </CardContent> : null}
                    </CardActionArea>
                </Card>
            </Zoom>
        </div>
    )
}

export default MyCard