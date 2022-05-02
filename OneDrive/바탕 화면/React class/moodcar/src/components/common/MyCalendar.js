import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { Link } from 'react-router-dom';
import DiaryViewer from '../diary/DiaryViewer';
import e_image from '../../images/write_button.png';

const CalendarBlock = styled.div`
    width: 100%;
    background: white;
    font-size: 1rem;
    font-weight: 600;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top : 0.5rem;
`;

const MyCalendar = (props) => {
    // const date = new Date(getDate).format("yyyymmdd");
    // const { user, title, diaryId } = diary;
    const handleDateClick = (arg) => {
        console.log(arg);
        console.log(arg.dateStr);
        // arg.getDate();
        // <Link to={`/@${user.email}/${diaryId}`}>{title}</Link>
    }

    const handleEventClick = (info) => {
        // <Link to="/@:email/diaryId" />
        window.open('/@:email/diaryId');
    }

    // 감정api 해당 일기의 감정정보를 받아온다
    // 받아와서 이미지로 나타내던가

    function renderEmotionContent(info) {
        return (
            <div>
                <img className="emotionImage" src= {e_image}/>
            </div>
        )
    }

    // const handleEventClick = function (info) {
    //     // alert('Event: ' + info.event.title);
    //     if (info.event.url) {
    //         window.open(info.event.url);
    //         // <Link to="/@email/diaryId" />
    //     };
    // }

    return (
        <div className="mypage-body">
            <div className="body-warpper box">
                <div className="body-info-container">
                    <div className="calendar-wrapper">
                        <CalendarBlock>
                            <FullCalendar
                                // defaultView="dayGridMonth"
                                initialView="dayGridMonth"
                                plugins={[ dayGridPlugin, interactionPlugin ]}
                                selectable={true}
                                dateClick={handleDateClick}
                                eventContent={renderEmotionContent}
                                eventClick= {handleEventClick}
                                // 근데 사용자 로그인 된 상태로 상세페이지가 로드 되는지
                                events={[{ title: 'test', date: '2022-04-12', color: '#ffffff' }]}
                                />
                        </CalendarBlock>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCalendar;