import React from 'react';
import { red, grey } from '@material-ui/core/colors';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CountdownTimer from "./adapted-timer-component";

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    }
}));

export default function Timer(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {props.seconds > 0 ?
                <CountdownTimer onEnd={props.endVoting} count={props.seconds} backgroundColor="transparent" color={red[600]} size={20} responsive />
                : ''}
        </div>
    );
}