import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import './App.css'

function App() {
  const auth = localStorage.getItem('token') != null

  return (
    <BrowserRouter>
      <Layout isAuthenticated={auth} />
    </BrowserRouter >
  )
}

export default App
