import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import VotacaoService from '../services/VotacaoService'
import InfiniteScroll from 'react-infinite-scroll-component'
import Skeleton from '@material-ui/lab/Skeleton'
import HowToVote from '@material-ui/icons/HowToVote'
import Button from '@material-ui/core/Button'
import Header from '../components/Header'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'

function SkeletonList() {
    return (
        <React.Fragment>
            <Skeleton variant="rect" width="100%">
                <div style={{ paddingTop: '100px' }} />
            </Skeleton>
            <br />
            <Skeleton variant="rect" width="100%">
                <div style={{ paddingTop: '100px' }} />
            </Skeleton>
            <br />
            <Skeleton variant="rect" width="100%">
                <div style={{ paddingTop: '100px' }} />
            </Skeleton>
            <br />
            <Skeleton variant="rect" width="100%">
                <div style={{ paddingTop: '100px' }} />
            </Skeleton>
        </React.Fragment>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    accordion: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(2),
        '&::before': {
            backgroundColor: 'transparent'
        }
    },
    startButton: {
        marginRight: theme.spacing(1)
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        fontWeight: 'bold',
        flexGrow: 1
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        textAlign: 'justify'
    },
    votacaoFim: {
        color: '#d32f2f',
        border: '1px solid #d32f2f',
        '& .MuiChip-root': {
            backgroundColor: '#d32f2f'
        }
    },
    accordionIcon: {
        marginLeft: theme.spacing(2)
    }
}))

export default function Votacoes(props) {
    const classes = useStyles()
    const [expanded, setExpanded] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [votacoes, setVotacoes] = useState([])
    const [votacaoStatus, setVotacaoStatus] = useState(null)
    const [page, setPage] = useState(0)

    const handleChange = (panel, prop) => (event, isExpanded) => {
        if (!prop.open) {
            getVotacaoStatus(prop.id)
        } else {
            setVotacaoStatus(null)
        }
        setExpanded(isExpanded ? panel : false)
    }

    const votacaoService = new VotacaoService()

    const listVotacoes = () => {
        try {
            votacaoService.getPagedList(page, (success) => {
                const content = success.content

                content.map(votacao => {
                    votacao.pauta.titulo = votacao.pauta.titulo.toUpperCase()
                    setVotacoes(votacoes => [...votacoes, votacao])
                })

                setPage(page + 1)
                setHasMore(!success.last)
            }, (error) => {
                alert(error)
            })
        } catch (error) {
            alert(error)
        }
    }

    const postVoto = (idVotacao, voto) => {
        try {
            votacaoService.postVoto(idVotacao, props.user.id, voto,
                (success) => {
                    alert('Voto realizado com sucesso!')
                }, (error) => {
                    alert(error)
                })
        } catch (error) {
            alert(error)
        }
    }

    const getVotacaoStatus = (id) => {
        try {
            votacaoService.getVotacaoStatus(id, (success) => {
                console.log(success)
                setVotacaoStatus(success)
            }, (error) => {
                alert(error)
            })
        } catch (error) {
            alert(error)
        }

    }

    useEffect(() => {
        listVotacoes()
    }, [])


    return (
        <div className={classes.root}>
            <Header title="Votações" />
            <InfiniteScroll
                dataLength={votacoes.length}
                next={listVotacoes}
                hasMore={hasMore}
                loader={<SkeletonList />}
                endMessage={
                    <p>
                        {votacoes.length} resultados carregados.
                    </p>
                }
            >
                {votacoes.map((prop, key) => (
                    <Accordion className={classes.accordion} variant="outlined"
                        expanded={expanded === key}
                        onChange={handleChange(key, prop)} key={key}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className={classes.accordionIcon} />}
                            aria-controls={key + '-content'}
                            id={key + '-header'}
                        >
                            <Typography className={classes.heading}>{prop.pauta.titulo}</Typography>
                            <Chip
                                className={!prop.open ? classes.votacaoFim : ''}
                                avatar={<Avatar style={{ backgroundColor: !prop.open ? '#d32f2f' : '' }}><HowToVote /></Avatar>}
                                label={prop.open ? 'EM VOTAÇÃO' : 'VOTAÇÃO FINALIZADA'}
                                clickable
                                color="primary"
                                variant="outlined"
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                <Typography className={classes.secondaryHeading}><b>Autor: </b>{prop.pauta.autor.nome}</Typography>
                                <Typography className={classes.secondaryHeading}><b>Email do autor: </b>{prop.pauta.autor.email}</Typography>
                                <Divider />
                                <br />
                                <Typography className={classes.secondaryHeading}>
                                    Sessão iniciada em {new Date(prop.start_date).toLocaleDateString()} às {new Date(prop.start_date).toLocaleTimeString()}
                                </Typography>

                                {votacaoStatus ?
                                    <React.Fragment>
                                        <Typography className={classes.secondaryHeading}>
                                            Sessão encerrada em {new Date(prop.end_date).toLocaleDateString()} às {new Date(prop.end_date).toLocaleTimeString()}
                                        </Typography>
                                        <br />
                                        <Typography className={classes.secondaryHeading}>
                                            <b>VOTOS FAVORÁVEIS: </b>{votacaoStatus.qtdSim}
                                        </Typography>
                                        <Typography className={classes.secondaryHeading}>
                                            <b>VOTOS CONTRÁRIOS: </b>{votacaoStatus.qtdNao}
                                        </Typography>
                                        <Typography className={classes.secondaryHeading}>
                                            <b>RESULTADO: </b>{votacaoStatus.resultado}
                                        </Typography>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <br />
                                        <Button
                                            className={classes.startButton}
                                            variant="outlined"
                                            color="primary"
                                            size="medium"
                                            onClick={() => { postVoto(prop.id, 'sim') }}
                                        >
                                            Votar Sim
                                    </Button>
                                        <Button
                                            className={classes.startButton}
                                            variant="outlined"
                                            style={{ color: '#d32f2f', borderColor: '#d32f2f' }}
                                            color="primary"
                                            size="medium"
                                            onClick={() => { postVoto(prop.id, 'nao') }}
                                        >
                                            Votar Não
                                    </Button>
                                    </React.Fragment>
                                }
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </InfiniteScroll>
        </div >
    )
}