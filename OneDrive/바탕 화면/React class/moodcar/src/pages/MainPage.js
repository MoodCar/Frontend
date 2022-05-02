import HeaderContainer from "../components/common/Header";
import React, { useState } from 'react';
import MyCalendar from "../components/common/MyCalendar";
import Split from "react-split";
import SidebarRight from "../components/Sidebar/SidebarRight";
import SidebarLeft from "../components/Sidebar/SidebarLeft";
import WritePage from "./WritePage";

const MainPage = () => {
    return (
        <>
            <HeaderContainer />
            {/* <SidebarLeft width={900}>
                <MyCalendar />
            </SidebarLeft>
            <SidebarRight width={600}>
                <WritePage />
            </SidebarRight> */}
            <MyCalendar />
        </>
    );
};

export default MainPage;