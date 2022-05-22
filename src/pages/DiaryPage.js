import HeaderContainer from "../containers/common/HeaderContainer";
import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReadDiary from '../components/diary/ReadDiary';

const DiaryPage = () => {

    return (
        <>
            <HeaderContainer />
            <ReadDiary />
        </>
    );

};

export default DiaryPage;