import React, { useState, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '../components/AppBar'
import Drawer from '../components/Drawer'
import loginService from '../services/Login'
import AuthenticatedRoutes from '../routes/authenticated'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth,
        padding: theme.spacing(3),
        marginTop: theme.spacing(8)
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    }
}))

export default function Authenticated() {
    const classes = useStyles()
    const [open, setOpen] = useState(true)
    const [user, setUser] = useState(null)

    const handleDrawerOpen = () => {
        setOpen(!open)
    }

    const validateLogin = () => {
        loginService.validateLogin((success) => {
            setUser(success)
        }, (error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        validateLogin()
    }, [])

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar handleDrawerOpen={handleDrawerOpen} />
            <Drawer open={open} width={drawerWidth} />
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <Switch>
                    {AuthenticatedRoutes.map((prop, key) => {
                        if (prop.redirect)
                            return <Redirect from={prop.path} to={prop.to} key={key} />
                        else return (
                            <Route
                                path={prop.path}
                                key={key}
                                exact={true}
                                render={(props) => <prop.component  {...props}
                                    user={user} />}
                            />
                        )
                    })}
                </Switch>
            </main>
        </div>
    )
}