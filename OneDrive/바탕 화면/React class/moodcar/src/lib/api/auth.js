import client from "./client";
import axios from 'axios';
import { useEffect, useState, useLocation } from 'react';
import UserName from "../../components/auth/UserName";
import { useNavigate } from 'react-router';

// // 로그인
// export const login = ({ email, password }) =>
//    client.post('/signin', { email, password });
// //     client.post('/auth/login', { email, password });

// 회원가입
export const register = ({ email, password }) =>
    client.post('/signup', { email, password });
//     client.post('/api/auth/register', { email, password });

// // 로그인 상태 확인
// export const check = () => client.get('/checklogin');

// // 로그아웃
// export const logout = () => client.post('/logout');

export const login = async() => {
    window.location.href = 'http://localhost:5000/auth/google';
}

export const check = async() => {
    await axios
    .get("/checklogin", { withCredentials:true })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error.response);
    });
};

export const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
        .get('/checklogin', { withCredentials:true })
        .then(response => {
            setUsers(response.data);
            // console.log(users);
            // console.log(response.data);
        });
    }, []);

    return (
        <>
            <UserName users={users} />
        </>
    );
};

export const Getstate = () => {
    const [state, setState] = useState([]);
    useEffect(() => {
        async function getState() {
            await axios
            .get('/checklogin', { withCredentials:true })
            .then(response => {
                setState(response.statusText);
            })
        }
        getState();
    }, []);
};

export const logout = async() => {
    await axios
    .get("/logout", { withCredentials:true })
    .then((response) => console.log(response))
    .catch((error) => console.log(error.response));
};

// export const Getuserinfo = () => {
//     axios
//     .get('/users/@:providerId', { withCredentials:true })
//     .then((response) => console.log(response))
//     .catch((error) => console.log(error.response));
// };

// export const userinfo = async() => {
//     await axios
//     .get("/users/@:providerId", { withCredentials:true })
//     .then((response) => console.log(response))
//     .catch((error) => console.log(error.response));
// };