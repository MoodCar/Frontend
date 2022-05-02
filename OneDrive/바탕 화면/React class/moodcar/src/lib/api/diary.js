import client from './client';

export const writeDiary = ({ title, content }) =>
    client.post('/diaries/:providerId', { title, content });

export const readDiary = diaryId => client.get(`/diaries/details/${diaryId}`);

// export const readDiary = diaryId => client.get(`/diaries/details/${diaryId}`);