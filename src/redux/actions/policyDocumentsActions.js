import { ActionTypes } from '../constants/action-types';

export const setPolicyDocumentList=(policyDocuments)=>{
    return {
        type:ActionTypes.SET_POLICY_DOCUMENTS_LIST,
        payload: policyDocuments,
    }

}

export const removePolicyDocumentList=()=>{
    return {
        type:ActionTypes.REMOVE_POLICY_DOCUMENTS_LIST,
        payload: [],
    }
}