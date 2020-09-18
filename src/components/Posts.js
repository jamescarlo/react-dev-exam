import React, { useState, useEffect } from 'react'
import '../Posts.css'
import {
    Avatar,
    Button
} from '@material-ui/core'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import axios from 'axios'


// suddenly i can only get comment on specific post thats why i removed this function.
const COMMENTS_URL = "https://dummyapi.io/data/api/post/UWdcOFTc7DfzOhI6LpI4/comment/";
const APP_ID = "5f640ce71c8c926f48ba47af";

function Posts({ firstname, image, caption, likes, tags, publishDate, avatar }) {

    const [ like, setLike ] = useState(likes);

    const [ comments, setComments ] = useState([])
    const [ likeIcon, setLikeIcon ] = useState(<FavoriteBorderIcon />)
    const [ focusComment, setFocusComment ] = useState(false)

    const Like = (e) => {
        setLike(like+1);
        setLikeIcon(<FavoriteIcon />)
    }

    return (
        <div className="posts">
            <div className="post__header">
                <Avatar 
                    className="post__avatar"
                    alt={firstname}
                    src={avatar}
                />
                <div className="post__headerUserInformations">
                    <strong>{firstname}</strong>
                    <small>{publishDate}</small>
                </div>
            </div>

            <img className="post__image" src={image} />

            <div className="post__details">
                <div className="post__detailsControls">
                <a onClick={Like}>{likeIcon}</a>
                <a onClick={(e) => !setFocusComment}><ChatBubbleOutlineIcon /></a>
                </div>
                <small className="post__stats">{like} likes</small>
                <br />
                <small className="post__text"><strong>{firstname}</strong></small><small style={{marginLeft: '5px'}}>{caption}</small>
                <br />
                {   
                    // rendering tags from dummyapi.io
                    tags.map(tag => (
                        <small key={tag} style={{color: '#0095f6'}}>#{tag}  </small>
                    ))
                }
            </div>
                
            <div className="post__commentBox">
                <input
                    className="post__input"
                    type="text"
                    placeholder="Add a comment"
                    disabled={true}
                />
                <button 
                    className="post__button"
                    disabled={true}
                >
                    Post
                </button>
            </div>
        </div>
    )
}

export default Posts
