import './ReadDiary.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import DiaryActionButtons from '../../components/diary/DiaryActionButtons';
import DiaryViewerContainer from '../../containers/diary/DiaryViewerContainer';
import AskRemoveModal from './AskRemoveModal';

const ReadDiary = () => {

    const [diarylist, setDiarylist] = useState([]);
    const location = useLocation();

    useEffect(() => {
        axios
        .get('http://3.39.17.18/diaries/116300412661869586758')
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

    function theDiaryContent() {
        addDiaryList();
        let info = diarylist.map(diary => (diary.id));
        for (var j=0; j<diarylist.length; j++) {
            if(path === '/read/:' + info[j]) {
                return diarylist[j].content;
            };
        };
    }

    function theDiaryDate() {
        addDiaryList();
        let info = diarylist.map(diary => (diary.id));
        for (var j=0; j<diarylist.length; j++) {
            if(path === '/read/:' + info[j]) {
                // console.log('/read/:' + info[j]);
                return diarylist[j].written_date.substr(0, 10);
            };
        };
    }

    return (
        <>
        <div className = "ReadDiary">
            <h2>일기 세부 내용</h2>
        </div>
        <div className = "removebutton">
            {/* <DiaryActionButtons /> */}
            <DiaryViewerContainer />
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
                </>
            </div>
        </>
    );
};

export default ReadDiary;