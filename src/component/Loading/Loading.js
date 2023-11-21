import React from 'react'
import loadingLogo from '../../assets/image/loading-logo.png'
import './Loading.css'

const Loading = () => {
  return (
    <div className='loading-wrap'>
      <div className='loading-img'>
        <img src={loadingLogo} alt="loading-img"/>
      </div>
      <h2>喵立翰</h2>
      <h2>台灣的明天 喵先鋪路</h2>
      <div className='animation-bar'>
        <div className='animation-line'></div>
      </div>
    </div>
  )
}

export default Loading