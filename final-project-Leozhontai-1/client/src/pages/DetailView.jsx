import React, { useState } from 'react';
import { supabase } from '../client.js'
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom'
import Posted from '../components/Posted.jsx'
import more from '../components/more.png'
import './DetailView.css'

const DetailView = ({data}) => {
  const {id} = useParams();    
  const [post, setPost] = useState(data.filter(item => item.id == id)[0]);
  const [count, setCount] = useState(post.upvotes)
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const updateCount = async (event) => {
    await supabase
    .from('hub')
    .update({ upvotes: count + 1})
    .eq('id', id)

    // Update State Variable
    setCount((count) => count + 1);
  }

  const handleCommentSubmit = e => {
    e.preventDefault();
    setComments([...comments, comment]);
    setComment('');
  };

  return(
    <div className='DetailView'>
        <Posted created_at={post.created_at} />
        <Link to={'/'+ id + '/edit'}><img className="moreButton" alt="edit button" src={more} /></Link>

        <h2 className="title">{post.title}</h2> 

        <p className="content">{post.content}</p>
        <img className="image_url" src={post.image_url} />
        <br></br>

        <button className="betButton" onClick={updateCount} >👍 Upvote: {count}</button>

        <form onSubmit={handleCommentSubmit}>
          <input type="text" value={comment} onChange={e => setComment(e.target.value)} placeholder="Add a comment" />
          <button type="submit">Submit</button>
        </form>

        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
    </div>
  ); 
};

export default DetailView;