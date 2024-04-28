import React, { useState } from 'react';
import './CreatePost.css';
import { supabase } from '../client.js';

const CreatePost = () => {
  const [post, setPost] = useState({ title: "", content: "", image_url: ""});
  const [file, setFile] = useState(null);
  console.log('post: ', post);

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

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const createPost = async (event) => {
    event.preventDefault();

    let imageUrl = post.image_url;

    if (file) {
      // Upload the file to Supabase Storage
      const { error: uploadError, data: uploadData } = await supabase.storage.from('post-images').upload(file.name, file);

      if (uploadError) {
        console.error(uploadError);
        return;
      }

      // Update the image_url field with the URL of the uploaded file
      imageUrl = supabase.storage.from('post-images').getPublicUrl(uploadData.Key);
    }

    const { data, error } = await 
    supabase.from("hub").insert({
      title: post.title,
      content: post.content,
      image_url: imageUrl,
    })
    .select();
    console.log(data);
    console.log(error);
    window.location = "/";
  };

  return (
    <div>
      <form>
        <input type="text" placeholder="Title" id="title" name="title" onChange={handleChange} /><br />
        <br/>

        <input type="text" placeholder="Content" id="content" name="content" onChange={handleChange}/><br />
        <br/>

        <input type="text" placeholder="Image URL" id="image_url" name="image_url" onChange={handleChange}/><br />
        <br/>

        <input type="file" accept="image/*" onChange={handleFileChange} /><br />
        <br/>

        <input type="submit" value="Create Post" onClick={createPost}/>
      </form>
    </div>
  )
}

export default CreatePost;