import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css'
import { supabase } from '../client'

const EditPost = ({data}) => {
    const {id} = useParams();    
    const [post, setPost] = useState(data.filter(item => item.id == id)[0]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        console.log("Name: ", name, " value: ", value);
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }
    
    const updatePost = async (event) => {
        event.preventDefault();
        
        await supabase
        .from('hub')
        .update({ title: post.title, content: post.content, image_url: post.image_url,})
        .eq('id', id);
        
        window.location = "/";
    }

    const deletePost = async (event) => {
        event.preventDefault();
    
        await supabase
        .from('hub')
        .delete()
        .eq('id', id); 
    
        window.location = "http://localhost:3000/";
    }

    return (
        <div>
            <form>
                <input type="text" placeholder="Title" id="title" name="title" onChange={handleChange} /><br />
                <br/>

                <input type="text" placeholder="Content" id="content" name="content" onChange={handleChange}/><br />
                <br/>

                <input type="text" placeholder="Image URL" id="image_url" name="image_url" onChange={handleChange}/><br />
                <br/>

                <input type="submit" value="Edit Post" onClick={updatePost}/>
                <button className="deleteButton" onClick={deletePost}>Delete Post</button>
            </form>
        </div>
    )
}
export default EditPost