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

    const associadoService = new AssociadoService()

    const handleRegister = () => {
        if (passwordConfirm !== associado.newPassword) {
            alert('As senhas informadas não conferem!')
            return false
        } else {
            try {
                associadoService.postNoAuth(associado, (success) => {
                    alert(success)
                    alert('Associado cadastrado com sucesso!')
                    window.location.href = "/"
                }, (error) => {
                    alert(error)
                    alert('Erro ao cadastrar associado! Verifique as informações digitadas.')
                })
            } catch (err) {
                alert(err)
                console.log(err)
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
                <form className={classes.form} onSubmit={handleRegister}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="nome"
                        label="Nome"
                        name="nome"
                        autoComplete="nome"
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
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        onChange={e => handleAssociadoChange(e, 'email')}
                        autoFocus
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
                        autoComplete="current-password"
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
                        autoComplete="current-password"
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleRegister}
                    >
                        Cadastrar
                    </Button>
                </form>
            </div>
        </Container>
    )
}