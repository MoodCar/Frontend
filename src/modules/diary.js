import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes, } from "../lib/createRequestSaga";
import * as diaryAPI from '../lib/api/diary';
import { takeLatest } from 'redux-saga/effects';

const [
    READ_DIARY,
    READ_DIARY_SUCCESS,
    READ_DIARY_FAILURE,
] = createRequestActionTypes('diary/READ_DIARY');
const UNLOAD_DIARY = 'diary/UNLOAD_DIARY'; // 일기 페이지에서 벗어날 때 데이터 비우기

export const readDiary = createAction(READ_DIARY, diaryId => diaryId);
export const unloadDiary = createAction(UNLOAD_DIARY);

const readDiarySaga = createRequestSaga(READ_DIARY, diaryAPI.readDiary);
export function* diarySaga() {
    yield takeLatest(READ_DIARY, readDiarySaga);
}

const initialState = {
    diary: null,
    error: null,
};

const diary = handleActions(
    {
        [READ_DIARY_SUCCESS]: (state, { payload: diary }) => ({
            ...state,
            diary,
        }),
        [READ_DIARY_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        }),
        [UNLOAD_DIARY]: () => initialState,
    },
    initialState,
);

export default diary;