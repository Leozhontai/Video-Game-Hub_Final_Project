import './App.css';
import React, { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { supabase } from './client.js'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import DetailView from './pages/DetailView'



const App = () => {
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchPosts();
  }, [])

  const fetchPosts = async () => {
    const {data} = await supabase
    .from('hub')
    .select()
    // set state of posts
    setPosts(data);
  }

  useEffect(() => {
    searchPosts(searchInput).catch(console.error);
  }, [searchInput]);

  const searchPosts = async (searchInput) => {
      if (searchInput !== ""){
          const { data, error } = await supabase
              .from("hub")
              .select()
              .textSearch('title', searchInput)
              .order("created_at", { ascending: true });
              setPosts(data);
      }
      else{
          fetchPosts();
      }
  }

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ReadPosts data={posts}/>
    },
    {
      path:"/:id/edit",
      element: <EditPost data={posts} />
    },
    {
      path:"/new",
      element: <CreatePost />
    },
    {
      path:"/:id",
      element: <DetailView data={posts}/>
    }
  ]);

  return ( 

    <div className="App">

      <div className="header">
        <h2>Video-game Hub</h2>

        <div className='searchBar'> 
          <input
            type="text"
            placeholder="Search..."
            onChange={(inputString) => setSearchInput(inputString.target.value)}
          />
        </div>

        <div>
          <Link to="/"><button className="headerBtn"> Home </button></Link>
          <Link to="/new"><button className="headerBtn"> Post </button></Link>
        </div>
        
      </div>
        {element}
    </div>

  );
}

export default App;
