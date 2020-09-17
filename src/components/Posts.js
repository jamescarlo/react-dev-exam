import React, { useState } from 'react'
import '../Posts.css'
import {
    Avatar,
    Button
} from '@material-ui/core'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';




function Posts({ firstname, locationCity, locationCountry, image, caption, likes }) {

    const [ like, setLike ] = useState(likes);
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
                    src="static/images/avatar/1.jpg"
                />
                <div className="post__headerUserInformations">
                    <strong>{firstname}</strong>
                    <small>{locationCity}, {locationCountry}</small>
                </div>
            </div>
            {/* header -> avatar + username */}
            
            <img className="post__image" src={image} />
            {/* image */}
            <div className="post__details">
                <div className="post__detailsControls">
                    {/* <Button onClick={Like} disableFocusRipple disableTouchRipple startIcon={likeIcon} /> */}
                <a onClick={Like}>{likeIcon}</a>
                <a onClick={(e) => !setFocusComment}><ChatBubbleOutlineIcon /></a>
                </div>
                <small className="post__stats">{like} likes</small>
                <br />
                <small className="post__text"><strong>{firstname}</strong></small><small style={{marginLeft: '5px'}}>{caption}</small>
            </div>
            <div className="post__commentBox">
                <input
                    className="post__input"
                    type="text"
                    placeholder="Add a comment"
                />
                <button 
                    className="post__button"
                    // disabled={!comment}
                    // type="submit"
                    // onClick={postComment}
                >
                Post
                </button>
            </div>
            {/* username + caption */}
            
            {/* <div className="post__comments">
                {
                    <p>
                        <strong>{comment.username} </strong>{comment.text}
                    </p>   
                }
            </div> */}
            
            {/* {
                user && (
                    <from className="post__commentBox">
                        <input
                            className="post__input"
                            type="text"
                            placeholder="Add a comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button 
                            className="post__button"
                            disabled={!comment}
                            type="submit"
                            onClick={postComment}
                        >
                            Post
                        </button>
                    </from>
                )
            } */}
        </div>
    )
}

export default Posts
