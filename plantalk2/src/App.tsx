import React from 'react'
import { useState } from 'react'
import Login from './Login'


const App: React.FC = () => {
  const [showLogin, setShowLogin] = useState<boolean>(false)

  const handleStart = (): void => {
    setShowLogin(true)
  }

  if (showLogin) {
    return <Login />
  }

  return (
    <div className="title-screen">
      <div className="white-circle circle-1"></div>
      <div className="white-circle circle-2"></div>
      <div className="white-circle circle-3"></div>
      <div className="content">
        <h1 className="title">PlanTalk</h1>
        <p className="start-text" onClick={handleStart}>タップでスタート！</p>
      </div>
    </div>
  )
}

export default App
