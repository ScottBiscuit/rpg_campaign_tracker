import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import MainNav from './components/MainNav'

export default function App() {

  return (
    <>
      <MainNav brand={'RPG Campaign Tracker'}/>
      <Outlet />
    </>
  )
}

