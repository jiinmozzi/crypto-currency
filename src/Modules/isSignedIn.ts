import {
    createAction,
    ActionType,
    createReducer,
}   from "typesafe-actions";

const SIGN_IN = 'isSignedIn/SIGN_IN' as const;
const SIGN_OUT = 'isSignedIn/SIGN_OUT' as const;

export const signin = createAction(SIGN_IN)();
export const signout = createAction(SIGN_OUT)();

const actions = {signin, signout};
type isSignedInAction = ActionType<typeof actions>;


export type IsSignedInState = {
    isSignedIn : boolean;
}
const initialState : IsSignedInState = {
    isSignedIn : false
};

const isSignedIn = createReducer<IsSignedInState, isSignedInAction>(initialState, {
    [SIGN_IN] : state => ({ isSignedIn : true}),
    [SIGN_OUT] : state => ({ isSignedIn : false}),
});
    
export default isSignedIn;