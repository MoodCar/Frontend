import { useEffect, useCallback, useState } from "react";
import Editor from '../../components/write/Editor';
import { useSelector, useDispatch } from "react-redux";
import { changeField, initialize } from "../../modules/write";
import SelectDate from "../../components/common/SelectDate";

const EditorContainer = () => {
    console.log(SelectDate.startDate);
    // console.log(SelectDate.startDate);
    const dispatch = useDispatch();
    const { content, date } = useSelector(({ write }) => ({
        content: write.content,
        date: write.date,
    }));
    const onChangeField = useCallback(payload => dispatch(changeField(payload)), [
        dispatch,
    ]);
    // 언마운트될 때 초기화
    useEffect(() => {
        return () => {
            dispatch(initialize());
        };
    }, [dispatch]);
    return (
        <>
            <Editor onChangeField={onChangeField} content={content} date={date} />
        </>
    )
};

export default EditorContainer;