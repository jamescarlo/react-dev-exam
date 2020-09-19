import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  TextField,
  Fade,
  Backdrop,
  makeStyles,
  IconButton,
  Slide,
  Snackbar
} from '@material-ui/core'
import Posts from './components/Posts'
import axios from 'axios'
import './App.css';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import Users from './components/Users'



// Modal styles 

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '5px solid #E7E7E7',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: '999'
  },
}));


// Requests Endpoints

const GETPOSTS_URL = "https://dummyapi.io/data/api/post?limit=15";
const APP_ID = "5f640ce71c8c926f48ba47af";


function App(props) {

  const classes = useStyles();

  const [ posts, setPosts ] = useState([])
  const [ modalOpen, setModalOpen ] = useState(false)
  const [ successAlert, setSuccessAlert ] = useState(false);


  // for new posts state
  const [ displayName, setDisplayName ] = useState("");
  const [ caption, setCaption ] = useState("");
  const [ image, setImage ] = useState(null);
  const [ tags, setTags ] = useState([]);
  const [ staticLikes, setStaticLikes ] = useState(0);
  const [ submitButtonDisabled, setSubmitButtonDisabled ] = useState(false)
  const [ failedAlert, setFailedAlert ] = useState()


  useEffect(() => {

    axios.get(`${GETPOSTS_URL}`, { headers: { 'app-id': APP_ID } })
        .then( (response) => setPosts(response.data.data))
        .catch(console.error);

  }, []);




  const postAction = (e) => {

    // manually checking if theres an input on displayname and image because material-ui doesnt support e.preventDefault

    if (displayName === "" ) {
      setFailedAlert(true)
    } else if (image === null) {
      setFailedAlert(true)
    } else {
      posts.unshift({     
        text: caption,
        image: image,
        likes: staticLikes,
        tags: [],
        owner: {firstName: displayName},
      } );
      setPosts(posts.slice());
  
      setDisplayName("")
      setImage(null)
      setCaption("")
      setStaticLikes(0);
      setModalOpen(false)
      setSuccessAlert(true) 
    }
  }

  return (
    <div className="app__container">

      <Snackbar open={successAlert} autoHideDuration={5000}  onTouchCancel onClose={!successAlert} TransitionProps={Slide}>
        <Alert onClose={() => setSuccessAlert(false)} severity="success">
          Upload successful.
        </Alert>
      </Snackbar>
      <Snackbar open={failedAlert} autoHideDuration={5000}  onTouchCancel onClose={!failedAlert} TransitionProps={Slide}>
        <Alert onClose={() => setFailedAlert(false)} severity="error">
          Unabled to post - Must contain display name and image .
        </Alert>
      </Snackbar>

      <div className="app__header">
        <img className="app__logo" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="instagram" />
        <div className="app__headerControls">
          <Button onClick={() => setModalOpen(true)} style={{border: '1px solid lightgray', margin: '5px', borderRadius: '50px'}}>POST SOMETHING</Button>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <div className={classes.paper}>
            <center>
              <img style={{margin: '25px'}} src="/instagram.png" width="20%" />
            </center>
            <TextField value={displayName} onChange={(e) => setDisplayName(e.target.value)} style={{marginBottom: '10px'}} color="primary" label="Display name" variant="outlined" />
            <TextField value={caption} onChange={(e) => setCaption(e.target.value)} style={{marginBottom: '10px'}} color="primary" label="Caption" variant="outlined" multiline rows={4} rowsMax={4} />
            <input type="file"  onChange={(event) => setImage(URL.createObjectURL(event.target.files[0]))} accept={['image/jpeg', 'image/png', 'image/bmp', 'video/mp4']} />
  
            <Button 
              style={{
                margin: '25px',
                backgroundCcolor: '#4158D0',
                backgroundImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
                borderRadius: '50px',
                color: '#FFF'
              }} 
              onClick={postAction} 
              variant="contained"
              disabled={submitButtonDisabled}
            >
                SUBMIT
              </Button>
          </div>
        </Fade>
      </Modal>
  
      <div className="app__posts">
        <div className="app__mainPostsContainer">
          {
            posts.map((post, id)=> (
              <Posts
                key={id}
                firstname={post.owner.firstName}
                avatar={post.owner.picture}
                image={post.image}
                caption={post.text}
                likes={post.likes}
                tags={post.tags}
                date={post.publishDate}
              />
            ))
          }
        </div>
        <div className="app__userSuggestions">
          <Users />
        </div>
      </div>

    </div>
  );
}

export default App;
