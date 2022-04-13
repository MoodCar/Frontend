import React, { useEffect } from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { writeDiary } from '../../modules/write';

const WriteActionButtonsContainer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { title, content, diary, diaryError } = useSelector(({ write }) => ({
        title: write.title,
        content: write.content,
        diary: write.diary,
        diaryError: write.diaryError,
    }));

    // 일기 등록
    const onPublish = () => {
        dispatch(
            writeDiary({
                title,
                content,
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
            navigate(`/@${user.email}/${_id}`);
        }
        if (diaryError) {
            console.log(diaryError);
        }
    }, [navigate, diary, diaryError]);
    return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />;
};

export default WriteActionButtonsContainer;