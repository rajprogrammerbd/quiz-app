import React, { useState } from 'react';
import Que from "./que";
import styled from 'styled-components';

const QuestionWapper = styled.div`
    width: 75%;
    height: 75%;
    background-color: inherit;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-left: 20px;
`;

const QuestionWapperBtn = styled.button`
    border: none;
    color: white;
    background: #6fa6b3;
    font-weight: bolder;
    padding: 10px 10px;
    cursor: pointer;
    border-radius: 5px;
`;

function Test({ login }) {
    const [ start, setState ] = useState(false);

    const startFn = () => {
        setState(true);
    }

    return (
        <>
            <QuestionWapper>
                { ( !start ) ? <QuestionWapperBtn className="test_btn_start" onClick={startFn}>START</QuestionWapperBtn> : <Que login={login} /> }
            </QuestionWapper>
        </>
    );
}

export default React.memo(Test);