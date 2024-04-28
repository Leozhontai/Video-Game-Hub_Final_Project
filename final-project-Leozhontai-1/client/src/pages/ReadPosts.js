import React, { useState, useEffect } from 'react';
import { supabase } from '../client.js';
import Card from '../components/Card';
import './ReadPosts.css';


const ReadPosts = (props) => {

    const [posts, setPosts] = useState([]);
    

    useEffect(() => {
        setPosts(props.data);
    }, [props]);

    

    const newestPosts = async () => {
        const {data} = await supabase
        .from('hub')
        .select()
        .order('created_at', { ascending: true })
        // set state of posts
        setPosts(data);
      }
    
      const upvotePosts = async () => {
        const {data} = await supabase
        .from('hub')
        .select()
        .order('upvotes', { ascending: false })
        // set state of posts
        setPosts(data);
      }

    return (
        <div className="ReadPosts">
            <div className='header2'>
              <p>
                Order by: &nbsp;
                <button className="headerBtn" onClick={upvotePosts}> Most Popular </button>
                <button className="headerBtn" onClick={newestPosts}> Newest </button>
              </p>
            </div>


            {
                posts && posts.length > 0 ?
                posts.map((post,index) => 
                   <Card id={post.id} created_at={post.created_at} title={post.title} content={post.content} image_url={post.image_url} upvotes={post.upvotes}/>
                ) : <h2>{'No Posts Yet 😞'}</h2>
            }
        </div>  
    )
}

export default ReadPosts;