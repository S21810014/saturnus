import { Card, CardActionArea, CardContent, CardMedia, Toolbar, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DateTime } from 'luxon'

const PostDetail = () => {
    const {postId} = useParams()
    const [detailData, setDetailData] = useState(null)

    // eslint-disable-next-line
    useEffect(() => {
        console.log('coroma vimrus')
        fetch(`https://api.unklab.fun/get/${postId}`)
            .then(resp => resp.json())
            .then(data => {
                setDetailData(data.data)
            })

            document.title = `Unklab.fun - ${postId}`
    }, [postId])

    const formatDate = (dateStr) => {
        let d = DateTime.fromISO(dateStr, {zone: 'local'})
    
        return d.setLocale('id').toFormat("d LLLL yyyy") + " jam " + (d.hour % 12 + ":" + d.second) + " " + ((d.hour > 12) ? ((d.hour % 12) > 6 ? "malam" : "siang") : ((d.hour % 12 > 5) ? "pagi" : "subuh"))
    }

    return (
        detailData !== null ? 
            <div>
                <Toolbar/>
                <Card style={{margin: '1rem'}}>
                    <CardActionArea>
                        {detailData.has_media ? <CardMedia component="img" image={detailData.media.original} style={{width: '100%'}}/> : null}
                        <CardContent>
                        {
                            detailData.caption.length > 0 ? 
                                <Typography variant="h5" component='h2'>
                                    {detailData.caption}
                                </Typography> : null
                        }
                            <Typography variant="body2">
                                {formatDate(detailData.published)}
                            </Typography>

                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
            :
            <div>Loading...</div> 
    )
}

export default PostDetail