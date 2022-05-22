import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import './MyCalendar.css';
import neutral from '../../images/neutral.png';
import happy from '../../images/happy.png';
import sad from '../../images/sad.png';
import fear from '../../images/fear.png';
import disgust from '../../images/disgust.png';
import anger from '../../images/anger.png';
import surprise from '../../images/surprise.png';
import axios from 'axios';
import AskModal from './AskModal';
import { Link } from 'react-router-dom';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const CalendarBlock = styled.div`
    width: 100%;
    background: white;
    font-size: 1rem;
    font-weight: 600;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top : 0.5rem;
    z-index: 1000;
`;

const MyCalendar = (props) => {

    const [diarylist, setDiarylist] = useState([]);
    const [pid, setPid] = useState('');
    const [state, setState] = useState('');
    const provider_Id = useRef(null);

    useEffect(() => {
        axios
        .get('/checklogin', { withCredentials: true })
        .then(response => {
            setState(response.status);
            setPid(response.data[0].providerId);
            provider_Id.current = response.data[0].providerId;

            axios
            .get(`http://3.39.17.18/diaries/${provider_Id.current}`, { withCredentials: true })
            .then((response) => {
                console.log(response.data.fetchResult);
                setDiarylist(response.data.fetchResult);
                console.log(diarylist.map(diary => (diary.emotion)));
                console.log(diarylist.map(diary => (diary.written_date.substr(0, 10))));
            })
            .catch((error) => {
                console.log(error.response);
            })
            })
    }, [])

    const handleDateClick = (arg) => {
        console.log(arg);
        console.log(arg.dateStr);
    }

    const handleEventClick = (info) => {
        window.location.href = `http://localhost:3000/read/:${info.event.id}`;
    }

    function renderEmotionContent(info) {
        if (info.event.title === '중립') {
            return (
                <>
                <img src={neutral} />
                중립
                </>
            )
        }
        else if (info.event.title === '행복') {
            return (
                <>
                <img src={happy} />
                행복
                </>
            )
        }
        else if (info.event.title === '슬픔') {
            return (
                <>
                <img src={sad} />
                슬픔
                </>
            )
        }
        else if (info.event.title === '공포') {
            return (
                <>
                <img src={fear} />
                공포
                </>
            )
        }
        else if (info.event.title === '혐오') {
            return (
                <>
                <img src={disgust} />
                혐오
                </>
            )
        }
        else if (info.event.title === '분노') {
            return (
                <>
                <img src={anger} />
                분노
                </>
            )
        }
        else if (info.event.title === '놀람') {
            return (
                <>
                <img src={surprise} />
                놀람
                </>
            )
        }
    }

    function addDiaryList() {
        let diaryarr = [];
        if(diarylist) {
        for (var i=0; i<diarylist.length; i++) {
            diaryarr.push({
                id: diarylist[i].id,
                title: diarylist[i].emotion,
                date: diarylist[i].written_date.substr(0, 10),
                content: diarylist[i].content,
                color: '#ff000000',
                textColor: '#000000'
            })
        } }
        return diaryarr;
    }

    const [modal, setModal] = useState(false);
    const onModalButtonClick = () => {
        setModal(true);
    }
    const onCancel = () => {
        setModal(false);
    }

    const data = {
        labels: ['중립', '행복', '슬픔', '공포', '혐오', '분노', '놀람'],
        datasets: [
          {
            data: [12, 19, 3, 5, 2, 3],
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

    return (
        <div className="mypage-body">
            <button onClick={onModalButtonClick}>팝업</button>
            <AskModal
                visible={modal}
                title="한달 통계"
                description={<Pie data={data} />}
                onCancel={onCancel}
            />
            <div className="body-warpper box">
                <div className="body-info-container">
                    <div className="calendar-wrapper">
                        <CalendarBlock>
                        {state === 200 ? (
                            <>
                            <FullCalendar
                            initialView="dayGridMonth"
                            plugins={[ dayGridPlugin, interactionPlugin ]}
                            selectable={true}
                            locale="ko"
                            aspectRatio= "1.8"
                            dateClick={handleDateClick}
                            eventContent={renderEmotionContent}
                            eventClick= {handleEventClick}
                            events={addDiaryList()}
                            headerToolbar={{
                                left: "prevYear,prev",
                                center: "title",
                                right: "today next,nextYear"
                            }}
                            />
                            </>
                        ) : (
                             null
                        )}
                        </CalendarBlock>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCalendar;