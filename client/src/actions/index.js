import  axios from 'axios';
import {browserHistory} from 'react-router';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE,
    GET_DATA
} from './types';

const ROOT_URL='http://localhost:3090';

export function signinUser({email,password}) {
    return function (dispatch) {
        // Submit email/password to the server
        axios.post(`${ROOT_URL}/signin` , {email , password })
            .then(response => {
                //If request is good...
                //-Update state to indicate user is authenticated
                dispatch({type:AUTH_USER});
                //-Save the JWT token
               localStorage.setItem('token',response.data.token);
                //-redirect to the /feature
                browserHistory.push('/feature');
            })
            .catch(()=>{
                //if request is bad..
                // - Show an error to the user
                dispatch(authError("Bad Login Info"))
            })
    }
}

export function signupUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/feature');
            })
            .catch(response => dispatch(authError("This email already used")));
    }
}

export function editUser(data) {
   // console.log(data);
    return function(dispatch) {
        const config ={
            headers:{authorization:localStorage.getItem('token')}
        };
        axios.post(`${ROOT_URL}/userdata`, data,config)
            .then(response => {
                browserHistory.push('/profile');
            })
            .catch(response => dispatch(authError("This email already used")));
    }
}


export function authError(error) {
    return {
        type:AUTH_ERROR,
        payload : error,
    }
}
export function signoutUser() {
    localStorage.removeItem('token');
    return { type: UNAUTH_USER};
}
export function fetchMessage() {
    return function (dispatch) {
        axios.get(ROOT_URL,{
            headers:{authorization:localStorage.getItem('token')}
        })
            .then(response =>{
               dispatch({
                   type:FETCH_MESSAGE,
                   payload:response.data.message
               });
            });
    }
}

export function getUser() {
    return function (dispatch) {
        // Submit email/password to the server
        axios.get(`${ROOT_URL}/userdata`,{
            headers:{authorization:localStorage.getItem('token')}
        })
            .then(response =>{
                dispatch({
                    type:GET_DATA,
                    payload:response.data
                });
            })
            .catch(()=>{
                //if request is bad..
                // - Show an error to the user
                dispatch(authError("Bad getUser"))
            })
    }
}