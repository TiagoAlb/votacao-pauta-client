import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import VotacaoService from '../services/VotacaoService'
import Skeleton from '@material-ui/lab/Skeleton'
import InfiniteScroll from 'react-infinite-scroll-component'
import Timer from '../components/Timer'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import Snackbar from '../components/Snackbar'
import Header from '../components/Header'
import Divider from '@material-ui/core/Divider'
import SentimentSatisfiedOutlined from '@material-ui/icons/SentimentSatisfiedOutlined'
import SentimentVeryDissatisfied from '@material-ui/icons/SentimentVeryDissatisfied'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import ThumbDownAltOutlined from '@material-ui/icons/ThumbDownAltOutlined'

const chips = [0, 1, 2, 3, 4, 5]

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
    },
    row: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    votouIcon: {
        verticalAlign: 'middle',
        color: theme.palette.primary
    },
    chip: {
        width: '100%',
        marginTop: theme.spacing(1),
        justifyContent: 'flex-start'
    },
    scrollableDiv: {
        marginTop: theme.spacing(1),
        maxHeight: theme.spacing(50),
        overflowY: 'auto'
    }
}))

function SkeletonList() {
    return (
        <React.Fragment>
            {chips.map((key) => (
                <Skeleton variant="text"
                    width="100%"
                    style={{ paddingTop: '30px', borderRadius: '20px' }} key={key} />
            ))}
        </React.Fragment>
    )
}

export default function IniciarVotacao() {
    const classes = useStyles()
    const { id } = useParams()
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(0)
    const [participantes, setParticipantes] = useState([])
    const [associadoVotou, setAssociadoVotou] = useState(false)
    const [votacao, setVotacao] = useState(null)
    const [votacaoStatus, setVotacaoStatus] = useState(null)
    const votacaoService = new VotacaoService()
    const [snackbarConfig, setSnackbarConfig] = useState({ open: false, message: '', severity: 'error' })

    const getSeconds = () => {
        const actualDateTime = new Date().getTime()
        const votingDateTime = new Date(votacao.start_date).getTime()

        return (votacao.minutes * 60) - ((actualDateTime - votingDateTime) / 1000)
    }

    const updateVotacao = () => {
        console.log(votacao)
        console.log(votacaoStatus)
        if (votacao && !votacaoStatus) {
            getVotacao()
            getAssociadoVotou()
            setParticipantes([])
            setHasMore(true)
            setPage(0)
            getVotacaoParticipantes()
        }
    }

    const getVotacaoStatus = () => {
        try {
            votacaoService.getVotacaoStatus(id,
                (success) => {
                    setVotacaoStatus(success)
                }, (error) => {
                    setSnackbarConfig({ open: true, message: error, severity: 'error' })
                })
        } catch (error) {
            setSnackbarConfig({ open: true, message: error, severity: 'error' })
        }
    }

    const getVotacaoParticipantes = () => {
        try {
            votacaoService.getVotacaoParticipantes(id, page,
                (success) => {
                    const content = success.content

                    content.map(participante => {
                        setParticipantes(participantes => [...participantes, participante])
                    })

                    setPage(page + 1)
                    setHasMore(!success.last)
                }, (error) => {
                    setSnackbarConfig({ open: true, message: error, severity: 'error' })
                })
        } catch (error) {
            setSnackbarConfig({ open: true, message: error, severity: 'error' })
        }
    }

    const getAssociadoVotou = () => {
        try {
            votacaoService.getAssociadoVotou(id,
                (success) => {
                    setAssociadoVotou(success)
                }, (error) => {
                    setSnackbarConfig({ open: true, message: error, severity: 'error' })
                })
        } catch (error) {
            setSnackbarConfig({ open: true, message: error, severity: 'error' })
        }
    }

    const getVotacao = () => {
        try {
            votacaoService.get(id,
                (success) => {
                    setVotacao(success)
                    if (!success.open) {
                        getVotacaoStatus()
                    }
                }, (error) => {
                    setSnackbarConfig({ open: true, message: error, severity: 'error' })
                })
        } catch (error) {
            setSnackbarConfig({ open: true, message: error, severity: 'error' })
        }
    }

    const postVoto = (voto) => {
        try {
            votacaoService.postVoto(id, voto,
                (success) => {
                    setSnackbarConfig({ open: true, message: 'Voto realizado com sucesso!', severity: 'success' })
                    getAssociadoVotou()
                }, (error) => {
                    setSnackbarConfig({ open: true, message: error, severity: 'error' })
                })
        } catch (error) {
            setSnackbarConfig({ open: true, message: error, severity: 'error' })
        }
    }

    useEffect(() => {
        getVotacao()
        getAssociadoVotou()
        getVotacaoParticipantes()
    }, [])

    return (
        <div>
            <Header title={'Sessão ' + id} />
            <Grid container spacing={2}>
                <Grid item md={9} sm={12} xs={12}>
                    {votacao ?
                        <Card className={classes.root} variant="outlined">
                            <CardContent>
                                <Grid item container xs={12}>
                                    <Grid item md={6} sm={12} xs={12}>
                                        <Typography className={classes.secondaryHeading}>
                                            Sessão iniciada em {new Date(votacao.start_date).toLocaleDateString()} às {new Date(votacao.start_date).toLocaleTimeString()}
                                        </Typography>
                                        {votacaoStatus ?
                                            <Typography className={classes.secondaryHeading}>
                                                Sessão encerrada em {new Date(votacao.end_date).toLocaleDateString()} às {new Date(votacao.end_date).toLocaleTimeString()}
                                            </Typography>
                                            : ''}
                                        {votacaoStatus ?
                                            <div className={classes.row}>
                                                <Typography className={classes.secondaryHeading}>
                                                    <b>Votos Favoráveis: </b>{votacaoStatus.qtdSim}
                                                </Typography>
                                                <Typography className={classes.secondaryHeading}>
                                                    <b>Votos Contrários: </b>{votacaoStatus.qtdNao}
                                                </Typography>
                                                <Typography className={classes.secondaryHeading}>
                                                    <b>Resultado: </b>{votacaoStatus.resultado}
                                                </Typography>
                                            </div>
                                            : ''}
                                    </Grid>
                                    <Grid item md={6} xs={12} sm>
                                        <Timer seconds={getSeconds()} onEnd={updateVotacao()} />
                                    </Grid>
                                </Grid>
                                <Grid item container xs={12} justify="center">
                                    {!votacaoStatus && !associadoVotou ?
                                        <div className={classes.row}>
                                            <Button
                                                variant="outlined"
                                                style={{ color: '#d32f2f', borderColor: '#d32f2f' }}
                                                size="medium"
                                                onClick={() => { postVoto('nao') }}
                                                endIcon={<ThumbDownAltOutlined />}
                                            >
                                                Votar Não
                                            </Button>
                                            <Button
                                                className={classes.startButton}
                                                variant="outlined"
                                                color="primary"
                                                size="medium"
                                                onClick={() => { postVoto('sim') }}
                                                endIcon={<ThumbUpAltOutlined />}
                                            >
                                                Votar Sim
                                        </Button>
                                        </div>
                                        :
                                        <div className={classes.row}>
                                            {associadoVotou ?
                                                <Typography color="primary">Você votou nesta sessão <SentimentSatisfiedOutlined className={classes.votouIcon} color="primary" /></Typography>
                                                :
                                                <Typography color="error">Você não votou nesta sessão <SentimentVeryDissatisfied className={classes.votouIcon} /></Typography>
                                            }
                                        </div>
                                    }
                                </Grid>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Dados da Pauta:
                                </Typography>
                                <Divider />
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Publicada em {new Date(votacao.pauta.creation_date).toLocaleDateString()}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {votacao.pauta.titulo.toUpperCase()}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    <b>Autor:</b> {votacao.pauta.autor.nome}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    <b>Email do autor:</b> {votacao.pauta.autor.nome}
                                </Typography>
                                <Typography className={classes.secondaryHeading}>
                                    {votacao.pauta.descricao}
                                </Typography>
                            </CardContent>
                        </Card>
                        : <Skeleton variant="rect"
                            width="100%"
                            style={{ paddingTop: '300px' }} />}
                </Grid>
                <Grid item xs={12} sm>
                    <Typography>Participantes</Typography>
                    {votacao ?
                        <div id="scrollableDiv" className={classes.scrollableDiv}>
                            <InfiniteScroll
                                dataLength={participantes.length}
                                next={getVotacaoParticipantes}
                                hasMore={hasMore}
                                loader={<SkeletonList />}
                                scrollableTarget="scrollableDiv"
                                endMessage={
                                    <p>
                                        {participantes.length} resultados carregados.
                                    </p>
                                }
                            >
                                {participantes.map((prop, key) => (
                                    <Chip
                                        avatar={<Avatar>{prop.nome.substr(0, 1).toUpperCase()}</Avatar>}
                                        label={prop.nome}
                                        clickable
                                        key={key}
                                        className={classes.chip}
                                        color="primary"
                                        variant="outlined"
                                    />
                                ))}
                            </InfiniteScroll>
                        </div> : ''}
                </Grid>
            </Grid >
            <Snackbar config={snackbarConfig} setConfig={setSnackbarConfig} />
        </div>
    )
}