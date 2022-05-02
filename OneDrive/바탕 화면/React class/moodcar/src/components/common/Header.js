import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import logo from '../../images/logo.png';
import { getYear, getMonth } from "date-fns"; // getYear, getMonth 
import DatePicker, { registerLocale } from "react-datepicker";  // 한국어적용
import ko from 'date-fns/locale/ko'; // 한국어적용

registerLocale("ko", ko) // 한국어적용
const _ = require('lodash');

const HeaderBlock = styled.div`
    position: fixed;
    width: 100%;
    background: white;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.08);
`;

/**
 * Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 */

const Wrapper = styled(Responsive)`
    height: 5rem;
    width: 100%;
    padding-right: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between; /* 자식 엘리먼트 사이의 여백을 최대로 설정 */
    .logo {
        font-size: 1.5rem;
        font-weight: 800;
        letter-spacing: 1px;
    }
    .right {
        display: flex;
        align-items: center;
    }
    .search {
        display: flex;
        align-items: fixed-end;
    }
`;

/**
 * 헤더가 fixed로 되어 있기 때문에 페이지의 콘텐츠가 4rem 아래에 나타나도록 해 주는 컴포넌트
 */

const Spacer = styled.div`
    height: 6rem;
`;

const UserInfo = styled.div`
    font-weight: 800;
    margin-right: 1rem;
`;

const StyledButton = styled(Button)`
    height: 2.3rem;
    & + & {
        margin-left: 0.5rem;
    }
`;

const SelectDate = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const years = _.range(1990, getYear(new Date()) + 1, 1);
    const months = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
    // console.log();
    return (
        <DatePicker
            renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled
        }) => (
        <div
            style={{
            margin: 10,
            display: "flex",
            justifyContent: "center"
          }}
        >
        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
        </button>
        <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
        >
        {years.map(option => (
            <option key={option} value={option}>
                {option}
            </option>
        ))}
        </select>

        <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
            changeMonth(months.indexOf(value))
        }
        >
        {months.map(option => (
            <option key={option} value={option}>
                {option}
            </option>
        ))}
        </select>

        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
        </button>
        </div>
        )}
        selected={startDate}
        dateFormat={"yyyy/MM/dd"}
        locale={ko}
        onChange={date => setStartDate(date)}
        todayButton="today"
        />
    );
};

const Header = ({ user, onLogout }) => {
    return (
        <>
            <HeaderBlock>
                <Wrapper>
                    <Link to="/" className="logo">
                        <img src={logo} />
                    </Link>
                    <div className="search">
                        {/* <SelectDate /> */}
                    </div>
                    {user ? (
                        <div className="right">
                            <UserInfo>{user.email}</UserInfo>
                            <StyledButton onClick={onLogout}>로그아웃</StyledButton>
                        </div>
                    ) : (
                        <div className="right">
                            <StyledButton to="/write">
                                write
                            </StyledButton>
                            <StyledButton to="/login">
                                로그인
                            </StyledButton>
                        </div>
                    )}
                </Wrapper>
            </HeaderBlock>
            <Spacer />
        </>
    );
};

export default Header;