import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PautaService from '../services/PautaService'
import HowToVote from '@material-ui/icons/HowToVote'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles({
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
    }
})

function getDateNow() {
    let today = new Date()
    let date = today.getFullYear() + '-' +
        (today.getMonth() + 1).toString().padStart(2, '0') + '-' +
        today.getDate().toString().padStart(2, '0')
    let time = today.getHours().toString().padStart(2, '0') + ':' + today.getMinutes().toString().padStart(2, '0')
    return date + 'T' + time
}

export default function IniciarVotacao() {
    const classes = useStyles()
    const { id } = useParams()
    const [pauta, setPauta] = useState(null)
    const [autor, setAutor] = useState(null)
    const [dateTime, setDateTime] = useState(getDateNow())
    const pautaService = new PautaService()

    const getPauta = () => {
        pautaService.get(id, (success) => {
            success.titulo = success.titulo.toUpperCase()
            setAutor(success.autor)
            setPauta(success)
        }, (error) => {
            alert(error)
        })
    }

    const getMinutes = () => {
        const actualDateTime = new Date(getDateNow()).getTime()
        const votingDateTime = new Date(dateTime).getTime()

        return (votingDateTime - actualDateTime) / 1000 / 60
    }

    const postVotacao = () => {
        const minutes = getMinutes()
        if (minutes < 1) {
            alert('O tempo de votação não pode ser menor do que 1 minuto!')
        } else {
            pautaService.postVotacao(id, minutes, (success) => {
                alert(success.message)
            }, (error) => {
                console.log(error)
                alert(error)
            })
        }
    }

    useEffect(() => {
        getPauta()
    }, [])

    return (
        <Card className={classes.root} variant="outlined">
            {pauta ?
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Publicada em {new Date(pauta.creation_date).toLocaleDateString()}
                    </Typography>
                    <Button
                        className={classes.startButton}
                        variant="outlined"
                        color="primary"
                        size="medium"
                        onClick={postVotacao}
                        startIcon={<HowToVote />}
                    >
                        Iniciar Votação
                    </Button>
                    <TextField
                        id="datetime-local"
                        label="Término da votação"
                        type="datetime-local"
                        defaultValue={dateTime}
                        className={classes.textField}
                        onChange={(e) => {
                            e.preventDefault()
                            setDateTime(e.target.value)
                        }}
                        size="small"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Typography variant="h5" component="h2">
                        {pauta.titulo}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Autor: {autor.nome}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {pauta.descricao}
                    </Typography>
                </CardContent>
                : ''}
        </Card>
    )
}