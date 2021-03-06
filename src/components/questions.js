import React, { useState, useEffect, useContext } from 'react';
import { LoginFunctionalities } from "./../App";
import { AiFillCloseCircle } from "react-icons/ai";
import "./questions.css";
import Header from "./header";

function QuestionPage({ login, peoples }) {

    const { clickedDeleteBtn, questions, addQuestion } = useContext(LoginFunctionalities);
    const [ state, setState ] = useState({  login: undefined, users: [], mainQuestions: [], questions: { start: false, question: '', first: '', second: '', third: '', forth: '', ansText: '' } });

    const generatedQuestion = () => {
        const obj = {
            _id: `s-${questions.length + 1}`,
            question: state.questions.question,
            options: [ 
                { id: `s-${questions.length + 1}-1`, text: state.questions.first }, 
                { id: `s-${questions.length + 1}-2`, text: state.questions.second },
                { id: `s-${questions.length + 1}-3`, text: state.questions.third },
                { id: `s-${questions.length + 1}-4`, text: state.questions.forth }
            ],
            answers: undefined
        }

        const newObj = obj.options.filter(v => {
            if ( v.text === state.questions.ansText ) {
                return v;
            }
        });

        obj.answers = newObj[0];

        return obj;
    }

    const submit = e => {
        e.preventDefault();
        setState({ ...state, questions: { ...state.questions, start: true } });
    }

    const finallyAddQuestion = () => {
        const value = generatedQuestion();

        addQuestion(value);
    }

    useEffect(() => {
        setState({ ...state, login, users: peoples, mainQuestions: ( Array.isArray(questions) ) ? questions : questions.questions });
    }, []);
    
    return (
        <>
            <Header />
            <div className="question-body">
                <hr color="#ddd" />

                <div className="question-wapper">
                    <div className="wapper-left">
                        <div className="add_question">
                        <p className="addQuestion_title">Add New Question:</p>
                            { ( state.questions.start ) ? (
                                <>
                                    <div className="list-confirmation">
                                        <p className="list-title">{ state.questions.question }</p>
                                        <small style={{ color: "#bb299c", fontSize: 12 }}>Choose the correct answer</small>
                                        <ul>
                                            <li style={{ background: ( state.questions.ansText === state.questions.first ) ? "#455250" : "#fff", color: ( state.questions.ansText === state.questions.first ) ? "#fff" : "#383838" }} onClick={() => setState({ ...state, questions: { ...state.questions, ansText: state.questions.first } })}>{ state.questions.first }</li>
                                            <li style={{ background: ( state.questions.ansText === state.questions.second ) ? "#455250" : "#fff", color: ( state.questions.ansText === state.questions.second ) ? "#fff" : "#383838" }} onClick={() => setState({ ...state, questions: { ...state.questions, ansText: state.questions.second } })}>{ state.questions.second }</li>
                                            <li style={{ background: ( state.questions.ansText === state.questions.third ) ? "#455250" : "#fff", color: ( state.questions.ansText === state.questions.third ) ? "#fff" : "#383838" }} onClick={() => setState({ ...state, questions: { ...state.questions, ansText: state.questions.third } })}>{ state.questions.third }</li>
                                            <li style={{ background: ( state.questions.ansText === state.questions.forth ) ? "#455250" : "#fff", color: ( state.questions.ansText === state.questions.forth ) ? "#fff" : "#383838" }} onClick={() => setState({ ...state, questions: { ...state.questions, ansText: state.questions.forth } })}>{ state.questions.forth }</li>
                                        </ul>

                                        <button disabled={(state.questions.ansText.trim() === '') ? true : false} onClick={finallyAddQuestion}>Add Question</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                <form onSubmit={submit}>
                                    <input type="text" value={state.questions.question} onChange={e => setState({ ...state, questions: { ...state.questions, question: e.target.value } })} placeholder="New Question" />
                                    <input type="text" value={state.questions.first} onChange={e => setState({ ...state, questions: { ...state.questions, first: e.target.value } })} className="options" placeholder="First option" />
                                    <input type="text" value={state.questions.second} onChange={e => setState({ ...state, questions: { ...state.questions, second: e.target.value } })} className="options" placeholder="Second option" />
                                    <input type="text" value={state.questions.third} onChange={e => setState({ ...state, questions: { ...state.questions, third: e.target.value } })} className="options" placeholder="Third option" />
                                    <input type="text" value={state.questions.forth} onChange={e => setState({ ...state, questions: { ...state.questions, forth: e.target.value } })} className="options" placeholder="Fourth option" />
                                    
                                    <input type="submit" disabled={( state.questions.question.trim() === '' || state.questions.first.trim() === '' || state.questions.second.trim() === '' || state.questions.third.trim() === '' || state.questions.forth.trim() === '' ) ? true : false } value="Add" />
                                </form>
                                </>
                            ) }
                        </div>

                        <div className="users-details">
                            { state.users.map(user => (
                                    <div key={user._id} className="user-item">
                                        <div className="user-top">
                                            <div className="user-left">
                                                <p className="name">Name: { user.name }</p>
                                                <p className="email">Email: { user.email }</p>
                                            </div>
                                            
                                            <p className="type">Type: { user.type }</p>
                                        </div>

                                        <div className="user-bottom">

                                        <p className="current-title">Current answers of questions</p>
                                            
                                            { (user.answers.length === 0) ? (
                                                <>
                                                    <p className="no-items-found">No answers found</p>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="bottom-current-item">
                                                        <ul>
                                                            { user.answers.map((ans, key) => (
                                                                <li key={ans.id}>{ state.mainQuestions[key].question }
                                                                    <span>&#8594; { ans.text }</span>
                                                                </li>
                                                            )) }
                                                        </ul>
                                                    </div>
                                                </>
                                            ) }

                                            {   <>
                                                    
                                                    { ( user.oldAnswers ) ? (
                                                        <>
                                                            { (user.oldAnswers.length === 0) ? (
                                                                <></>
                                                            ) : (
                                                                <>
                                                                    <p className="old-answers-found">Old answers of questions</p>
                                                                    { user.oldAnswers.map((arr, key) => (
                                                                        <div key={key} className="old-items-p">
                                                                            <ul>
                                                                                { arr.map((ob, k) => (
                                                                                    <li key={ob.id}>
                                                                                        { state.mainQuestions[k].question }
                                                                                        <span>&#8594; { ob.text }</span>
                                                                                    </li>
                                                                                )) }
                                                                            </ul>
                                                                        </div>
                                                                    )) }
                                                                </>
                                                            ) }
                                                        </>
                                                    ) : (
                                                        <></>
                                                    ) }
                                                </>
                                            }
                                            
                                        </div>
                                    </div>
                            )) }
                        </div>

                    </div>

                    <div className="wapper-right">
                        <div className="showing-questions-container">
                            <p className="showing_question_title">Questions:</p>

                            { state.mainQuestions.map(obj => (
                                
                                    <div className="question-items" key={obj._id}>
                                        <div className="top-sec">
                                            <p className="top-title">{ obj.question }</p>
                                            <AiFillCloseCircle onClick={() => clickedDeleteBtn(obj._id)} style={{ cursor: 'pointer' }} size={16} />
                                        </div>
                                        <div className="bottom-sec">
                                            <ul>
                                                { obj.options.map(o => (
                                                    <li key={o.id}>{o.text}</li>
                                                )) }
                                            </ul>
                                        </div>
                                    </div>
                                
                            )) }

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuestionPage;