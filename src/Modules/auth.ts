import {
    createAction,
    ActionType,
    createReducer,
}   from "typesafe-actions";

const SIGN_IN_SUCCESS = "auth/SIGN_IN_SUCCESS" as const;
const SIGN_IN_FAIL = "auth/SIGN_IN_FAIL" as const;
const SIGN_UP_SUCCESS = "auth/SIGN_UP_SUCCESS" as const;
const SIGN_UP_FAIL = "auth/SIGN_UP_FAIL" as const;
const SIGN_OUT = "auth/SIGN_OUT" as const;
export const signInSuccess = createAction(SIGN_IN_SUCCESS)();
export const signInFail = createAction(SIGN_IN_FAIL)();
export const signUpSuccess = createAction(SIGN_UP_SUCCESS)();
export const signUpFail = createAction(SIGN_UP_FAIL)();
export const signOut = createAction(SIGN_OUT)();
const actions = {
    signInSuccess,
    signInFail,
    signUpSuccess,
    signUpFail,
    signOut,
};

type authAction = ActionType<typeof actions>;

export type authState = {
    isSignedIn : boolean;
}

const initialState : authState = {
    isSignedIn : false
}

const auth = createReducer<authState, authAction>(
    initialState, {
        [SIGN_IN_SUCCESS] : state => ({ isSignedIn : true }), 
        [SIGN_UP_SUCCESS] : state => ({ isSignedIn : true }),
        [SIGN_IN_FAIL] : state => ({ isSignedIn : false }), 
        [SIGN_UP_FAIL] : state => ({ isSignedIn : false }),
        [SIGN_OUT] : state => ({ isSignedIn : false })
    }
)

export default auth;