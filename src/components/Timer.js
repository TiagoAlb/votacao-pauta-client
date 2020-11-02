import React from 'react'
import { red, grey } from '@material-ui/core/colors'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CountdownTimer from './adapted-timer-component'

const useStyles = makeStyles(theme => ({
    root: {
        margin: 'theme.spacing(1)',
        textAlign: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    },
    text: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary
    }
}))

export default function Timer(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Typography variant='subtitle2' className={classes.text}>
                {props.seconds > 0 ? 'Tempo para finalização da votação'
                    : (props.error ? 'Votação encerrada! Ninguém votou. '
                        : 'Votação encerrada!')}
            </Typography>
            {props.seconds > 0 ?
                <CountdownTimer onEnd={props.endVoting} count={props.seconds} backgroundColor='transparent' color={red[600]} size={20} responsive />
                :
                <CountdownTimer count={0} backgroundColor='transparent' color={red[600]} size={20} responsive />
            }
        </div>
    )
}