import React from 'react'
import Authenticated from './Authenticated'
import Unauthenticated from './Unauthenticated'

export default function Layout(props) {
    if (props.isAuthenticated) {
        return <Authenticated />
    }

    return <Unauthenticated />
}