import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/common/Header";
import MyCalendar from "../../components/common/MyCalendar";
import axios from 'axios';
import { useEffect, useState } from 'react';

const HeaderContainer = () => {
    
    const [state, setState] = useState([]);
    const [pid, setPid] = useState('');
    useEffect(() => {
        axios
        .get('/checklogin', { withCredentials:true })
        .then(response => {
            setState(response.status);
            console.log(state);
        });
    }, []);

    return (
        <>
        <Header state={state} />
        {/* <MyCalendar state={state} /> */}
        </>
    )
};

export default HeaderContainer;