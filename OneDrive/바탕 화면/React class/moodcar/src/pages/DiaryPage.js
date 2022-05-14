import HeaderContainer from "../containers/common/HeaderContainer";
import DiaryViewerContainer from '../containers/diary/DiaryViewerContainer';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReadDiary from '../components/diary/ReadDiary';

const DiaryPage = () => {
    
    // const params = useParams();

    // useEffect(() => {
    //     const providerId = params.id;
    //     axios
    //     // .get(`http://3.39.17.18/diaries/${providerId}`)
    //     .get('http://3.39.17.18/diaries/116300412661869586758')
    //     .then((response) => {
    //         console.log(response.data);
    //     })
    //     .catch((error) => {
    //         console.log(error.response.data);
    //     });
    // })


    return (
        <>
            <HeaderContainer />
            {/* <DiaryViewerContainer /> */}
            <ReadDiary />
        </>
    );
    // })

};

export default DiaryPage;