import { ALERT_TYPES } from "./alertActions";
import { getDataApi } from "../../utils/fetchDataApi"

export const PROFILE_TYPES = {
    LOADING : 'LOADING',
    GET_USER : 'GET_USER'
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
export const updateProfile = ({editData, avatar}) =>async (dispatch) => {
    if(!editData.fullName) return dispatch({type:"ALERT", payload:{error:"Add your fullname"}})
    if(editData.fullName.length > 25) return dispatch({type:"ALERT", payload:{error:"Fullname too long"}})
    if(editData.story.length > 200) return dispatch({type:"ALERT", payload:{error:"story too long"}})

    try {
        
    } catch (err) {
        dispatch({
            type:'ALERT',
            payload:{
                error: err.response.data.msg
            }
        })
        
    }
}