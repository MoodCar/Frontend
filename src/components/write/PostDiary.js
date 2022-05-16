import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './PostDiary.css';
import ReactHtmlParser from 'html-react-parser';
import axios from 'axios';
import * as diaryAPI from '../../lib/api/diary';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import Button from '../common/Button';

const PostDiary = () => {

    const [diaryContent, setDiaryContent] = useState({
        content: ''
    })
    const navigate = useNavigate();
    const location = useLocation();
    const [diarylist, setDiarylist] = useState([]);

    useEffect(() => {
        axios
        .get('http://3.39.17.18/diaries/116300412661869586758', { withCredentials:true })
        .then((response) => {
            setDiarylist(response.data.fetchResult);
        })
    }, []);

    useEffect(() => {
    }, [location])

    let path = location.pathname;
    console.log(path);
    let diaryid = path.substring(7);

    function theDiaryContent() {
        let info = diarylist.map(diary => (diary.id));
        for (var j=0; j<diarylist.length; j++) {
            if(path === '/write/:' + info[j]) {
                return ReactHtmlParser(diarylist[j].content);
            };
        };
    }



    const submitContent = async() => {
        let ncontent = '';
        ncontent = ReactHtmlParser(diaryContent.content);
        await axios
        .post('http://3.39.17.18/diaries/116300412661869586758', {
        // .post(`http://3.39.17.18/diaries/${pid}`, {
            content: diaryContent.content
        // }, {params: {providerId: '116300412661869586758'}}, {withCredentials: true})
        }, {withCredentials: true})
        .then((response) => {
            console.log(response);
            alert('등록 완료');
            console.log(diaryContent.content);
            navigate('/');
        })
        .catch((error) => {
            console.log(error.response);
        });
    };

    const cancel = () => {
        navigate(-1);
    }

    const getContentValue = e => {
        const { name, value } = e.target;
        setDiaryContent({
            ...diaryContent,
            [name]: value
        })
        console.log(diaryContent);
        return diaryContent;
    }

    return (
        <div className="PostDiary">
            <h2>일기 작성</h2>
            {/* <div className='diary-container'>
                {viewContent.map(element =>
                    <div key={element.event}>
                        {ReactHtmlParser(element.content)}
                    </div>
                )}
            </div> */}
            <div className='form-wrapper'>
                <CKEditor
                    editor={ClassicEditor}
                    // data=""
                    data={theDiaryContent()}
                    onReady={editor => {
                        console.log('Editor is ready to use', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        // data.replace("<p>", "").replace("</p>", "");
                        console.log({ event, editor, data });
                        setDiaryContent({
                            ...diaryContent,
                            content: data.replace("<p>", "").replace("</p>", "")
                        })
                        console.log(diaryContent);
                    }}
                    onBlur = {(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
            </div>
            {/* <button
                className="submit-button"
                // onClick={() => {
                //     setViewContent(viewContent.concat({...diaryContent}));
                // }}
                onClick={submitContent}
            >일기 등록
            </button> */}
            <div className='buttons'>
                <Button className="submit-button" onClick={submitContent}>일기 등록</Button>
                <Button className="cancel-button" onClick={cancel}>취소</Button>
            </div>
        </div>
    );
};

export default PostDiary;