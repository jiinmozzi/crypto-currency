import {
    createAction,
    ActionType,
    createReducer,
}   from "typesafe-actions";

const MODIFICATION_ACTIVATE = "modificationActivated/MODIFICATION_ACTIVATE" as const;

export const activate = createAction(MODIFICATION_ACTIVATE)();

const actions = {
    activate,
}

type modificationActivatedAction = ActionType<typeof actions>;

export type modificationActivatedState = {
    isActivated : boolean;
}

const initialState : modificationActivatedState = {
    isActivated : false
}

const modificationActivated = createReducer<modificationActivatedState, modificationActivatedAction>(
    initialState, {
        [MODIFICATION_ACTIVATE] : (state) => ({isActivated : false})
    }
)

export default modificationActivated;