import React from 'react';
import '../styles/Profile.css';
import Info from '../components/Info';
import Posts from '../components/Posts';
import About from '../components/About';
import '../styles/ProfileAbout.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfileUsers } from "../redux/actions/profileActions";
import {useEffect, useState} from "react";
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Friends from '../components/Friends';
import Following from '../components/Following';

const Profile = () => {
    const [userData, setUserData] = useState([]);

const [showaccount, setshowaccount] = useState(true);
const [showfriends, setshowfriends] = useState(false);
const [showfollowing, setshowfollowing] = useState(false);
const [showsaved, setshowsaved] = useState(false);
const handletoggle = (ht) => {
    
    if(ht === 'showaccount'){
        setshowsaved(false);
        setshowfriends(false);
        setshowfollowing(false);
        setshowaccount(true)
    }else if(ht === 'showfriends'){
        setshowsaved(false);
        setshowfriends(true);
        setshowfollowing(false);
        setshowaccount(false)
    }else if(ht === 'showfollowing'){
        setshowsaved(false);
        setshowfriends(false);
        setshowfollowing(true);
        setshowaccount(false)
    }else if(ht === 'showsaved'){
        setshowsaved(true);
        setshowfriends(false);
        setshowfollowing(false);
        setshowaccount(false)
    }
}

    const {id} = useParams();
    const {auth, profile} = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(auth && auth.user && id === auth.user._id){
            setUserData([auth.user])
        }else{
            dispatch(getProfileUsers({users: profile.users, id , auth}))
            const newData = profile.users.filter(user=>user._id === id)
            setUserData(newData)
        }
    },[id, auth, profile.users, dispatch])
    return (
        <div className='profile'>
            <Info userData={userData} profile={profile} auth={auth} id={id}/>
            <div className='profileheader'>
                <div className='profileheader-items'>
                    <IconButton className='profileheader-item' onClick={()=>handletoggle('showaccount')}>
                        <AccountCircleIcon/>
                    </IconButton>
                    <hr/>
                    <IconButton onClick={()=>handletoggle('showfriends')}>
                        <PeopleIcon/>
                    </IconButton>
                    <hr/>
                    <IconButton onClick={()=>handletoggle('showfollowing')}>
                        <PersonAddIcon/>
                    </IconButton>
                    <hr/>
                    <IconButton onClick={()=>handletoggle('showsaved')}>
                        <BookmarksIcon/>
                    </IconButton>
                </div>
            </div>
            { showaccount && 
            <div className='profilebody'>
                <div className='profilebody-left'>
            <About userData={userData} profile={profile} auth={auth} id={id}/>
                </div>
                <div className='profilebody-center'>
            <Posts/>
                </div>
                <div className='profilebody-right'>
            <Posts/>
                </div>
            </div>
        }
        {
            showfriends && <Friends userData={userData} profile={profile} auth={auth} id={id}/>
        }
        {
            showfollowing && <Following userData={userData} profile={profile} auth={auth} id={id}/>
        }
        {
            showsaved && <h3>Saved</h3>
        }
        </div>
    )
}

export default Profile;