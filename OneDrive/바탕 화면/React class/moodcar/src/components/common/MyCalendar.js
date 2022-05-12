import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { Link } from 'react-router-dom';
import DiaryViewer from '../diary/DiaryViewer';
import e_image from '../../images/write_button.png';
import * as diaryAPI from '../../lib/api/diary.js';

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

    function renderEmotionContent(info) {
        return (
            <>
                <div>
                    <img className="emotionImage" src= {e_image}/>
                </div>

            </>
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
                                locale="ko"
                                dateClick={handleDateClick}
                                eventContent={renderEmotionContent}
                                eventClick= {handleEventClick}
                                
                                events={[{ title: 'test', date: '2022-05-01', color: '#ffffff' },
                                        { title: 'test', date: '2022-05-03', color: '#ffffff' }]}
                                headerToolbar={{
                                    left: "prevYear,prev",
                                    center: "title",
                                    right: "today next,nextYear"
                                }}
                            />
                        </CalendarBlock>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCalendar;