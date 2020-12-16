import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography, Slide, useScrollTrigger} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}))

const HideOnScroll = (props) => {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    )
}

const NavBar = ({setDrawerState}) => {
    const classes = useStyles()
    let history = useHistory()
    
    return (
        <React.Fragment>
            <HideOnScroll>
                <AppBar>
                    <Toolbar>
                        <IconButton edge='start' className={classes.menuButton} onClick={() => setDrawerState(true)}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant='h6' className={classes.title} onClick={() => history.push('/')}>
                            Unklab.fun
                        </Typography>
                        <Button color='inherit' onClick={e => {e.preventDefault(); window.location.href="https://t.me/unklab_bot/"}}>
                            Buat Postingan
                        </Button>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </React.Fragment>
    )
}

export default NavBar