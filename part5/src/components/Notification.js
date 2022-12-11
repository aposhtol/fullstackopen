import React from 'react'

const Notification = ({ message, error }) => {
  if (message !== null){
    return(
      <div className='message'>
        {message}
      </div>)
  }

  if (error !== null){
    return(
      <div className='error'>
        {error}
      </div>)
  }

  else return null
}

export default Notification