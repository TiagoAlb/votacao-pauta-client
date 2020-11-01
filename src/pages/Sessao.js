import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import VotacaoService from '../services/VotacaoService'
import Timer from '../components/Timer'
import HowToVote from '@material-ui/icons/HowToVote'
import TextField from '@material-ui/core/TextField'
import Snackbar from '../components/Snackbar'

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
        display: 'inline-block',
        flexGrow: 1
    },
    pos: {
        marginBottom: 12,
        fontSize: 12
    },
    startButton: {
        float: 'right',
        marginLeft: 3
    },
    textField: {
        width: 220,
        float: 'right'
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        textAlign: 'justify'
    }
}))

export default function IniciarVotacao() {
    const classes = useStyles()
    const { id } = useParams()
    const [pauta, setPauta] = useState(null)
    const [autor, setAutor] = useState(null)
    const votacaoService = new VotacaoService()
    const [snackbarConfig, setSnackbarConfig] = useState({ open: false, message: '', severity: 'error' })

    const geVotacao = () => {
        try {
            votacaoService.get(id,
                (success) => {
                    setAutor(success.pauta.autor)
                    setPauta(success.pauta)
                    console.log(success)
                }, (error) => {
                    setSnackbarConfig({ open: true, message: error, severity: 'error' })
                })
        } catch (error) {
            setSnackbarConfig({ open: true, message: error, severity: 'error' })
        }

    }

    useEffect(() => {
        geVotacao()
    }, [])

    return (
        <div>
            <Card className={classes.root} variant="outlined">
                <Timer seconds={20} />
                {pauta ?
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Publicada em {new Date(pauta.creation_date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {pauta.titulo}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Autor: {autor.nome}
                        </Typography>
                        <Typography className={classes.secondaryHeading}>
                            {pauta.descricao}
                        </Typography>
                    </CardContent>
                    : ''}
            </Card>
            <Snackbar config={snackbarConfig} setConfig={setSnackbarConfig} />
        </div>
    )
}