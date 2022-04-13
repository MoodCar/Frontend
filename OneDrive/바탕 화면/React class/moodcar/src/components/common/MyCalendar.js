import styled, { css } from 'styled-components';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';

const CalendarBlock = styled.div`
    width: 100%;
    background: white;
    font-size: 1rem;
    font-weight: 600;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top : 0.5rem;
`;

const MyCalendar = props => {
    return (
        <div className="mypage-body">
            <div className="body-warpper box">
                <div className="body-info-container">
                    <div className="calendar-wrapper">
                        <CalendarBlock>
                            <FullCalendar
                                defaultView="dayGridMonth"
                                plugins={[ dayGridPlugin ]}
                                
                                />
                        </CalendarBlock>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCalendar;