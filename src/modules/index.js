import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from "./loading";
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import diary, { diarySaga } from './diary';

const rootReducer = combineReducers({
    auth,
    loading,
    user,
    write,
    diary,
});

export function* rootSaga() {
    yield all([authSaga(), userSaga(), writeSaga(), diarySaga()]);
}

export default rootReducer;