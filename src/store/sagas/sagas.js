import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'
import { API_CALL_REQUEST } from '../actions/asyncActions'

// Watcher SAGA
// Listens the API_CALL_REQUEST actions
export function* watcherSaga(){
    // Listen the action starts a Worker Saga
    yield takeLatest(API_CALL_REQUEST, workerSaga)
}

// Watcher SAGA
// Is called from watcher Saga, does the Login and Dispatch an action
export function* workerSaga(action){
    try{
        const response = yield call(fetchHttp(action.payload.request))
        // We Obtain token from response
        const token = response. data.token
        yield put ({
            type: action.payload.okAction,
            payload: {
                token: token
            }
        })
    } catch (error){
        yield put ({
            type: action.payload.failAction,
            payload: {
                token: error
            }
        })
    }
}

function fetchHttp(request){
    return function(){
        return(axios(request))
    }
}