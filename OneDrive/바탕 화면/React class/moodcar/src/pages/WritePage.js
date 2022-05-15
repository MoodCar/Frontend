import Responsive from "../components/common/Responsive";
import EditorContainer from "../containers/write/EditorContainer";
import WriteActionButtonsContainer from "../containers/write/WriteActionButtonContainer";
import SelectDate from "../components/common/SelectDate";
import * as diaryAPI from "../lib/api/diary";
import PostDiary from "../components/write/PostDiary.js";

const WritePage = () => {
    return (
        <Responsive>
            {/* <EditorContainer />
            <SelectDate />
            <WriteActionButtonsContainer /> */}
            <PostDiary />
        </Responsive>
    );
};

export default WritePage;

// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import styled from 'styled-components';
// import SelectDate from '../components/common/SelectDate.js';

// class WritePage extends Component {
//     state= {
//         content:"",
//         date: "",
//     };
//     writeDiary = async() => {
//         const { content, date } = this.state;
//         const diary = await axios.post("/diaries/:providerId", {
//             content,
//             date,
//         });

//         this.setState({
//             content: "",
//             date: "",
//         });
//         console.log(diary);
//     };

//     handleChangeContent = (e) => {
//         const {name, value} = e.target;
//         this.setState({
//             [name]: value,
//         });
//     };

//     handleChangeDate = (e) => {
//         const { name, value } = e.target;
//         this.setState({
//             [name]: value,
//         });
//     };

//     render() {
//         return (
//             <Wrap>
//                 <h2>일기 작성</h2>
//                 <SelectDate 
//                     type="text"
//                     name="date"
//                     onchange={this.handleChangeDate}
//                     value= {SelectDate.startDate}
//                 />
//                 <p>
//                     <textarea
//                         type="text"
//                         name="content"
//                         onChange={this.handleChangeContent}
//                         value={this.state.content}
//                     />
//                 </p>
//                 <Button>
//                     <button onClick={this.writeDiary}>등록</button>
//                     <Link to="/">취소</Link>
//                 </Button>
//                 <div>{JSON.stringify(this.state)}</div>
//             </Wrap>
//         );
//     }
// }

// const Wrap = styled.div`
//     padding: 20px;
//     textarea {
//         width: 100%;
//         height: 100px;
//         border: 1px solid #ccc;
//     }
// `;

// const Button = styled.div`
//     border-top: 1px solid #eee;
//     padding: 20px;
//     button {
//         float: right;
//         padding: 10px 20px;
//         border-radius: 5px;
//         text-decoration: none;
//         background: #212121;
//         color : #fff;
//         font-size: 16px;
//     }
//     a {
//         float: right;
//         padding: 10px 20px;
//         border-radius: 5px;
//         text-decoration: none;
//         background: #f2f2f2;
//         border: 1px solid #ddd;
//         color: #424242;
//         font-size: 16px;
//     }
//     &>button + a {
//         margin-right: 5px;
//     }
// `;

// export default WritePage;