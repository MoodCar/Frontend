import './ReadDiary.css';
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import ReactHtmlParser from 'html-react-parser';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import palette from '../../lib/styles/palette';

ChartJS.register(ArcElement, Tooltip, Legend);

const StyledButton = styled.button`
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    color: ${palette.gray[6]};
    font-weight: bold;
    border: none;
    outline: none;
    font-size: 0.875rem;
    cursor: pointer;
    &:hover {
        background: ${palette.gray[1]};
        color: ${palette.gray[8]};
    }
    &+& {
        margin-left: 0.25rem;
    }
`;

const ReadDiary = () => {

    const [diarylist, setDiarylist] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const provider_Id = useRef(null);

    useEffect(() => {
        axios
        .get('/checklogin', { withCredentials: true })
        .then(response => {
            provider_Id.current = response.data[0].providerId;

            axios
            .get(`http://3.39.17.18/diaries/${provider_Id.current}`, { withCredentials: true })
            .then((response) => {
                setDiarylist(response.data.fetchResult);
                console.log("useRef")

            })
            .catch((error) => {
                console.log(error.response);
            })
            })
    }, [])

    function addDiaryList() {
        let diaryarr = [];
        for (var i=0; i<diarylist.length; i++) {
            diaryarr.push({
                id: diarylist[i].id,
                title: diarylist[i].emotion,
                date: diarylist[i].written_date.substr(0, 10),
                content: diarylist[i].content,
                color: '#ff000000',
                textColor: '#000000'
            })
        }
        return diaryarr;
    }

    useEffect(() => {
    }, [location])

    let path = location.pathname;
    let diaryid = path.substring(7);

    function theDiaryContent() {
        addDiaryList();
        let info = diarylist.map(diary => (diary.id));
        for (var j=0; j<diarylist.length; j++) {
            if(path === '/read/:' + info[j]) {
                return ReactHtmlParser(diarylist[j].content);
            };
        };
    }

    let info = diarylist.map(diary => (diary.id));
    function theDiaryDate() {
        addDiaryList();
        for (var j=0; j<diarylist.length; j++) {
            if(path === '/read/:' + info[j]) {
                // console.log('/read/:' + info[j]);
                return diarylist[j].written_date.substr(0, 10);
            };
        };
    }

    function theDiaryEmotion() {
        addDiaryList();
        for (var j=0; j<diarylist.length; j++) {
            if(path === '/read/:' + info[j]) {
                return diarylist[j].emotion;
            };
        };
    }

    function theDiaryHashtag() {
        addDiaryList();
        let hashtag1 = '';
        let hashtag2 = '';
        let hashtag3 = '';
        for (var j=0; j<diarylist.length; j++) {
            if(path === '/read/:' + info[j]) {
                hashtag1=diarylist[j].hashtag_1;
                hashtag2=diarylist[j].hashtag_2;
                hashtag3=diarylist[j].hashtag_3;
            };
        };
        return (
            hashtag1 + ', ' + hashtag2 + ', ' + hashtag3
        )
    }

    const score = [];

    function theDiaryScore() {
        addDiaryList();
        for (var j=0; j<diarylist.length; j++) {
            if(path === '/read/:' + info[j]) {
                score.push(diarylist[j].neutral_score)
                score.push(diarylist[j].happy_score)
                score.push(diarylist[j].sad_score)
                score.push(diarylist[j].fear_score)
                score.push(diarylist[j].disgust_score)
                score.push(diarylist[j].anger_score)
                score.push(diarylist[j].surprise_score)
            };
        };
    }

    const data = {
        labels: ['중립', '행복', '슬픔', '공포', '혐오', '분노', '놀람'],
        datasets: [
          {
            data: score,
            backgroundColor: [
              '#808080',
              '#eef181',
              '#627ac4',
              '#60b671',
              '#df8243',
              '#e44d4d',
              '#9474c8',
            ],
          },
        ],
    };

    const onEdit = () => {
        navigate('/write');
    };

    const onRemove = async() => {
        await axios
        .delete(`http://3.39.17.18/diaries/details/${diaryid}`, { withCredentials: true })
        .then((response) => {
            console.log(response);
            navigate('/');
        })
        .catch((error) => {
            console.log(error.response);
        })
    };

    return (
        <>
        <div className = "ReadDiary">
            <h2>일기 세부 내용</h2>
            <h1>{score[1]}</h1>
        </div>
        <div className = "button-container">
            <StyledButton onClick={onEdit}>수정</StyledButton>
            <StyledButton onClick={onRemove}>삭제</StyledButton>
            <StyledButton onClick={() => navigate('/')}>홈</StyledButton>
        </div>
            <div className='diary-container'>
                <>
                    <div>
                        {'날짜 : ' + theDiaryDate()}
                    </div>
                    <br />
                    <div>
                        {'일기 내용 : '}
                        <br />
                        {theDiaryContent()}
                    </div>
                    <br />
                    <div>
                        {'감정 : ' + theDiaryEmotion()}
                    </div>
                    <br />
                    <div>
                        {'키워드 : ' + theDiaryHashtag()}
                    </div>
                    <br />
                    <div>
                        {theDiaryScore()}
                    </div>
                    <br />
                    <div className='chart-container'>
                        <Pie data={data} />
                    </div>
                </>
            </div>
        </>
    );
};

export default ReadDiary;