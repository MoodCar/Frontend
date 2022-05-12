import React, { useEffect } from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { writeDiary } from '../../modules/write';
import * as diaryAPI from '../../lib/api/diary.js';

const WriteActionButtonsContainer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { title, content, date, diary, diaryError } = useSelector(({ write }) => ({
        title: write.title,
        content: write.content,
        date: write.date,
        diary: write.diary,
        diaryError: write.diaryError,
    }));

    // 일기 등록
    const onPublish = () => {
        dispatch(
            writeDiary({
                title,
                content,
                date,
            }),
        );
    };

    // 취소
    const onCancel = () => {
        navigate(-1);
    };

    // 성공 혹은 실패 시 할 작업
    useEffect(() => {
        if (diary) {
            const { _id, user } = diary;
            // navigate(`/@${user.email}/${_id}`);
            navigate('/', { replace: true });
            // 감정api post?
            // 해당 일기의 내용에서 감정정보를 추출하도록 요청한다
        }
        if (diaryError) {
            console.log(diaryError);
        }
    }, [navigate, diary, diaryError]);
    return <WriteActionButtons onPublish={diaryAPI.writeDiary} onCancel={onCancel} />;
};

export default WriteActionButtonsContainer;