import HeaderContainer from "../containers/common/HeaderContainer";
import Header from "../components/common/Header";
import React, { useState, useEffect } from 'react';
import MyCalendar from '../components/common/MyCalendar';
import Split from "react-split";
import SidebarRight from "../components/Sidebar/SidebarRight";
import SidebarLeft from "../components/Sidebar/SidebarLeft";
import WritePage from "./WritePage";
import axios from 'axios';

const MainPage = () => {
    const [pid, setPid] = useState("");

    // const user  = axios.get("http://3.39.17.18/checklogin").then((response) => {
    //     console.log(response);
    // })

    async function GetId () {
        const data = await axios.get("/checklogin");
        setPid(data.data[0].providerId);
        console.log(pid);
    };
    GetId();
    console.log(pid);

    // useEffect(() => {
    //     axios
    //     .get('/checklogin', { withCredentials:true })
    //     .then(response => {
    //         setPid(response.data[0].providerId);
    //         console.log(response.data[0].providerId);
    //         console.log(pid);
    //     });
    // }, []);

    return (
        <>
            <HeaderContainer />
            <MyCalendar pid ={pid}/>
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