import React from 'react'
import ReactTimeAgo from 'react-time-ago'
import './Card.css'

const Posted = (props) => {
  return (
    <div>
      <p>Posted <ReactTimeAgo date={props.created_at} locale="en-US" /></p>
    </div>
  )
}

export default Posted;