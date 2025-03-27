import React from 'react'
import './DictionaryButton.css'
import { Link } from 'react-router-dom'

const DictionaryButton = () => {
  return (
    <Link to='/dictionary'>Dictionary</Link>
  )
}

export default DictionaryButton