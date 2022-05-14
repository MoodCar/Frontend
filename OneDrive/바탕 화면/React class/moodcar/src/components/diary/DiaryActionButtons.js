import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { useState, useCallback } from 'react';
import AskRemoveModal from './AskRemoveModal';
import { removeDiary } from '../../lib/api/diary';
import { useNavigate } from 'react-router-dom';

const PostActionButtonsBlock = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;
    margin-top: -1.5rem;
    margin-right: 5rem;
`;

const ActionButton = styled.button`
    padding: 0.5rem 0.8rem;
    border-radius: 4px;
    color: ${palette.gray[6]};
    font-weight: bold;
    border: none;
    outline: none;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
        background: ${palette.gray[1]};
        color: ${palette.gray[7]};
    }
    & + & {
        margin-left: 0.4rem;
    }
`;

const DiaryActionButtons = ({ onEdit, onRemove }) => {

    const [modal, setModal] = useState(false);
    const onRemoveClick = () => {
        setModal(true);
    };
    const onCancel = () => {
        setModal(false);;
    };
    const onConfirm = () => {
        setModal(false);
        onRemove();
    };


    return (
        <>
        <PostActionButtonsBlock>
            <ActionButton onClick={onEdit}>수정</ActionButton>
            <ActionButton onClick={onRemoveClick}>삭제</ActionButton>
        </PostActionButtonsBlock>
        <AskRemoveModal 
            visible={modal}
            onConfirm={onConfirm}
            onCancel={onCancel}
        />
        </>
    );
};

export default DiaryActionButtons;