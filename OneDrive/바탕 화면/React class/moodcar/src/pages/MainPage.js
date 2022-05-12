import HeaderContainer from "../containers/common/HeaderContainer";
import Header from "../components/common/Header";
import React, { useState } from 'react';
import MyCalendar from "../components/common/MyCalendar";
import Split from "react-split";
import SidebarRight from "../components/Sidebar/SidebarRight";
import SidebarLeft from "../components/Sidebar/SidebarLeft";
import WritePage from "./WritePage";
import axios from 'axios';

const MainPage = () => {

    // const user  = axios.get("http://3.39.17.18/checklogin").then((response) => {
    //     console.log(response);
    // })
    return (
        <>
            
            <HeaderContainer />
            <MyCalendar />
            {/* <SidebarLeft width={900}>
                <MyCalendar />
            </SidebarLeft>
            <SidebarRight width={600}>
                <WritePage />
            </SidebarRight> */}
        </>
    );
};

export default MainPage;