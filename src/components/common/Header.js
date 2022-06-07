import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import logo from '../../images/logo.png';
import { getYear, getMonth } from "date-fns"; // getYear, getMonth 
import DatePicker, { registerLocale } from "react-datepicker";  // 한국어적용
import ko from 'date-fns/locale/ko'; // 한국어적용
import * as googleAPI from '../../lib/api/auth';
import UserName from '../auth/UserName';
import axios from 'axios';
import * as diaryAPI from '../../lib/api/diary';
import ReactPlayer from 'react-player/youtube'
import AskModal from './AskModal';
import '../../lib/styles/fonts/font.css';

registerLocale("ko", ko) // 한국어적용
const _ = require('lodash');

const HeaderBlock = styled.div`
    position: fixed;
    width: 100%;
    background: white;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.08);
    z-index: 1010;
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
        align-items: center;
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
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    font-family: NeoDunggeunmo;
    font-size: 1.2rem;
    font-weight: normal;
`;

const StyledButton = styled(Button)`
    height: 2.4rem;
    & + & {
        margin-left: 0.5rem;
    }
`;

const Header = () => {
    const [modal, setModal] = useState(false);
    const onCancel = () => {
        setModal(false);
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }

    const [em, setEm] = useState('');
    const [url, setUrl] = useState('');
    const [contentName, setContentName] = useState('');
    const [publisher, setPublisher] = useState('');
    const [color, setColor] = useState('');
    let emotion;
    async function getData() {
        try {
            const getProviderId = await axios.get("/checklogin", {
            withCredentials: true,
        });
        let providerId = await getProviderId.data[0].providerId;
        const getTodayDiary = await axios.get(
            `http://3.39.17.18/diaries/today/${providerId}`,
            { withCredentials: true }
        );
        let today = getTodayDiary.data.code;
        if (today === 200) {
            emotion = getTodayDiary.data.getTodayResult[0].emotion;
            setEm(getTodayDiary.data.getTodayResult[0].emotion);
            setUrl(getTodayDiary.data.getTodayResult[0].url);
            setContentName(getTodayDiary.data.getTodayResult[0].name);
            setPublisher(getTodayDiary.data.getTodayResult[0].publisher);
            if(getTodayDiary.data.getTodayResult[0].emotion === '행복') {
                setColor('#eef18e');
            }
            else if(getTodayDiary.data.getTodayResult[0].emotion === '분노') {
                setColor('#e44d4d')
            }
            else if(getTodayDiary.data.getTodayResult[0].emotion === '혐오') {
                setColor('#df8243')
            }
            else if(getTodayDiary.data.getTodayResult[0].emotion === '공포') {
                setColor('#60b671')
            }
            else if(getTodayDiary.data.getTodayResult[0].emotion === '중립') {
                setColor('#808080')
            }
            else if(getTodayDiary.data.getTodayResult[0].emotion === '슬픔') {
                setColor('#627ac4')
            }
            else if(getTodayDiary.data.getTodayResult[0].emotion === '놀람') {
                setColor('#9474c8')
            }
        } else {
            emotion = 0;
        }
        return [today, emotion];
        } catch (err) {
        console.log(err);
        }
    }

    async function writeButtonClick() {
        let [today, emotion] = await getData();
        if(today !== 200){
            window.location.href = 'http://localhost:3000/write';
        }
        else{
            alert("오늘 일기가 이미 존재합니다.");
        }
    }

    function searchButtonClick() {
        window.location.href = 'http://localhost:3000/search';
    }

    async function contentsButtonClick () {
        let [today, emotion] = await getData();
        if(today === 200){
            setModal(true);
            document.body.style.cssText = `
            position: fixed; 
            top: -${window.scrollY}px;
            overflow-y: scroll;
            width: 100%;`;
        }
        else{
            alert("오늘 일기가 존재하지 않습니다.");
        }
    }

    function statsButtonClick() {
        window.location.href = 'http://localhost:3000/statistics';
    }
    return (
        <>
            <HeaderBlock>
                <Wrapper>
                    <Link to="/main" className="logo">
                        <img src={logo} alt="logo" />
                    </Link>
                    <div className="right">
                        <StyledButton onClick={statsButtonClick}>통계 보기</StyledButton>
                        <StyledButton onClick={contentsButtonClick}>contents</StyledButton>
                        <AskModal
                            visible={modal}
                            title="콘텐츠 추천"
                            description={
                                <>
                                <div style={{ float: "left"}}> {'오늘 일기의 감정은'}&nbsp; </div> <div style={{ float: "left", backgroundColor: color, fontWeight: "bold"}}>&nbsp;{em}&nbsp;</div> <div style={{ float: "left"}}>{'입니다'}</div>
                                <br />
                                <div> {publisher + ' - ' + contentName} </div>
                                <br />
                                <ReactPlayer 
                                className="react-player" 
                                url={url}
                                width="100%" 
                                height="230px" 
                                muted={true}
                                playing={true} 
                                loop={true}
                                controls={true} />
                            </>}
                            onCancel={onCancel}
                        />
                        <StyledButton onClick={searchButtonClick}>
                            일기 검색
                        </StyledButton>
                        <StyledButton onClick ={writeButtonClick}>
                            일기 작성
                        </StyledButton>
                        <UserInfo>
                            <googleAPI.Users />
                        </UserInfo>
                        <StyledButton onClick={googleAPI.logout}>로그아웃</StyledButton>    
                    </div>
                </Wrapper>
            </HeaderBlock>
            <Spacer />
        </>
    );
};

export default Header;