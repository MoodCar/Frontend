import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes, } from '../lib/createRequestSaga';
import * as diaryAPI from '../lib/api/diary';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'write/INITIALIZE'; // 모든 내용 초기화
const CHANGE_FIELD = 'write/CHANGE_FIELD'; // 특정 key 값 바꾸기
const CHANGE_DATE = 'write/CHANGE_DATE';
const [
    WRITE_DIARY,
    WRITE_DIARY_SUCCESS,
    WRITE_DIARY_FAILURE,
] = createRequestActionTypes('write/WRITE_DIARY'); // 일기 작성

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
    key,
    value,
}));
export const changeDate = createAction(CHANGE_DATE);
export const writeDiary = createAction(WRITE_DIARY, ({ content }) => ({
    content,
    // date,
}));

// 사가 생성
const writeDiarySaga = createRequestSaga(WRITE_DIARY, diaryAPI.writeDiary);
export function* writeSaga() {
    yield takeLatest(WRITE_DIARY, writeDiarySaga);
}

const initialState = {
    content: '',
    date: '',
    diary: null,
    diaryError: null,
};

const dateState = {
    date: '',
};

const write = handleActions(
    {
        [INITIALIZE]: state => initialState, // initialSate를 넣으면 초기 상태로 바뀜
        [CHANGE_DATE]: (state, { payload: { key } }) => ({
            ...state,
            date : '',
        }),
        [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
            ...state,
            [key]: value, // 특정 key 값을 업데이트
            date: 'value',
        }),
        [WRITE_DIARY]: state => ({
            ...state,
            // diary와 diaryError를 초기화
            diary: null,
            diaryError: null,
        }),
        // 일기 작성 성공
        [WRITE_DIARY_SUCCESS]: (state, { payload: diary }) => ({
            ...state,
            diary,
        }),
        // 일기 작성 실패
        [WRITE_DIARY_FAILURE]: (state, { payload: diaryError }) => ({
            ...state,
            diaryError,
        }),
    },
    initialState,
);

export default write;