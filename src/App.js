import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  Input
} from '@material-ui/core'
import Posts from './components/Posts'
import axios from 'axios'
import './App.css';



 // {
    //   firstName: "james carlo",
    //   image: "https://images.pexels.com/photos/3722196/pexels-photo-3722196.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    //   title: "I love dogs",
    //   cityLocation: "Quezon City",
    //   countryLocation: "Philippines",
    // },
    // {
    //   firstName: "james carlo",
    //   image: "https://images.pexels.com/photos/3722196/pexels-photo-3722196.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    //   title: "I love dogs",
    //   cityLocation: "Quezon City",
    //   countryLocation: "Philippines",
    // },  

  const BASE_URL = "https://dummyapi.io/data/api/post?limit=5"
  const APP_ID = "5f62e5b5eed752903eed982c";

function App() {

  const [ posts, setPosts ] = useState([])
  const [ open, setOpen ] = useState(false)


  useEffect(() => {

    axios.get(`${BASE_URL}`, { headers: { 'app-id': APP_ID } })
        .then( (response) => setPosts(response.data.data))
        .catch(console.error)
        // .finally(() => setLoading(false));
      }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="app__container">
      {/* header */}
      <div className="app__header">
        <div className="app__headerControls">
          <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="instagram" />
          
        </div>
      </div>
      <div className="app__posts">
        {/* {
          posts.map((post, id) => {
            return(
            
            )
          })
        } */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
        <center>
          <Input 
            
          />
        </center>
        </div>
      </Modal>
        <Button>POST SOMETHING</Button>
        {
          //   Object.keys(posts).map((post ) => { 
          //   return(
          //     <Posts 
       
          //       // firstname={post.firstName}
          //       firstname={post}
          //         // locationCity={post.location.city}
          //         // locationCountry={post.location.country}
          //         // image={}
          //         // caption={post.title}
       
          //     />
          //   )
          // })

          posts.map(post=> (
            <Posts 
              firstname={post.owner.firstName}
              image={post.image}
              caption={post.text}
              likes={post.likes}
            />
          ))
        }
            
  
      </div>
    </div>
  );
}

export default App;
