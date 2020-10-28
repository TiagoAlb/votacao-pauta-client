import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import loginService from '../services/Login'
import NTConsultLogo from '../assets/img/nt_consult_logo.png'
import SicrediLogo from '../assets/img/sicredi_logo.png'
import LinkedInCard from '../components/LinkedInCard'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1)
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export default function Dashboard(props) {
    const classes = useStyles()

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <div>
                    <img src={NTConsultLogo} width="150" />
                    <img src={SicrediLogo} className={classes.menuButton} width="120" />
                </div>
                <br />
                <Typography component="h1" variant="h5">
                    Seja bem-vindo, {props.user ? props.user.nome : ''}
                </Typography>
            </div>
        </Container>
    )
}