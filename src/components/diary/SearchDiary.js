import './SearchDiary.css';
import Button from '../common/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';

const SearchDiary = () => {
    
    const [diarylist, setDiarylist] = useState([]);
    const [searchValue, SetsearchValue] = useState("");

    useEffect(() => {
        axios
        .get('http://3.39.17.18/diaries/116300412661869586758', { withCredentials:true })
        .then((response) => {
            setDiarylist(response.data.fetchResult);
            console.log(diarylist);
        })
        .catch((error) => {
            console.log(error.response);
        })
    }, []);

    const handleinputChange = (e) => {
        SetsearchValue(e.target.value);
        console.log(searchValue);
    }

    const onClick = async() => {
        await axios
        .get('http://3.39.17.18/diaries/searchresults/116300412661869586758', {params: {content: searchValue}}, { withCredentials: true })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error.response);
        })
    };

    return (
        <>
        <div className = "SearchDiary">
            <h2>일기 검색</h2>
        </div>
        <div className="input-group">
            <input 
                type="search"
                className='search-input'
                placeholder="검색 내용을 입력하세요"
                onChange={handleinputChange}
            />
            <Button className = "searchbutton" id="search-button" onClick={onClick}>검색</Button>
        </div>
        <div className="diary-card">

        </div>
        </>
    );
};

export default SearchDiary;