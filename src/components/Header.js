import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(3)
    },
    title: {
        flexGrow: 1,
        display: 'inline-block'
    },
    button: {
        float: 'right'
    }
}))


export default function Header(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Typography variant="h6" className={classes.title}>
                {props.title}
            </Typography>
            {props.novaPauta ?
                <Button
                    color="primary"
                    size="small"
                    variant="outlined"
                    href="/pautas/nova"
                    className={classes.button}
                    startIcon={<AddCircleOutlineIcon />}
                >
                    Cadastrar Pauta
                </Button>
                : ''}
        </div>
    )
}
