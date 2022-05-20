import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './PostDiary.css';
import ReactHtmlParser from 'html-react-parser';
import axios from 'axios';
import * as diaryAPI from '../../lib/api/diary';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import loading_image from '../../images/loading.gif';

const PostDiary = () => {

    const [diaryContent, setDiaryContent] = useState({
        content: ''
    })
    const navigate = useNavigate();
    const location = useLocation();
    const [diarylist, setDiarylist] = useState([]);
    const [loading, setLoading] = useState(true);
    const provider_Id = useRef(null);

    useEffect(() => {
        axios
        .get('/checklogin', { withCredentials: true })
        .then(response => {
            provider_Id.current = response.data[0].providerId;

            axios
            .get(`http://3.39.17.18/diaries/${provider_Id.current}`, { withCredentials: true })
            .then((response) => {
                setDiarylist(response.data.fetchResult);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.response);
                alert('등록 완료');
            })
        })
    }, [])
/*
    useEffect(() => {
        axios
        .get('http://3.39.17.18/diaries/116300412661869586758', { withCredentials:true })
        .then((response) => {
            setDiarylist(response.data.fetchResult);
            setLoading(false);
        })
    }, []);*/

    useEffect(() => {
    }, [location])

    let path = location.pathname;
    let diaryid = path.substring(7);

    function theDiaryContent() {
        let info = diarylist.map(diary => (diary.id));
        for (var j=0; j<diarylist.length; j++) {
            if(path === '/write/:' + info[j]) {
                return ReactHtmlParser(diarylist[j].content);
            };
        };
    }
/*
    const submitContent = async() => {
        setLoading(true);
        await axios
        .post('http://3.39.17.18/diaries/116300412661869586758', {
        // .post(`http://3.39.17.18/diaries/${pid}`, {
            content: diaryContent.content
        // }, {params: {providerId: '116300412661869586758'}}, {withCredentials: true})
        }, {withCredentials: true})
        .then((response) => {
            console.log(response);
            alert('등록 완료');
            setLoading(false);
            console.log(diaryContent.content);
            navigate('/');
        })
        .catch((error) => {
            console.log(error.response);
        });
    };*/

    const submitContent = async() => {
        setLoading(true);
        await axios
        .get('/checklogin', { withCredentials: true })
        .then(response => {
            provider_Id.current = response.data[0].providerId;

            axios
            .post(`http://3.39.17.18/diaries/${provider_Id.current}`, { content: diaryContent.content }, { withCredentials: true })
            .then((response) => {
                console.log(response);
                alert('등록 완료');
                setLoading(false);
                console.log(diaryContent.content);
                navigate('/');
            })
            .catch((error) => {
                console.log(error.response);
            })
        })
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
            {loading ? <img src={loading_image} /> : null }
            {/* {loading ? <img src={loading_image} /> : */}
            <>
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
                <div className='buttons'>
                <Button className="submit-button" onClick={submitContent}>일기 등록</Button>
                <Button className="cancel-button" onClick={cancel}>취소</Button>
                </div>
            </>
            {/* } */}
            {/* <div className='diary-container'>
                {viewContent.map(element =>
                    <div key={element.event}>
                        {ReactHtmlParser(element.content)}
                    </div>
                )}
            </div> */}
            
            {/* <button
                className="submit-button"
                // onClick={() => {
                //     setViewContent(viewContent.concat({...diaryContent}));
                // }}
                onClick={submitContent}
            >일기 등록
            </button> */}
        </div>
    );
};

export default PostDiary;