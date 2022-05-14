import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { withRouter } from "react-router-dom";
import { useParams, useLocation, useNavigation } from "react-router-dom";
import { readDiary, unloadDiary } from "../../modules/diary";
import DiaryViewer from "../../components/diary/DiaryViewer";
import DiaryActionButtons from '../../components/diary/DiaryActionButtons';
import { useEffect } from "react";

const DiaryViewerContainer = () => {
    // 처음 마운트될 때 일기 읽기 API 요청
    const { diaryId } = useParams();
    const dispatch = useDispatch();
    const { diary, error, loading } = useSelector(({ diary, loading }) => ({
        diary: diary.diary,
        error: diary.error,
        loading: loading['diary/READ_DIARY'],
    }));

    useEffect(() => {
        dispatch(readDiary(diaryId));
        // 언마운트 될 때 리덕스에서 일기 데이터 없애기
        return () => {
            dispatch(unloadDiary());
        };
    }, [dispatch, diaryId]);
    
    return (
        <DiaryViewer
            diary={diary}
            loading={loading}
            error={error}
            actionButtons={<DiaryActionButtons />}
        />
    );
};

export default DiaryViewerContainer;