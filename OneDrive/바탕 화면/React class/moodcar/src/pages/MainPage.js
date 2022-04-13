import HeaderContainer from "../components/common/Header";
import React, { useState } from 'react';
import MyCalendar from "../components/common/MyCalendar";

const MainPage = () => {
    return (
        <>
            <HeaderContainer />
            <MyCalendar />
        </>
    );
};

export default MainPage;