import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import DoneIcon from '@material-ui/icons/Done'
import Header from '../components/Header'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import PautaService from '../services/PautaService'

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
        display: 'inline-block',
        flexGrow: 1
    },
    startButton: {
        float: 'right',
        marginBottom: theme.spacing(2)
    },
    textField: {
        marginBottom: theme.spacing(2)
    }
}))

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function CadastrarPauta(props) {
    const classes = useStyles()
    const [pauta, setPauta] = useState({ titulo: '', descricao: '' })
    const pautaService = new PautaService()
    const [snackbarConfig, setSnackbarConfig] = useState({ open: false, message: '', severity: 'error' })

    const handlePautaChange = (e, tipo) => {
        e.preventDefault()
        if (tipo === 'titulo') {
            setPauta({ titulo: e.target.value, descricao: pauta.descricao })
        } else {
            setPauta({ titulo: pauta.titulo, descricao: e.target.value })
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSnackbarConfig({ open: false, message: snackbarConfig.message, severity: snackbarConfig.severity })
        if (snackbarConfig.severity === 'success') {
            window.location.href = '/pautas'
        }
    }

    const postPauta = (e) => {
        e.preventDefault()
        try {
            pautaService.post(pauta,
                (success) => {
                    setSnackbarConfig({ open: true, message: 'Pauta criada com sucesso!', severity: 'success' })
                }, (error) => {
                    setSnackbarConfig({ open: true, message: error, severity: 'error' })
                })
        } catch (error) {
            setSnackbarConfig({ open: true, message: error, severity: 'error' })
        }
    }

    return (
        <div>
            <Header title="Cadastrar Pauta" />
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <form autoComplete="off" onSubmit={postPauta}>
                        <Button
                            type="submit"
                            className={classes.startButton}
                            variant="outlined"
                            color="primary"
                            size="small"
                            startIcon={<AddCircleOutlineIcon />}
                        >
                            Cadastrar
                        </Button>
                        <TextField
                            label="Título"
                            id="outlined-size-small"
                            className={classes.textField}
                            onChange={(e) => { handlePautaChange(e, 'titulo') }}
                            fullWidth
                            required
                            placeholder="Digite aqui o título da pauta..."
                            variant="outlined"
                            size="small"
                            autoFocus
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="Texto da Pauta"
                            onChange={(e) => { handlePautaChange(e, 'descricao') }}
                            multiline
                            fullWidth
                            required
                            className={classes.textField}
                            rows={5}
                            placeholder="Digite aqui o texto da pauta..."
                            variant="outlined"
                        />
                        <Chip
                            avatar={<Avatar>{props.user ? props.user.nome.substr(0, 1) : ''}</Avatar>}
                            label={props.user ? props.user.nome : ''}
                            clickable
                            color="primary"
                            title="Autor"
                            deleteIcon={<DoneIcon />}
                            variant="outlined"
                        />
                    </form>
                </CardContent>
            </Card>
            <Snackbar open={snackbarConfig.open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbarConfig.severity}>
                    {snackbarConfig.message}
                </Alert>
            </Snackbar>
        </div>
    )
}