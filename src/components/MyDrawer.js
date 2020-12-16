import { Drawer, FormControlLabel, Switch, useTheme } from '@material-ui/core'
import React from 'react'

const MyDrawer = ({drawerState, setDrawerState, darkMode, setDarkMode}) => {
    const theme = useTheme()
    
    return (
        <Drawer anchor="left" open={drawerState} onClose={() => setDrawerState(!drawerState)}>
            <div style={{width: '15rem', backgroundColor: theme.palette.background.default, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{height: '12rem', backgroundColor: theme.palette.primary.main, textAlign: 'center', paddingTop: '2rem', boxSizing: 'border-box', width: '100%'}}>
                    <h1>Unklab.fun</h1>
                </div>
                <FormControlLabel
                    control={
                        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} name="darkModeToggle" />
                    }
                    label="Dark Mode"
                />
            </div>
        </Drawer>
    )
}

export default MyDrawer