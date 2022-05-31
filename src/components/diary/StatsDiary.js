import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import happy_folder from '../../images/happy_folder.png';
import neutral_folder from '../../images/neutral_folder.png';
import sad_folder from '../../images/sad_folder.png';
import surprise_folder from '../../images/surprise_folder.png';
import anger_folder from '../../images/anger_folder.png';
import disgust_folder from '../../images/disgust_folder.png';
import fear_folder from '../../images/fear_folder.png';
import '../../lib/styles/fonts/font.css';
import './StatsDiary.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatsDiary = () => {
    // const labels = ['중립', '행복', '슬픔', '분노', '혐오', '놀람', '공포'];
    const [emotionlist, setEmotionlist] = useState([]);
    const provider_Id = useRef(null);
    const neutral = useRef(0);
    const happy = useRef(0);
    const sad = useRef(0);
    const fear = useRef(0);
    const disgust = useRef(0);
    const anger = useRef(0);
    const surprise = useRef(0);
    const total = useRef(0);
    const [searchlist, setSearchlist] = useState([]);
    const [color1, setColor1] = useState(true);
    const [color2, setColor2] = useState(true);
    const [color3, setColor3] = useState(true);
    const [color4, setColor4] = useState(true);
    const [color5, setColor5] = useState(true);
    const [color6, setColor6] = useState(true);
    const [color7, setColor7] = useState(true);
    const navigate = useNavigate();
/*
    useEffect(() => {
        axios
        .get('/checklogin', { withCredentials: true })
        .then(response => {
            provider_Id.current = response.data[0].providerId;
            axios
            .get(`http://3.39.17.18/diaries/emotioncounts/${provider_Id.current}`, { withCredentials: true })
            .then((response) => {
                setEmotionlist(response.data.emotionCountResult);
                console.log(response.data);
                neutral.current = response.data.emotionCountResult[0].중립;
                happy.current = response.data.emotionCountResult[0].행복;
                sad.current = response.data.emotionCountResult[0].슬픔;
                fear.current = response.data.emotionCountResult[0].공포;
                disgust.current = response.data.emotionCountResult[0].혐오;
                anger.current = response.data.emotionCountResult[0].분노;
                surprise.current = response.data.emotionCountResult[0].놀람;
                total.current = neutral.current + happy.current + sad.current + fear.current + disgust.current + anger.current + surprise.current;
            })
            .catch((error) => {
                console.log(error.response);
            })
        })
    }, [])*/

    useEffect(() => {
        async function getData() {
            await axios
            .get('/checklogin', { withCredentials: true })
            .then(response => {
                provider_Id.current = response.data[0].providerId;
                axios
                .get(`http://3.39.17.18/diaries/emotioncounts/${provider_Id.current}`, { withCredentials: true })
                .then((response) => {
                    setEmotionlist(response.data.emotionCountResult);
                    console.log(response.data);
                    neutral.current = response.data.emotionCountResult[0].중립;
                    happy.current = response.data.emotionCountResult[0].행복;
                    sad.current = response.data.emotionCountResult[0].슬픔;
                    fear.current = response.data.emotionCountResult[0].공포;
                    disgust.current = response.data.emotionCountResult[0].혐오;
                    anger.current = response.data.emotionCountResult[0].분노;
                    surprise.current = response.data.emotionCountResult[0].놀람;
                    total.current = neutral.current + happy.current + sad.current + fear.current + disgust.current + anger.current + surprise.current;
                })
                .catch((error) => {
                    console.log(error.response);
                })
            })
        }
        getData();
    }, [provider_Id.current])

    const data = {
        labels: ['전체', '중립', '행복', '슬픔', '공포', '혐오', '분노', '놀람'],
        datasets: [
          {
            data: [total.current, neutral.current, happy.current, sad.current, fear.current, disgust.current, anger.current, surprise.current],
            backgroundColor: [
                '#38363a',
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

    const options = {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 0,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            display: false,
            labels: {
                font: {
                    family: "S-CoreDream-3Light",
                    size: 24
                }
            }
          },
          title: {
            display: true,
            text: '일기 전체 통계',
          },
        },
    };

    const neutralClick = async() => {
        await axios
        .get('/checklogin', { withCredentials: true })
        .then(response => {
            provider_Id.current = response.data[0].providerId;
            axios
            .post(`http://3.39.17.18/diaries/emotions/${provider_Id.current}`, { emotion: '중립' }, { withCredentials: true })
            .then((response) => {setSearchlist(response.data.getDiaryResult);
                setColor1(false); setColor2(true); setColor3(true); setColor4(true); setColor5(true); setColor6(true); setColor7(true);})
            .catch((error) => {console.log(error.response);})
        })
    };

    const happyClick = async() => {
        await axios
        .get('/checklogin', { withCredentials: true })
        .then(response => {
            provider_Id.current = response.data[0].providerId;
            axios
            .post(`http://3.39.17.18/diaries/emotions/${provider_Id.current}`, { emotion: '행복' }, { withCredentials: true })
            .then((response) => {setSearchlist(response.data.getDiaryResult);
                setColor1(true); setColor2(false); setColor3(true); setColor4(true); setColor5(true); setColor6(true); setColor7(true);})
            .catch((error) => {console.log(error.response);})
        })
    };

    const sadClick = async() => {
        await axios
        .get('/checklogin', { withCredentials: true })
        .then(response => {
            provider_Id.current = response.data[0].providerId;
            axios
            .post(`http://3.39.17.18/diaries/emotions/${provider_Id.current}`, { emotion: '슬픔' }, { withCredentials: true })
            .then((response) => {setSearchlist(response.data.getDiaryResult);
                setColor1(true); setColor2(true); setColor3(false); setColor4(true); setColor5(true); setColor6(true); setColor7(true);})
            .catch((error) => {console.log(error.response);})
        })
    };

    const fearClick = async() => {
        await axios
        .get('/checklogin', { withCredentials: true })
        .then(response => {
            provider_Id.current = response.data[0].providerId;
            axios
            .post(`http://3.39.17.18/diaries/emotions/${provider_Id.current}`, { emotion: '공포' }, { withCredentials: true })
            .then((response) => {setSearchlist(response.data.getDiaryResult);
                setColor1(true); setColor2(true); setColor3(true); setColor4(false); setColor5(true); setColor6(true); setColor7(true);})
            .catch((error) => {console.log(error.response);})
        })
    };

    const disgustClick = async() => {
        await axios
        .get('/checklogin', { withCredentials: true })
        .then(response => {
            provider_Id.current = response.data[0].providerId;
            axios
            .post(`http://3.39.17.18/diaries/emotions/${provider_Id.current}`, { emotion: '혐오' }, { withCredentials: true })
            .then((response) => {setSearchlist(response.data.getDiaryResult);
                setColor1(true); setColor2(true); setColor3(true); setColor4(true); setColor5(false); setColor6(true); setColor7(true);})
            .catch((error) => {console.log(error.response);})
        })
    };

    const angerClick = async() => {
        await axios
        .get('/checklogin', { withCredentials: true })
        .then(response => {
            provider_Id.current = response.data[0].providerId;
            axios
            .post(`http://3.39.17.18/diaries/emotions/${provider_Id.current}`, { emotion: '분노' }, { withCredentials: true })
            .then((response) => {setSearchlist(response.data.getDiaryResult);
                setColor1(true); setColor2(true); setColor3(true); setColor4(true); setColor5(true); setColor6(false); setColor7(true);})
            .catch((error) => {console.log(error.response);})
        })
    };

    const surpriseClick = async() => {
        await axios
        .get('/checklogin', { withCredentials: true })
        .then(response => {
            provider_Id.current = response.data[0].providerId;
            axios
            .post(`http://3.39.17.18/diaries/emotions/${provider_Id.current}`, { emotion: '놀람' }, { withCredentials: true })
            .then((response) => {setSearchlist(response.data.getDiaryResult);
                setColor1(true); setColor2(true); setColor3(true); setColor4(true); setColor5(true); setColor6(true); setColor7(false);})
            .catch((error) => {console.log(error.response);})
        })
    };


    const goDiary = (id) => {
        navigate(`/read/:${id}`);
    }

    function viewSearchList () {
        const items = searchlist.map((element) =>
            <>
            <div className='diary-card' onClick={()=>goDiary(element.id)}>
                <div className='date-wrapper' key={element.written_date}>{element.written_date}</div> <br />
                <div className='content-wrapper' key={element.content}>{element.content}</div> <br />
            </div>
            </>
        );
        
        return (
            <>
            <div style={{marginTop:"3rem"}}>{items}</div>
            </>
        )
    }

    return (
        <>
        <div className = "StatsDiary">
            <h2>통계 보기</h2>
        </div>
        <div className='chart-wrapper'>
            <Bar type={"bar"} options={options} data={data} />
        </div>
        <div className='folders'>
            <div className={`image ${color1 ? '' : 'neutralSelect'}`} onClick={neutralClick}>
            {/* <div className="image" onClick={neutralClick}> */}
                <img src={neutral_folder} alt='neutral_folder' />   
                <div style={{fontFamily:"S-CoreDream-2Light", fontSize:"1.2rem", fontWeight:"bold", marginTop:"0.3rem"}}>{'중립'}</div>
            </div>
            <div className={`image ${color2 ? '' : 'happySelect'}`} onClick={happyClick}>
                <img src={happy_folder} alt='sad_folder' />
                <div style={{fontFamily:"S-CoreDream-2Light", fontSize:"1.2rem", fontWeight:"bold", marginTop:"0.3rem"}}>{'행복'}</div>
            </div>
            <div className={`image ${color3 ? '' : 'sadSelect'}`} onClick={sadClick}>
                <img src={sad_folder} alt='sad_folder' />   
                <div style={{fontFamily:"S-CoreDream-2Light", fontSize:"1.2rem", fontWeight:"bold", marginTop:"0.3rem"}}>{'슬픔'}</div>
            </div>
            <div className={`image ${color4 ? '' : 'fearSelect'}`} onClick={fearClick}>
                <img src={fear_folder} alt='fear_folder' />   
                <div style={{fontFamily:"S-CoreDream-2Light", fontSize:"1.2rem", fontWeight:"bold", marginTop:"0.3rem"}}>{'공포'}</div>
            </div>
            <div className={`image ${color5 ? '' : 'disgustSelect'}`} onClick={disgustClick}>
                <img src={disgust_folder} alt='disgust_folder' />   
                <div style={{fontFamily:"S-CoreDream-2Light", fontSize:"1.2rem", fontWeight:"bold", marginTop:"0.3rem"}}>{'혐오'}</div>
            </div>
            <div className={`image ${color6 ? '' : 'angerSelect'}`} onClick={angerClick}>
                <img src={anger_folder} alt='anger_folder' />   
                <div style={{fontFamily:"S-CoreDream-2Light", fontSize:"1.2rem", fontWeight:"bold", marginTop:"0.3rem"}}>{'분노'}</div>
            </div>
            <div className={`image ${color7 ? '' : 'surpriseSelect'}`} onClick={surpriseClick}>
                <img src={surprise_folder} alt='surprise_folder' />   
                <div style={{fontFamily:"S-CoreDream-2Light", fontSize:"1.2rem", fontWeight:"bold", marginTop:"0.3rem"}}>{'놀람'}</div>
            </div>
        </div>
        <div className='search-result'>
            {viewSearchList()}
        </div>     
        </>
    )
}

export default StatsDiary;