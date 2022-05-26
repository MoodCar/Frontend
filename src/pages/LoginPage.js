import React from 'react';
import Button from '../components/common/Button';
import styled from 'styled-components';
import * as googleAPI from '../lib/api/auth';
import happy from '../images/happy5.png';
import logo from '../images/logo4.png';
import tag from '../images/hashtag.png';
import cd from '../images/cd.png';
import '../lib/styles/fonts/font.css';

const StyledButton = styled(Button)`
    height: 2.4rem;
    & + & {
        margin-left: 0.5rem;
    }
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
        <>
            <div style={{marginTop:"3rem", textAlign:"center", height:"4rem"}} >
                <img height="100%" src={logo} alt="happy" />
            </div>
            <div style={{float:"right", marginRight:"2rem"}}>
                <StyledButton onClick={googleAPI.login}>로그인</StyledButton>
            </div>
            <div style={{marginTop:"3rem", height:"35rem", backgroundColor:"lightgray", display:"flex", justifyContent:"center"}}>
                <div style={{textAlign:"center", border:"3px dashed black", borderRadius:"15px", padding:"15px", float:"left", width:"30%", display:"inline-block", margin:"10px"}}>
                    {/* <div style={{marginTop:"3rem"}}>
                        <img src={happy} alt='happy' />
                        <div style={{fontFamily:"NeoDunggeunmo", fontSize:"1.5rem", fontWeight:"normal", marginTop:"1rem"}}>감정</div>
                    </div> */}
                </div>
                <div style={{textAlign:"center", border:"3px dashed black", borderRadius:"15px", padding:"15px", float:"left", width:"30%", display:"inline-block", margin:"10px"}}>
                    {/* <img src={tag} alt='tag' /> */}
                </div>
                <div style={{textAlign:"center", border:"3px dashed black", borderRadius:"15px", padding:"15px", float:"left", width:"30%", display:"inline-block", margin:"10px"}}>
                    {/* <img src={cd} alt='cd' /> */}
                </div>
            </div>
        </>
    );
};

export default LoginPage;