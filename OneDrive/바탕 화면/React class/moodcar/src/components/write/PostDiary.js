import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './PostDiary.css';
import ReactHtmlParser from 'html-react-parser';
import axios from 'axios';
import * as diaryAPI from '../../lib/api/diary';
import { useNavigate } from 'react-router';
import Button from '../common/Button';

const PostDiary = () => {
    const [diaryContent, setDiaryContent] = useState({
        content: ''
    })

    const [viewContent, setViewContent] = useState([]);
    const [pid, setPid] = useState([]);
    const navigate = useNavigate();


    const GetId = () => {
    
        useEffect(() => {
            axios
            .get('/checklogin')
            .then(response => {
                setPid(response.data);
                // console.log(users);
                // console.log(response.data);
            });
        }, []);
    
        return (
            <div>
                {pid.map(user => {
                    return (
                        <div key={user.providerId}>
                            {user.providerId}
                        </div>
                    );
                })}
                {/* <div>{state.state}</div> */}
            </div>
        );
    };

    GetId();
    
    const submitContent = async() => {
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
        navigate('/');
    }

    const getContentValue = e => {
        const { name, value } = e.target;
        setDiaryContent({
            ...diaryContent,
            [name]: value
        })
        console.log(diaryContent);
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
                    data=""
                    onReady={editor => {
                        console.log('Editor is ready to use', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                        setDiaryContent({
                            ...diaryContent,
                            content: data
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