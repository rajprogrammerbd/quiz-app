import React, {  useState, useEffect } from "react";
import Success from "./sucess";
import "./que.css";

function Que({ login, questions }) {
    const [ state, setState ] = useState({ questions: [], login: {}, collected: 0, count: 0, answers: [] });
    const [ selected, setSelected ] = useState({ select: undefined });
    
    useEffect(() => {
        setState({ ...state, questions, login });
    }, [ login, questions ]);

    const added_answers = (question) => {
        //console.log(question);
        let obj = { ...selected, questionId: question._id };
        let results = [ ...state.answers ];
        if ( results.find(objs => objs.questionId === obj.questionId) !== undefined ) {
            results = results.filter(o => o.questionId !== obj.questionId);
        }

        results.push(obj);
        setState({ ...state, answers: results, count: state.count + 1, collected: ( state.collected === (state.questions.length - 1) ) ? state.collected : state.collected + 1 });
        setSelected({ select: undefined });
        /*
        if ( answers.find(objs => objs.questionId == obj.questionId) !== undefined ) {
          answers = answers.filter(o => o.questionId !== obj.questionId);
        }
    
        answers.push(obj);
        setResult({ answers });
        setState({ ...state, collected: ( state.collected === (state.questions.length - 1) ) ? state.collected : state.collected + 1 });
        setSelected({ select: undefined });
        */
    }

    // useEffect(() => {
        // console.log( state.questions.length === state.count + 1, state.questions.length, state.count + 1 );
        // if ( state.questions.length === state.count + 1 ) {
        // console.log(state.questions.length, state.count);
        /*
        if ( state.questions.length === state.count + 1 ) {
            addedAnswers(result.answers);
            console.log('que.js ', result.answers);
            console.log(state.questions.length === state.count);
            // endDone();
        }
        */
    // }, [result.answers]);



    const backBtn = () => {
        setState({ ...state, count: state.count - 1, collected: (( state.collected > 0 ) ? state.collected - 1 : state.collected ) });
        setSelected({ select: undefined });
    }

    return (
        <>
            { ( state.answers.length === 4 ) ? <Success result={state.answers} /> : (
                <>
                    { ( state.questions.length > 0 ) ? (
                        <>
                            <h3 className="question-title">{ state.questions[state.collected].question }</h3>
                            <ul className="question-options">
                                { state.questions[state.collected].options.map(obj => <li key={obj.id} style={{ backgroundColor: (selected.id === obj.id) ? '#6fa6b3' : 'white', color: (selected.id === obj.id) ? 'white' : '#6fa6b3' }} onClick={() => setSelected(obj)}>{obj.text}</li>) }
                            </ul>
                            <div className="button-wappers">
                                { ( state.collected === 0 ) ? null : <button className="back-btn" onClick={backBtn}>back</button> }
                                { ( state.collected === (state.questions.length - 1) ) ? (
                                    <>
                                        { (selected.hasOwnProperty('select') === true) ? null : <button className="next-btn" onClick={() => added_answers(state.questions[state.collected])}>submit</button> }
                                    </>
                                ) : (
                                    <>
                                        { (selected.hasOwnProperty('select') === true) ? null : <button className="next-btn" onClick={() => added_answers(state.questions[state.collected])}>next</button> }
                                    </>
                                )}
                            </div>
                        </>
                    ) : <small>No Data Found!</small> }
                </>
            ) }
        </>
    );
}

export default React.memo(Que);

// <h3 onClick={changingQuestions}>{ state.questions[state.collected].question }</h3>