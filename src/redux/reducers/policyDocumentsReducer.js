import { ActionTypes } from "../constants/action-types"

const initialState={
    policyDocuments:[]
}

export const policyDocumentsReducer = (state=initialState , {type,payload}) => {       // action is replaced by {type,payload}
    switch(type) {
        case ActionTypes.SET_POLICY_DOCUMENTS_LIST:
            return {...state,policyDocuments:payload};

        case ActionTypes.REMOVE_POLICY_DOCUMENTS_LIST:
            return {...state,policyDocuments:[]};

        default:
            return state;
    }
}