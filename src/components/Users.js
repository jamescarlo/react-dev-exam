import React, { useState, useEffect } from 'react'
import {
    Avatar,
    Button
} from '@material-ui/core'
import '../Users.css'
import axios from 'axios'


const GETUSER_URL = "https://dummyapi.io/data/api/user?limit=5";
const APP_ID = "5f640ce71c8c926f48ba47af";

function Users() {

    const [ users, setUsers ] = useState([])

    useEffect(() => {
        axios.get(`${GETUSER_URL}`, { headers: {'app-id': APP_ID }})
            .then(res => setUsers(res.data.data))
            .catch(console.error)
    }, [])

    return (
        <div className="users__container">
            <p style={{color: 'gray', fontWeight: '600'}}>Suggestions For You</p>
            {
                users.map(user => {
                    return(
                        <div className="users__avatarAndFollowButton">
                        <div className="users__avatar">
                            <Avatar
                                alt={user.firstName}
                                src={user.picture}
                            />
                        </div>
                        <div className="users__nameAndStatus">
                        <strong>{user.firstName}</strong>
                            <small style={{color: 'gray'}}>New to instagram</small>
                        </div>
                        <Button style={{color: '#0095F6', fontSize: '11px', fontWeight: '600'}} variant="text" disableFocusRipple disableTouchRipple disableElevation>FOLLOW</Button>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default Users
