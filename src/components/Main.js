import React from 'react'
import {Typography} from '@material-ui/core'
import Card from './Card.js'
import {GridLayout} from '@egjs/react-infinitegrid'

const Main = () => {
    const [imageApi, setImageApi] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch("https://api.unklab.fun/latest/1/").then(resp => resp.json()).then(data => {
        setImageApi(data)
        setIsLoading(false)
        })
    }, [])

    if(isLoading) {
        return (
            <Typography>Loading...</Typography>
        )
    } else {
        return (
            <div style={{height: '100%'}}>
                <GridLayout>

                </GridLayout>
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