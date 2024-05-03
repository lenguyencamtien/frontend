import { ALERT_TYPES } from "./alertActions";
import { getDataApi, patchDataApi } from "../../utils/fetchDataApi"
import { imageupload } from "../../utils/imageupload"
import axios from "axios";
import { DeleteData } from "./alertActions";

export const PROFILE_TYPES = {
    LOADING : 'LOADING',
    GET_USER : 'GET_USER',
    FRIEND : 'FRIEND',
    UNFRIEND : 'UNFRIEND'
}
export const getProfileUsers = ({users, id, auth}) => async (dispatch) => {
    if(users.every(user=>user._id !== id)) {
        try {
            dispatch({type: PROFILE_TYPES.LOADING, payload: {loading:true}})
            const res = await getDataApi(`user/${id}`, auth.token)
            dispatch({
                type: PROFILE_TYPES.GET_USER,
                payload: res.data
            })
            dispatch({type: PROFILE_TYPES.LOADING, payload: {loading:false}})
        } catch (err) {
            dispatch({
                type:'ALERT',
                payload:{
                    error: err.response.data.msg
                }
            })
        }
    }
}
export const updateProfile = ({editData, avatar, auth}) =>async (dispatch) => {
    if(!editData.fullName) return dispatch({type:"ALERT", payload:{error:"Add your fullname"}})
    if(editData.fullName.length > 25) return dispatch({type:"ALERT", payload:{error:"Fullname too long"}})
    if(editData.story.length > 200) return dispatch({type:"ALERT", payload:{error:"story too long"}})

    try {
        let media;
        dispatch({type:"ALERT", payload:{loading:true}})
        if(avatar) media = await imageupload([avatar])
        const res = await axios.patch("http://localhost:5000/api/user", {
            ...editData,
            avatar: avatar ? media[0].secure_url : auth.user.avatar
        }, 
       {
        headers : {Authorization: auth.token}
       })
        dispatch({
            type: 'AUTH',
            payload: {
                ...auth,
                user:{
                    ...auth.user,
                    ...editData,
                    avatar: avatar ? media[0].secure_url : auth.user.avatar
                }
            }
        })
        dispatch({type:"ALERT", payload:{loading:false}})
        
    } catch (err) {
        dispatch({
            type:'ALERT',
            payload:{
                error: err.response.data.msg
            }
        })
        
    }
}
export const addfriends = ({users, user, auth}) => async (dispatch) => {
    const newUser = {...user, friend:[...user.friend, auth.user]}
    console.log(newUser);
    dispatch({
        type: PROFILE_TYPES.FRIEND,
        payload:newUser
    })
    dispatch({
        type: 'AUTH',
        payload: {
            ...auth, 
            user: {...auth.user, following: [...auth.user.following, newUser]}
        }
    })
    try {
        await patchDataApi(`user/${user._id}/friend`, null, auth.token)
    } catch (err) {
        dispatch({
            type:'ALERT',
            payload:{
                error: err.response.data.msg
            }
        })
    }
}

export const unfriends = ({users, user, auth}) => async (dispatch) => {
    const newUser = {...user, friend: DeleteData(user.friend, auth.user._id)}
    dispatch({
        type: PROFILE_TYPES.UNFRIEND,
        payload:newUser
    })
    dispatch({
        type: 'AUTH',
        payload: {
            ...auth, 
            user: {...auth.user, following: DeleteData(auth.user.following, newUser._id)}
        }
    })
    try {
        await patchDataApi(`user/${user._id}/unfriend`, null, auth.token)
    } catch (err) {
        dispatch({
            type:'ALERT',
            payload:{
                error: err.response.data.msg
            }
        })
    }
}