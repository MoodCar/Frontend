import client from './client';
import axios from 'axios';
import { useState, useEffect } from 'react';
// export const writeDiary = ({ title, content }) =>
//     client.post('/diaries/:providerId', { title, content });

// export const readDiary = diaryId => client.get(`/diaries/details/${diaryId}`);

export const writeDiary = async({ content, date }) => {
    await axios
    .post("/diaries/:providerId", { content, date }, { withCredentials: true })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error.response);
    });
};

export const GetId = () => {
    const [pid, setPid] = useState([]);

    useEffect(() => {
        axios
        .get('/checklogin')
        .then(response => {
            setPid(response.data);
            // console.log(users);
            // console.log(response.data);
        });
    }, []);

    return (
        <div>
            {pid.map(user => {
                return (
                    <div key={user.providerId}>
                        {user.providerId}
                    </div>
                );
            })}
            {/* <div>{state.state}</div> */}
        </div>
    );
};

export const readDiary = async() => {
    await axios
    .get("/diaries/details/:id", { withCredentials: true })
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

export const removeDiary = async id => await axios.delete(`/diaries/details/${id}`);

// export const readDiary = diaryId => client.get(`/diaries/details/${diaryId}`);