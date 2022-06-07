import HeaderContainer from "../containers/common/HeaderContainer";
import Header from "../components/common/Header";
import React, { useState, useEffect } from 'react';
import MyCalendar from '../components/common/MyCalendar';
import Split from "react-split";
import WritePage from "./WritePage";
import axios from 'axios';

const MainPage = () => {
    const [pid, setPid] = useState("");
    
    async function GetId () {
        const data = await axios.get("/checklogin");
        setPid(data.data[0].providerId);
    };
    GetId();
    console.log(pid);

    return (
        <>
            <HeaderContainer />
            <MyCalendar pid ={pid}/>
        </>
    );
};

export default MainPage;