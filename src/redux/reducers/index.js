import { combineReducers } from 'redux';
import { policyDocumentsReducer } from './policyDocumentsReducer';

const reducers = combineReducers({
    policyDocuments:policyDocumentsReducer
})

export default reducers;