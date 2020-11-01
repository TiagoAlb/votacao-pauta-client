import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2),
        textAlign: 'center'
    }
}));

export default function LinkedInCard() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div
                className="LI-profile-badge"
                data-version="v1"
                data-size="medium"
                data-locale="pt_BR"
                data-type="vertical"
                data-theme="dark"
                data-vanity="tiago-albuquerque-7aa63275">
                <a className="LI-simple-link"
                    href='https://br.linkedin.com/in/tiago-albuquerque-7aa63275?trk=profile-badge'>
                    TIAGO ALBUQUERQUE
                </a>
            </div>
        </div>
    );
}