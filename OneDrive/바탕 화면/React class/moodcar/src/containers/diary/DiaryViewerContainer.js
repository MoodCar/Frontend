import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { withRouter } from "react-router-dom";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { readDiary, unloadDiary } from "../../modules/diary";
import DiaryViewer from "../../components/diary/DiaryViewer";
import DiaryActionButtons from '../../components/diary/DiaryActionButtons';
import ReadDiary from "../../components/diary/ReadDiary";
import axios from 'axios';
import { removeDiary } from "../../lib/api/diary";

const DiaryViewerContainer = () => {
    // 처음 마운트될 때 일기 읽기 API 요청
    const { diaryId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { diary, error, loading } = useSelector(({ diary, loading }) => ({
        diary: diary.diary,
        error: diary.error,
        loading: loading['diary/READ_DIARY'],
    }));

    useEffect(() => {
        dispatch(readDiary(diaryId));
        // 언마운트 될 때 리덕스에서 일기 데이터 없애기
        return () => {
            dispatch(unloadDiary());
        };
    }, [dispatch, diaryId]);

    const onEdit = () => {
        navigate('/write');
    };

    const [diarylist, setDiarylist] = useState([]);
    useEffect(() => {
        axios
        .get('http://3.39.17.18/diaries/116300412661869586758')
        .then((response) => {
            setDiarylist(response.data.fetchResult);
        })
    }, []);

    function addDiaryList() {
        let diaryarr = [];
        console.log(diarylist.map(diary => (diary.written_date.substr(0, 10))));
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
        console.log(diarylist);
        console.log(diaryarr);
        return diaryarr;
    }

    const handleEventClick = (info) => {
        // <Link to="/@:email/diaryId" />
        window.open(`/read/:${info.event.id}`);
        // window.open('/@:email/:diaryId');
    }

    const location = useLocation();

    useEffect(() => {
    }, [location])

    let path = location.pathname.substring(7);
    console.log(path);

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

    const onRemove = async() => {
        // try {
        //     await removeDiary(diaryId);
        //     navigate('/');
        // } catch (e) {
        //     console.log(e);
        // }
        await axios
        .delete(`http://3.39.17.18/diaries/details/${path}`, { withCredentials: true })
        .then((response) => {
            console.log(response);
            navigate('/');
        })
        .catch((error) => {
            console.log(error.response);
        })
    };

    return (
        // <DiaryViewer actionButtons={<DiaryActionButtons onEdit={onEdit} onRemove={onRemovebutton} />}
        // />
        <DiaryActionButtons onEdit={onEdit} onRemove={onRemove} />
    );
};

export default DiaryViewerContainer;