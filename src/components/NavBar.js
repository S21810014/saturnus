import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core'
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

const NavBar = () => {
    const classes = useStyles()

    return (
        <AppBar position="static">
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
    )
}

export default NavBar