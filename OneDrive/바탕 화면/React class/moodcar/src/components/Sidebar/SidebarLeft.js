import React, { useRef, useState } from "react";
import styled from "styled-components";

const Side = styled.div`
    display: flex;
    flex-direction: column;
    background: #000000;
`;

function SidebarRight({ width=300, children }) {
    const [xPosition, setX] = useState(width-900);
    const side = useRef();

    return(
        <Side style={{ width: `${width}px`, height: '100%', transform: `translatex(${-xPosition}px)`}}>
            <div>{children}</div>
        </Side>
    );
};

export default SidebarRight;