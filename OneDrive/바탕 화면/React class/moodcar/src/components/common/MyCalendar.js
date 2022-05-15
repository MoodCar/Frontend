import React, { useState } from 'react';
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
import { Link } from 'react-router-dom';
import DiaryViewer from '../diary/DiaryViewer';
import e_image from '../../images/write_button.png';
import * as googleAPI from '../../lib/api/auth.js';
import axios from 'axios';
import { useEffect } from 'react';
import Calendar from 'react-calendar';

const CalendarBlock = styled.div`
    width: 100%;
    background: white;
    font-size: 1rem;
    font-weight: 600;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top : 0.5rem;
`;

const MyCalendar = () => {
    // const date = new Date(getDate).format("yyyymmdd");
    // const { user, title, diaryId } = diary;

    const [diarylist, setDiarylist] = useState([]);
    const [diaryemotion, setDiaryemotion] = useState([]);

    const [state, setState] = useState([]);
    useEffect(() => {
        axios
        .get('/checklogin', { withCredentials:true })
        .then(response => {
            setState(response.status);
        });
    }, []);
    
    useEffect(() => {
        axios
        .get('http://3.39.17.18/diaries/116300412661869586758', { withCredentials:true })
        // .get(`http://3.39.17.18/diaries/${pid}`)
        .then((response) => {
            console.log(response.data.fetchResult);
            setDiarylist(response.data.fetchResult);
            console.log(diarylist.map(diary => (diary.emotion)));
            console.log(diarylist.map(diary => (diary.written_date.substr(0, 10))));
            console.log(diarylist[10].emotion);
        })
    }, []);

    const handleDateClick = (arg) => {
        console.log(arg);
        console.log(arg.dateStr);
        // arg.getDate();
        // <Link to={`/@${user.email}/${diaryId}`}>{title}</Link>
    }

    const handleEventClick = (info) => {
        // <Link to="/@:email/diaryId" />
        // window.open(`/read/:${info.event.id}`);
        window.location.href = `http://localhost:3000/read/:${info.event.id}`;
        // window.open('/@:email/:diaryId');
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

    // const handleEventClick = function (info) {
    //     // alert('Event: ' + info.event.title);
    //     if (info.event.url) {
    //         window.open(info.event.url);
    //         // <Link to="/@email/diaryId" />
    //     };
    // }

    function addDiaryList() {
        let diaryarr = [];
        console.log(diarylist.map(diary => (diary.written_date.substr(0, 10))));
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
        console.log(diarylist);
        console.log(diaryarr);
        return diaryarr;
    }

    return (
        <div className="mypage-body">
            <div className="body-warpper box">
                <div className="body-info-container">
                    <div className="calendar-wrapper">
                        <CalendarBlock>
                        {state === 200 ? (
                            <FullCalendar
                            // defaultView="dayGridMonth"
                            initialView="dayGridMonth"
                            plugins={[ dayGridPlugin, interactionPlugin ]}
                            selectable={true}
                            locale="ko"
                            aspectRatio= "1.8"
                            dateClick={handleDateClick}
                            eventContent={renderEmotionContent}
                            eventClick= {handleEventClick}
                            // events={[{ title: 'test', date: '2022-05-01', color: '#ffffff', textColor: '#000000' },
                            //         { title: 'test', date: '2022-05-03', color: '#ffffff', textColor: '#000000' }]}
                            events={addDiaryList()}
                            eventLimit={true}
                            headerToolbar={{
                                left: "prevYear,prev",
                                center: "title",
                                right: "today next,nextYear"
                            }}
                            />
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