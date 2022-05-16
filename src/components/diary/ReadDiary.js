import './ReadDiary.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import DiaryActionButtons from '../../components/diary/DiaryActionButtons';
import DiaryViewerContainer from '../../containers/diary/DiaryViewerContainer';
import AskRemoveModal from './AskRemoveModal';
import ReactHtmlParser from 'html-react-parser';

const ReadDiary = () => {

    const [diarylist, setDiarylist] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get('http://3.39.17.18/diaries/116300412661869586758', { withCredentials:true })
        .then((response) => {
            setDiarylist(response.data.fetchResult);
        })
    }, []);

    function addDiaryList() {
        let diaryarr = [];
        for (var i=0; i<diarylist.length; i++) {
            diaryarr.push({
                id: diarylist[i].id,
                title: diarylist[i].emotion,
                date: diarylist[i].written_date.substr(0, 10),
                content: diarylist[i].content,
                color: '#ff000000',
                textColor: '#000000'
            })
        }
        return diaryarr;
    }

    useEffect(() => {
    }, [location])

    let path = location.pathname;
    let diaryid = path.substring(7);

    function theDiaryContent() {
        addDiaryList();
        let info = diarylist.map(diary => (diary.id));
        for (var j=0; j<diarylist.length; j++) {
            if(path === '/read/:' + info[j]) {
                return ReactHtmlParser(diarylist[j].content);
            };
        };
    }

    let info = diarylist.map(diary => (diary.id));
    function theDiaryDate() {
        addDiaryList();
        for (var j=0; j<diarylist.length; j++) {
            if(path === '/read/:' + info[j]) {
                // console.log('/read/:' + info[j]);
                return diarylist[j].written_date.substr(0, 10);
            };
        };
    }

    function theDiaryEmotion() {
        addDiaryList();
        for (var j=0; j<diarylist.length; j++) {
            if(path === '/read/:' + info[j]) {
                return diarylist[j].emotion;
            };
        };
    }

    function theDiaryHashtag() {
        addDiaryList();
        let hashtag1 = '';
        let hashtag2 = '';
        let hashtag3 = '';
        for (var j=0; j<diarylist.length; j++) {
            if(path === '/read/:' + info[j]) {
                hashtag1=diarylist[j].hashtag_1;
                hashtag2=diarylist[j].hashtag_2;
                hashtag3=diarylist[j].hashtag_3;
            };
        };
        return (
            hashtag1 + ', ' + hashtag2 + ', ' + hashtag3
        )
    }

    const onEdit = () => {
        navigate('/write');
    };

    const onRemove = async() => {
        // try {
        //     await removeDiary(diaryId);
        //     navigate('/');
        // } catch (e) {
        //     console.log(e);
        // }
        await axios
        .delete(`http://3.39.17.18/diaries/details/${diaryid}`, { withCredentials: true })
        .then((response) => {
            console.log(response);
            // window.close();
            navigate('/');
        })
        .catch((error) => {
            console.log(error.response);
        })
    };

    return (
        <>
        <div className = "ReadDiary">
            <h2>일기 세부 내용</h2>
        </div>
        <div className = "removebutton">
            {/* <DiaryActionButtons /> */}
            {/* <DiaryViewerContainer /> */}
            <button onClick={onEdit}>수정</button>
            <button onClick={onRemove}>삭제</button>
            <button onClick={() => navigate('/')}>홈</button>
        </div>
            <div className='diary-container'>
                {/* {diarylist.map(element =>
                    <>
                        <div>
                            {element.written_date.substr(0, 10)}
                        </div>
                        <div>
                            {element.content}
                        </div>
                    </>
                )} */}
                <>
                    <div>
                        {'날짜 : ' + theDiaryDate()}
                    </div>
                    <br />
                    <div>
                        {'일기 내용 : '}
                        <br />
                        {theDiaryContent()}
                    </div>
                    <br />
                    <div>
                        {'감정 : ' + theDiaryEmotion()}
                    </div>
                    <br />
                    <div>
                        {'키워드 : ' + theDiaryHashtag()}
                    </div>
                </>
            </div>
        </>
    );
};

export default ReadDiary;