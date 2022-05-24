import './ReadDiary.css';
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import ReactHtmlParser from 'html-react-parser';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import AskModal from '../common/AskModalConfirm';
import palette from '../../lib/styles/palette';
import '../../lib/styles/fonts/font.css';
import neutral from '../../images/neutral.png';
import happy from '../../images/happy.png';
import sad from '../../images/sad.png';
import fear from '../../images/fear.png';
import disgust from '../../images/disgust.png';
import anger from '../../images/anger.png';
import surprise from '../../images/surprise.png';

ChartJS.register(ArcElement, Tooltip, Legend);

const StyledButton = styled.button`
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    color: ${palette.gray[6]};
    font-family: "S-CoreDream-3Light";
    font-size: 1.1rem;
    font-weight: normal;
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

const SelectBox = styled.select`
	margin: 0;
	min-width: 0;
	display: block;
	width: 100%;
	padding: 8px 8px;
	font-size: inherit;
	line-height: inherit;
	border: 1px solid;
	border-radius: 4px;
	color: inherit;
	background-color: transparent;
    font-family: "S-CoreDream-3Light";
    font-size: 1.1rem;
    font-weight: normal;
	&:focus {
		border-color: gray;
	}
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 2em;
    resize: none;
    margin-top: 10px;
    font-family: "S-CoreDream-3Light";
    font-size: 1.1rem;
    font-weight: normal;
`;

const ReadDiary = () => {

    const [diarylist, setDiarylist] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const provider_Id = useRef(null);
    const [emotionModal, setEmotionModal] = useState(false);
    const [keywordModal, setKeywordModal] = useState(false);
    const [emotionFeedbackModal, setEmotionFeedbackModal] = useState(false);
    const [keywordFeedbackModal, setKeywordFeedbackModal] = useState(false);
    const [emotion, setEmotion] = useState('');
    const [keyword1, setKeyword1] = useState('');
    const [keyword2, setKeyword2] = useState('');
    const [keyword3, setKeyword3] = useState('');

    const onEmotionModalButtonClick = () => {
        setEmotionModal(true);
        document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
    }
    const onEmotionCancel = () => {
        setEmotionModal(false);
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }

    const onKeywordModalButtonClick = () => {
        setKeywordModal(true);
        document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
    }
    const onKeywordCancel = () => {
        setKeywordModal(false);
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }

    const onEmotionFeedbackModalClick = () => {
        setEmotionFeedbackModal(true);
    }
    const onEmotionFeedbackCancel = () => {
        setEmotionFeedbackModal(false);
    }

    const onKeywordFeedbackModalClick = () => {
        setKeywordFeedbackModal(true);
    }
    const onKeywordFeedbackCancel = () => {
        setKeywordFeedbackModal(false);
    }

    useEffect(() => {
        axios
        .get('/checklogin', { withCredentials: true })
        .then(response => {
            provider_Id.current = response.data[0].providerId;

            axios
            .get(`http://3.39.17.18/diaries/${provider_Id.current}`, { withCredentials: true })
            .then((response) => {
                setDiarylist(response.data.fetchResult);

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
                // return diarylist[j].emotion;
                if(diarylist[j].emotion === '중립') {
                    return (
                        <>
                        <img src={neutral} alt='neutral'/>
                        <div>중립&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        </>
                    )
                }
                else if(diarylist[j].emotion === '행복') {
                    return (
                        <>
                        <img src={happy} alt='happy'/>
                        <div>행복&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        </>
                    )
                }
                else if(diarylist[j].emotion === '슬픔') {
                    return (
                        <>
                        <img src={sad} alt='sad'/>
                        <div>슬픔&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        </>
                    )
                }
                else if(diarylist[j].emotion === '공포') {
                    return (
                        <>
                        <img src={fear} alt='fear'/>
                        <div>공포&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        </>
                    )
                }
                else if(diarylist[j].emotion === '혐오') {
                    return (
                        <>
                        <img src={disgust} alt='disgust'/>
                        <div>혐오&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        </>
                    )
                }
                else if(diarylist[j].emotion === '분노') {
                    return (
                        <>
                        <img src={anger} alt='anger'/>
                        <div>분노&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        </>
                    )
                }
                else if(diarylist[j].emotion === '놀람') {
                    return (
                        <>
                        <img src={surprise} alt='surprise'/>
                        <div>놀람&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        </>
                    )
                }
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
            '#' + hashtag1 + ' #' + hashtag2 + ' #' + hashtag3
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

    const OPTIONS = [
        { value: {theDiaryEmotion}, name: "감정을 선택하세요"},
        { value: "중립", name: "중립" },
        { value: "행복", name: "행복" },
        { value: "슬픔", name: "슬픔" },
        { value: "공포", name: "공포" },
        { value: "놀람", name: "놀람" },
        { value: "분노", name: "분노" },
        { value: "혐오", name: "혐오" },
    ];

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

    const handleSelectChange = (e) => {
        setEmotion(e.target.value);
    }

    const handleTag1Change = (e) => {
        setKeyword1(e.target.value);
    }

    const handleTag2Change = (e) => {
        setKeyword2(e.target.value);
    }

    const handleTag3Change = (e) => {
        setKeyword3(e.target.value);
    }

    const onEditEmotion = async () => {
        await axios
        .patch(`http://3.39.17.18/diaries/emotions/${diaryid}`, { emotion: emotion }, { withCredentials: true })
        .then((response) => {
            console.log(response);
            setEmotionModal(false);
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
            navigate('/');
        })
        .catch((error) => {
            console.log(error.response);
            alert("다시 시도해주세요");
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        })
    }

    const onEditKeyword = async () => {
        await axios
        .patch(`http://3.39.17.18/diaries/hashtags/${diaryid}`, { hashtag_1: keyword1,  hashtag_2: keyword2, hashtag_3: keyword3 }, { withCredentials: true })
        .then((response) => {
            console.log(response);
            setKeywordModal(false);
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
            navigate('/');
        })
        .catch((error) => {
            console.log(error.response);
            alert("다시 시도해주세요");
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        })
    }

    const onEmotionFeedback = async () => {
        await axios
        .post('http://3.39.17.18/feedbacks/emotions', { withCredentials: true })
    }

    return (
        <>
        <div className = "ReadDiary">
            <h2>일기 세부 내용</h2>
        </div>
        <div className = "button-container">
            <StyledButton onClick={onEdit}>수정</StyledButton>
            <StyledButton onClick={onRemove}>삭제</StyledButton>
            <StyledButton onClick={() => navigate('/')}>홈</StyledButton>
        </div>
        <div className='button-container'>
            <StyledButton onClick={onEmotionModalButtonClick}>감정 수정</StyledButton>
            <AskModal
                visible={emotionModal}
                title="감정 수정"
                description={
                    <SelectBox onChange={handleSelectChange}>
                        {OPTIONS.map((option) => (
				            <option
					        key={option.value}
					        value={option.value}
				            >
					        {option.name}
				            </option>
			            ))}
                    </SelectBox>}
                onConfirm={onEditEmotion}
                onCancel={onEmotionCancel}
            />
            <StyledButton onClick={onKeywordModalButtonClick}>키워드 수정</StyledButton>
            <AskModal
                visible={keywordModal}
                title="키워드 수정"
                description={
                    <>
                    <div>
                        <div>{"키워드 1"}</div>
                        <TextArea onChange={handleTag1Change} placeholder="키워드를 입력해 주세요"/>
                    </div>
                    <br />
                    <div>
                        <div>{"키워드 2"}</div>
                        <TextArea onChange={handleTag2Change} placeholder="키워드를 입력해 주세요"/>
                    </div>
                    <br />
                    <div>
                        <div>{"키워드 3"}</div>
                        <TextArea onChange={handleTag3Change} placeholder="키워드를 입력해 주세요"/>
                    </div>
                    </>
                }
                onConfirm={onEditKeyword}
                onCancel={onKeywordCancel}
            />
        </div>
            <div className='diary-container'>
                <>
                    <h3 align='center'>
                        {theDiaryDate()}
                    </h3>
                    <br />
                    <div className='content'>
                        {theDiaryContent()}
                    
                    <br />
                    <h4 align='right'>
                        {theDiaryEmotion()}
                    </h4>
                    <h4 align='right'>
                        {theDiaryHashtag()}
                    </h4>
                    <br />
                    <div>
                        {theDiaryScore()}
                    </div>
                    </div>
                    <br />
                    <div className='chart-container'>
                        <Pie data={data} />
                    </div>
                    <div className='feedback-buttons'>
                        <StyledButton onClick={onEmotionFeedbackModalClick}>감정 피드백 보내기</StyledButton>
                        <AskModal
                            visible={emotionFeedbackModal}
                            title="감정 feedback"
                            description="feedback"
                            onConfirm={onEditEmotion}
                            onCancel={onEmotionFeedbackCancel}
                        />
                        <StyledButton onClick={onKeywordFeedbackModalClick}>키워드 피드백 보내기</StyledButton>
                    </div>
                </>
            </div>
        </>
    );
};

export default ReadDiary;