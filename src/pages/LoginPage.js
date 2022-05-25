import React from 'react';
import Button from '../components/common/Button';
import styled from 'styled-components';
import * as googleAPI from '../lib/api/auth';

const StyledButton = styled(Button)`
    height: 2.4rem;
    & + & {
        margin-left: 0.5rem;
    }
`;

const LoginPage = () => {
    return (
        <>
            {'로그인 페이지'}
            <div>
            <StyledButton onClick={googleAPI.login}>로그인</StyledButton>
            </div>
        </>
    );
    // })

};

export default LoginPage;