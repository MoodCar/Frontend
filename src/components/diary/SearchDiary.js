import './SearchDiary.css';
import Button from '../common/Button';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';

const SearchDiary = () => {
    
    const [diarylist, setDiarylist] = useState([]);
    const [searchValue, SetsearchValue] = useState("");
    const provider_Id = useRef(null);
    const [searchlist, setSearchlist] = useState([]);
    const navigate = useNavigate();
    let list = [];

    useEffect(() => {
        axios
        .get('/checklogin', { withCredentials: true })
        .then(response => {
            provider_Id.current = response.data[0].providerId;

            axios
            .get(`http://3.39.17.18/diaries/${provider_Id.current}`, { withCredentials: true })
            .then((response) => {
                setDiarylist(response.data.fetchResult);
            })
            .catch((error) => {
                console.log(error.response);
            })
        })
    }, [])

    const handleinputChange = (e) => {
        SetsearchValue(e.target.value);
        // console.log(searchValue);
    }

    const onClick = async() => {

        await axios
        .get('/checklogin', { withCredentials: true })
        .then(response => {
            provider_Id.current = response.data[0].providerId;
            axios
            .post(`http://3.39.17.18/diaries/searchresults/${provider_Id.current}`, { content: searchValue }, { withCredentials: true })
            .then((response) => {
                setSearchlist(response.data.searchResult);
            })
            .catch((error) => {
                console.log(error.response);
            })
        })
    };

    const goDiary = (id) => {
        navigate(`/read/:${id}`);
        // window.location.href = `http://localhost:3000/read/:${diaryid[j]}`;
    }

    function viewSearchList () {
        const items = searchlist.map((element) =>
            <>
            <div className='date' key={element.written_date} onClick={()=>goDiary(element.id)}>{element.written_date}</div>
            <div className='diary-card' key={element.id} onClick={()=>goDiary(element.id)}>{element.content}</div>
            </>
        );

        const items_date = searchlist.map((element) => (element.written_date));
        const items_content = searchlist.map((element) => (element.content));
        
        return (
            <div>{items}</div>
        )
    }

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
        <div className='search-result'>
            {viewSearchList()}
        </div>
        </>
    );
};

export default SearchDiary;