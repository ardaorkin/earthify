/*
 Copyright (C) 2020  Arda Örkin
 This file is part of Earthify - GNU GPL v3
*/
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App'
import Intro from './components/Intro'

const isLoggedIn = localStorage.getItem('logged_in') !== null

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isLoggedIn ? <App /> : <Intro />}
  </StrictMode>,
)
