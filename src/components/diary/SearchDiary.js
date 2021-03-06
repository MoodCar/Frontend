import './SearchDiary.css';
import Button from '../common/Button';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import neutral from '../../images/neutral.png';
import happy from '../../images/happy.png';
import sad from '../../images/sad.png';
import fear from '../../images/fear.png';
import disgust from '../../images/disgust.png';
import anger from '../../images/anger.png';
import surprise from '../../images/surprise.png';

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

    const emotionRender = (emo) => {
        if (emo === '??????') {
            return (
                <>
                <img src={neutral} alt='neutral'/>
                <div>??????</div>
                </>
            )
        }
        else if (emo === '??????') {
            return (
                <>
                <img src={happy} alt='happy'/>
                <div>??????</div>
                </>
            )
        }
        else if (emo === '??????') {
            return (
                <>
                <img src={sad} alt='sad'/>
                <div>??????</div>
                </>
            )
        }
        else if (emo === '??????') {
            return (
                <>
                <img src={fear} alt='fear'/>
                <div>??????</div>
                </>
            )
        }
        else if (emo === '??????') {
            return (
                <>
                <img src={surprise} alt='surprise'/>
                <div>??????</div>
                </>
            )
        }
        else if (emo === '??????') {
            return (
                <>
                <img src={disgust} alt='disgust'/>
                <div>??????</div>
                </>
            )
        }
        else if (emo === '??????') {
            return (
                <>
                <img src={anger} alt='anger'/>
                <div>??????</div>
                </>
            )
        }
    }

    function viewSearchList () {
        const items = searchlist.map((element) =>
            <>
            {/* <div className='date' key={element.written_date} onClick={()=>goDiary(element.id)}>{element.written_date}</div> */}
            {/* <div className='diary-card' key={element.id} onClick={()=>goDiary(element.id)}>{element.written_date}</div> */}
            <div className='diary-card' onClick={()=>goDiary(element.id)}>
                <div className='date-wrapper' key={element.written_date}>{element.written_date}</div> <br />
                <div style={{width:"92%"}} className='content-wrapper' key={element.content}>{element.content}</div> <br />
                <div className='emotion-wrapper' key={element.emotion}>{emotionRender(element.emotion)}</div>
            </div>
            </>
        );

        const items_date = searchlist.map((element) => (element.written_date));
        const items_content = searchlist.map((element) => (element.content));
        
        return (
            <>
            <div>{items}</div>
            </>
        )
    }

    return (
        <>
        <div className = "SearchDiary">
            <h2>?????? ??????</h2>
        </div>
        <div className="input-group">
            <input 
                type="search"
                className='search-input'
                placeholder="?????? ????????? ???????????????"
                onChange={handleinputChange}
            />
            <Button className = "searchbutton" id="search-button" onClick={onClick}>??????</Button>
        </div>
        <div className='search-result'>
            {viewSearchList()}
        </div>
        </>
    );
};

export default SearchDiary;