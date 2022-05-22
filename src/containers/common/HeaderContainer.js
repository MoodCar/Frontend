import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/common/Header";
import MyCalendar from "../../components/common/MyCalendar";
import axios from 'axios';
import { useEffect, useState } from 'react';

const HeaderContainer = () => {

    return (
        <>
        <Header />
        {/* <MyCalendar state={state} /> */}
        </>
    )
};

export default HeaderContainer;