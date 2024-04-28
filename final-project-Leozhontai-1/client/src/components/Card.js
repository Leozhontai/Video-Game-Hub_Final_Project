import React from 'react'
import { useState } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'
import Posted from './Posted';
import DetailView from '../pages/DetailView';

const Card = (props) =>  {

  return (
      <div className="Card">
          <Posted created_at={props.created_at} />
          <Link to={'/' + props.id} key={props.id} id={props.id}> 
            <h2 className="title">{props.title}</h2> 
          </Link>
          <p>Upvotes: {props.upvotes}</p>
      </div>
  );
};

export default Card;