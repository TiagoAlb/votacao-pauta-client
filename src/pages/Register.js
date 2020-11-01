import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import NTConsultLogo from '../assets/img/nt_consult_logo.png'
import SicrediLogo from '../assets/img/sicredi_logo.png'
import AssociadoService from '../services/AssociadoService'
import Snackbar from '../components/Snackbar'

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

export default function Register() {
    const classes = useStyles()
    const [associado, setAssociado] = useState({
        nome: '',
        cnpjCpf: '',
        email: '',
        newPassword: ''
    })
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [snackbarConfig, setSnackbarConfig] = useState({ open: false, message: '', severity: 'error' })

    const associadoService = new AssociadoService()

    const handleRegister = (e) => {
        e.preventDefault()
        if (passwordConfirm !== associado.newPassword) {
            setSnackbarConfig({ open: true, message: 'As senhas informadas não conferem!', severity: 'warning' })
            return false
        } else {
            try {
                associadoService.postNoAuth(associado,
                    (success) => {
                        window.location.href = '/'
                        setSnackbarConfig({ open: true, message: 'Associado cadastrado com sucesso!', severity: 'success' })
                    }, (error) => {
                        setSnackbarConfig({ open: true, message: error, severity: 'error' })
                        return false
                    })
            } catch (error) {
                setSnackbarConfig({ open: true, message: error, severity: 'error' })
                return false
            }
        }
    }

    const handleAssociadoChange = (e, tipo) => {
        e.preventDefault()

        const ass = associado
        ass[tipo] = e.target.value
        setAssociado(ass)
    }

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
                    Cadastre-se
                </Typography>
                <form autoComplete="off" className={classes.form} onSubmit={handleRegister}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="nome"
                        label="Nome"
                        name="nome"
                        onChange={e => handleAssociadoChange(e, 'nome')}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="cnpjCpf"
                        label="CNPJ/CPF"
                        name="cnpjCpf"
                        onChange={e => handleAssociadoChange(e, 'cnpjCpf')}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        onChange={e => handleAssociadoChange(e, 'email')}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="newPassword"
                        label="Senha"
                        type="password"
                        id="newPassword"
                        onChange={e => handleAssociadoChange(e, 'newPassword')}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="passwordConfirm"
                        label="Confirmar Senha"
                        type="password"
                        id="passwordConfirm"
                        onChange={e => setPasswordConfirm(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Cadastrar
                    </Button>
                </form>
                <Snackbar config={snackbarConfig} setConfig={setSnackbarConfig} />
            </div>
        </Container>
    )
}