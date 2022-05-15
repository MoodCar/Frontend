import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/common/Header";
import MyCalendar from "../../components/common/MyCalendar";
import { logout } from "../../modules/user";
import axios from 'axios';
import { useEffect, useState } from 'react';

const HeaderContainer = () => {
    // const { user } = useSelector(({ user }) => ({ user: user.user }));
    // const dispatch = useDispatch();
    // const onLogout = () => {
    //     dispatch(logout());
    // };
    
    const [state, setState] = useState([]);
    useEffect(() => {
        axios
        .get('/checklogin', { withCredentials:true })
        .then(response => {
            setState(response.status);
        });
    }, []);

    // useEffect(() => {
    //     async function getState() {
    //         await axios
    //         .get('/checklogin')
    //         .then(response => {
    //             setState(response.statusText);
    //         });
    //     }
    //     getState();
    // }, []);

    // return <Header user={user} onLogout={onLogout} />;
    return (
        <>
        <Header state={state} />
        {/* <MyCalendar state={state} /> */}
        </>
    )
};

export default HeaderContainer;