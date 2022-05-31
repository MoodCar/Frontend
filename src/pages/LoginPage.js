import React from 'react';
import Button from '../components/common/Button';
import styled from 'styled-components';
import * as googleAPI from '../lib/api/auth';
import happy from '../images/happy5.png';
import logo from '../images/logo4.png';
import tag from '../images/hashtag.png';
import cd from '../images/cd.png';
import '../lib/styles/fonts/font.css';
import './LoginPage.css';

const StyledButton = styled(Button)`
    height: 2.4rem;
    & + & {
        margin-left: 0.5rem;
    }
`;

const StyledWrapper = styled.div`
  margin-top: 3.5rem;
  height: 32.5rem;
  display: flex;
  justify-content: center;
`;

const LoginPage = () => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    /*
    font-family: "NeoDunggeunmo";
  font-size: 1.1rem;
  font-weight: normal;*/
    return (
        <div className='linear_gradient'>
        <div className='mount'>
            <div style={{marginTop:"3rem", textAlign:"center", height:"4rem"}} >
                <img height="100%" src={logo} alt="happy" />
            </div>
            <div style={{float:"right", marginRight:"2rem"}}>
                <StyledButton onClick={googleAPI.login}>로그인</StyledButton>
            </div>
            {/* <div style={{marginTop:"3rem", height:"35rem", backgroundColor:"lightgray", display:"flex", justifyContent:"center"}}> */}
            <StyledWrapper >
                <div style={{textAlign:"center", border:"3px dashed black", borderRadius:"15px", padding:"15px", float:"left", width:"30%", display:"inline-block", margin:"10px"}}>
                    <div style={{marginTop:"5.5rem"}}>
                        <img src={happy} alt='happy' />
                        <div style={{fontFamily:"NeoDunggeunmo", fontSize:"2rem", fontWeight:"normal", marginTop:"1rem"}}>감정</div>
                        <div style={{fontFamily:"S-CoreDream-3Light", fontSize:"1.5rem", fontWeight:"normal", marginTop:"1rem"}}>{'작성한 일기의'}<br/>{'감정 분석 결과를'}<br />{'제공해 드립니다'}</div>
                    </div>
                </div>
                <div style={{textAlign:"center", border:"3px dashed black", borderRadius:"15px", padding:"15px", float:"left", width:"30%", display:"inline-block", margin:"10px"}}>
                    <div style={{marginTop:"5.5rem"}}>
                        <img src={tag} alt='tag' />
                        <div style={{fontFamily:"NeoDunggeunmo", fontSize:"2rem", fontWeight:"normal", marginTop:"1rem"}}>키워드</div>
                        <div style={{fontFamily:"S-CoreDream-3Light", fontSize:"1.5rem", fontWeight:"normal", marginTop:"1rem"}}>{'작성한 일기의'}<br/>{'주요 키워드를 추출하여'}<br />{'제공해 드립니다'}</div>
                    </div>
                </div>
                <div style={{textAlign:"center", border:"3px dashed black", borderRadius:"15px", padding:"15px", float:"left", width:"30%", display:"inline-block", margin:"10px"}}>
                    <div style={{marginTop:"5.5rem"}}>
                        <img src={cd} alt='cd' />
                        <div style={{fontFamily:"NeoDunggeunmo", fontSize:"2rem", fontWeight:"normal", marginTop:"1rem"}}>콘텐츠</div>
                        <div style={{fontFamily:"S-CoreDream-3Light", fontSize:"1.5rem", fontWeight:"normal", marginTop:"1rem"}}>{'오늘 작성한 일기의'}<br/>{'감정에 따른 콘텐츠를'}<br />{'추천해 드립니다'}</div>
                    </div>
                </div>
            {/* </div> */}
            </StyledWrapper>
            <div style={{textAlign:"center", fontFamily:"S-CoreDream-3Light", fontSize:"1.2rem", fontWeight:"normal", marginTop:"0.8rem"}}>{'※ 일기를 완성된 문장 형태로 최대한 구체적으로 적어주시면 분석 결과가 더 정확해집니다! ※'}</div>
        </div>
        </div>
    );
};

export default LoginPage;