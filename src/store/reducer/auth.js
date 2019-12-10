import * as actionTypes from '../actions/actionTypes';
import { updateOdject } from "../../shared/utillity";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirect: '/'
};

const setAuthRedirectPath = (state, action) => {
    return updateOdject(state, {authRedirect: action.path})
}

const authStart = (state, action) => {
    return updateOdject(state, {error:null, loading:true})
};

const authSuccess = (state, action) => {
    return updateOdject(state,
        {
            token: action.idToken,
            userId: action.localId,
            error:null,
            loading:false
        })
};

const authFail = (state, action) => {
    return updateOdject(state,
        {
            error: action.error,
            loading:false
        })
};

const authLogout = (state, action) => {
    return updateOdject(state, {
        token: null,
        userId: null
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default:
            return state
    }
};

export default reducer;
