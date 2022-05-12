import client from './client';
import axios from 'axios';
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

// export const readDiary = diaryId => client.get(`/diaries/details/${diaryId}`);