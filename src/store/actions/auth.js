import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
 return{
     type: actionTypes.AUTH_START
 }
};

export const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        localId
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }

};

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenTime');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut())
        }, expTime * 1000)
    }
};

export const auth = (email, password, method) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCt1RggNEsDP8Q6gchqWb7aHC1p5F4-wC4';
        if (!method) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCt1RggNEsDP8Q6gchqWb7aHC1p5F4-wC4'
        }
        axios.post(url, authData)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('tokenTime', expirationDate);
                localStorage.setItem('userId', res.data.localId);

                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err.response.data.error))
            })
    }
};

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logOut())
        } else {
           const expirationTime = new Date(localStorage.getItem('tokenTime')) ;
           if (expirationTime <= new Date()) {
               dispatch(logOut())
           } else {
               const userId = localStorage.getItem('userId')
               dispatch(authSuccess(token, userId ));
               dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime() / 1000 )))
           }

        }
    }
};
