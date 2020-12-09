import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography, Slide, useScrollTrigger } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'

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

const NavBar = () => {
    const classes = useStyles()

    return (
        <React.Fragment>
            <HideOnScroll>
                <AppBar>
                    <Toolbar>
                        <IconButton edge='start' className={classes.menuButton}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant='h6' className={classes.title}>
                            Unklab.fun
                        </Typography>
                        <Button color='inherit'>
                            Buat Postingan
                        </Button>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar/>
        </React.Fragment>
    )
}

export default NavBar