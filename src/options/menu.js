import React from 'react'
import HomeIcon from '@material-ui/icons/Home'
import AssignmentIcon from '@material-ui/icons/Assignment'
import HowToVote from '@material-ui/icons/HowToVote'

const menu = [
    { path: "/", name: "Home", icon: <HomeIcon /> },
    { path: "/pautas", name: "Pautas", icon: <AssignmentIcon /> },
    { path: "/votacoes", name: "Votações", icon: <HowToVote /> }
]

export default menu