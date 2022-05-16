import styled from 'styled-components';
import Button from '../common/Button';

const WriteActionButtonsBlock = styled.div`
    margin-top: 1rem;
    margin-bottom: 3rem;
    padding-left: 1.125rem;
    button + button {
        margin-left: 0.5rem;
    }
`;

const StyledButton = styled(Button)`
    height: 2.7rem;
    & + & {
        margin-left: 0.5rem;
    }
`;

const WriteActionButtons = ({ onCancel, onPublish }) => {
    return (
        <WriteActionButtonsBlock>
            <StyledButton onClick={onPublish}>
                일기 등록
            </StyledButton>
            <StyledButton onClick={onCancel}>
                취소
            </StyledButton>
        </WriteActionButtonsBlock>
    );
};

export default WriteActionButtons;