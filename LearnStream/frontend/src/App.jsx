import { useState } from 'react'
import { AuthProvider } from './contexts/AuthProvider'
import Login from './components/Login'
// import './App.css'

function App() {

  
  return (
    <>
    <AuthProvider>
      <Login/>
    </AuthProvider>
    </>
  )
}

export default App
