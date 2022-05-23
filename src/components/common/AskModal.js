import styled from 'styled-components';
import Button from './Button';

const Fullscreen = styled.div`
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1020;

`;

const AskModalBlock = styled.div`
    width: 420px;
    background: white;
    padding: 1.5rem;
    border-radius: 4px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
    font-family: "S-CoreDream-3Light";
    font-size: 1.1rem;
    font-weight: normal;
    h2 {
        margin-top: 0;
        margin-bottom: 1rem;
    }
    p {
        margin-bottom: 3rem;
    }
    .buttons {
        width: 180px;
        display: flex;
        justify-content: flex-end;
    }
`;

const StyledButton = styled(Button)`
    height: 2rem;
    & + & {
        margin-left: 0.75rem;
    }
`;

const AskModal = ({
    visible,
    title,
    description,
    cancelText = '닫기',
    confirmText = '확인',
    onConfirm,
    onCancel,
    }) => {
    if (!visible) return null;
    return (
        <Fullscreen>
            <AskModalBlock>
                <h2>{title}</h2>
                <p>{description}</p>
                <div className = "buttons">
                    <StyledButton onClick={onConfirm}>{confirmText}</StyledButton>
                    <StyledButton onClick={onCancel}>{cancelText}</StyledButton>
                </div>
            </AskModalBlock>
        </Fullscreen>
    );
};

export default AskModal;