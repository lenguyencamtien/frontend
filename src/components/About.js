import React from 'react'
import '../styles/ProfileAbout.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfileUsers } from "../redux/actions/profileActions";
import {useEffect, useState} from "react";

const About = ({userData, auth, profile, id}) => {
    

    return (
        <div className='profileabout'>
            {userData.length > 0 && userData.map(user=> (
                <div className='profileabout-container' key={user._id}>
                    <div className='profileabout-contenttop'>
                        <h4 className='profileabout-contenttop-head'>About Me:</h4>
                    </div>
                    <div className='profileabout-contentcenter'>
                        <p className='profileabout-contentcenter-story'>{user.story}</p>
                    </div>
                    <div className='profileabout-contentbottom'>
                        <div className='profileabout-contentbottominfo'>
                            <h6 className='profileabout-contentbottominfo-head'>Joined</h6>
                            <p className='profileabout-contentbottominfo-body'>{user.createdAt}</p>
                        </div>
                        <div className='profileabout-contentbottominfo'>
                            <h6 className='profileabout-contentbottominfo-head'>Gender</h6>
                            <p className='profileabout-contentbottominfo-body'>{user.gender}</p>
                        </div>
                        <div className='profileabout-contentbottominfo'>
                            <h6 className='profileabout-contentbottominfo-head'>Phone</h6>
                            <p className='profileabout-contentbottominfo-body'>{user.phone}</p>
                        </div>
                        <div className='profileabout-contentbottominfo'>
                            <h6 className='profileabout-contentbottominfo-head'>Email</h6>
                            <p className='profileabout-contentbottominfo-body'>{user.email}</p>
                        </div>
                        <div className='profileabout-contentbottominfo'>
                            <h6 className='profileabout-contentbottominfo-head'>Website</h6>
                            <p className='profileabout-contentbottominfo-body'>{user.website}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default About;