import React from 'react'
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Reply from '@material-ui/icons/Reply'
import loginService from '../services/Login'
import menu from '../options/menu'

export default function DrawerComponent(props) {
    const useStyles = makeStyles((theme) => ({
        drawer: {
            width: props.width,
            flexShrink: 0
        },
        drawerPaper: {
            width: props.width,
        }
    }))

    const classes = useStyles()

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={props.open}
            classes={{
                paper: classes.drawerPaper
            }}
        >
            <Toolbar />
            <List>
                {menu.map((option) => (
                    <NavLink to={option.path} style={{ textDecoration: "none", color: "inherit" }} key={option.name}>
                        <ListItem button key={option.name}>
                            <ListItemIcon>
                                {option.icon}
                            </ListItemIcon>
                            <ListItemText primary={option.name} />
                        </ListItem>
                    </NavLink>
                ))}
                <Divider />
                <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }} onClick={() => { loginService.logout() }}>
                    <ListItem button>
                        <ListItemIcon>
                            <Reply />
                        </ListItemIcon>
                        <ListItemText primary="Sair" />
                    </ListItem>
                </NavLink>
            </List>
        </Drawer >
    )
}