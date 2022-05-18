import client from './client';
import axios from 'axios';
import { useState, useEffect } from 'react';
// export const writeDiary = ({ title, content }) =>
//     client.post('/diaries/:providerId', { title, content });

// export const readDiary = diaryId => client.get(`/diaries/details/${diaryId}`);

export const writeDiary = async({ content, date }) => {
    await axios
    .post("http://3.39.17.18/diaries/:providerId", { content, date }, { withCredentials: true })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error.response);
    });
};

export const readDiary = async() => {
    await axios
    .get("http://3.39.17.18/diaries/details/:id", { withCredentials: true })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error.response);
    });
};

export const diaryList = async() => {
    await axios
    .get("http://3.39.17.18/diaries/116300412661869586758", { withCredentials: true})
    .then((response) => {
        console.log(response);
    })
    .catch((error => {
        console.log(error.response);
    }))
};

export const GetId = async() => {
    // const [pid, setPid] = useState([]);
    let userId;
    // useEffect(() => {
    //     axios
    //     .get('/checklogin', { withCredentials:true })
    //     .then(response => {
    //         setPid(response.data[0].providerId);
    //         console.log(pid);
    //     });
    // }, []);
    await axios
    .get('/checklogin', { withCredentials: true })
    .then((response) => {
        // setPid(response.data[0].providerId);
        userId = response.data[0].providerId
        console.log(userId);
    })
    .catch((error) => {
        console.log(error.response);
    })
    return (
        userId
    )
};

export const removeDiary = async id => await axios.delete(`/diaries/details/${id}`);

// export const readDiary = diaryId => client.get(`/diaries/details/${diaryId}`);