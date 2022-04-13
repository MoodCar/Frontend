import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';


const buttonStyle = css`
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.4rem 1rem;
    color: white;
    outline: none;
    cursor: pointer;
    height: 35px;

    background: ${palette.gray[8]};
    &:hover {
        background: ${palette.gray[6]};
    }

    ${props => 
        props.fullWidth &&
        css`
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            width: 100%;
            font-size: 1.125rem;
        `}

    ${props =>
        props.black &&
        css`
            background: ${palette.gray[9]};
            &hover {
                background: ${palette.gray[8]};
            }
        `}
`;

const StyledButton = styled.button`
            ${buttonStyle}
`;

const StyledLink = styled(Link)`
            ${buttonStyle}
`;

const Button = props => {
    return props.to ? (
        <StyledLink {...props} black={props.black ? 1 : 0} />
    ) : (
        <StyledButton {...props} />
    );
};

export default Button;