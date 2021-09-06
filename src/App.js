import React, { useState, useEffect } from 'react';
import Home from "./components/home";
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from "./components/notFound";
import QuestionPage from "./components/questions";

export const LoginFunctionalities = React.createContext();

function App() {

  const [ state, setState ] = useState({ login: null, error: false });

  const logout = () => {
    sessionStorage.setItem('quiz-log', JSON.stringify({ login: null }));
    setState({ ...state, login: null, error: false });
  }

  const setLocalStroage = objs => {
    const data = JSON.parse(localStorage.getItem('my-database'));
    const newData = data.users.map(obj => {
      if ( obj.email === objs.login.email ) {
        obj = objs.login;
      }
      return obj;
    });
    data.users = newData;
    
    localStorage.setItem('my-database', JSON.stringify(data));
  }

  const addedAnswers = (arr) => {
    if ( state.login.answers.length > 0 ) {
      let localData = { ...state, login: { ...state.login, oldAnswers: [ ...state.login.oldAnswers, arr ] } };
      setLocalStroage(localData);
      setState(localData);
    } else {
      const localData = { ...state, login: { ...state.login, answers: arr } };
      setLocalStroage(localData);
      setState(localData);
    }
  }

  const loginFunction = o => {
    if ( state.login === null ) {
      const { users } = JSON.parse(localStorage.getItem('my-database'));
      const value = users.find(obj => (obj.email.toLowerCase() === o.email.toLowerCase() && obj.password === o.password));
      if ( value !== undefined ) {
        sessionStorage.setItem('quiz-log', JSON.stringify({  login: value }));
        setState({ ...state, login: value, error: false });
      } else {
        // Not LoggedIn
        sessionStorage.setItem('quiz-log', JSON.stringify({ login: null }));
        setState({ ...state, login: null, error: 'Email & Password are not valid' });
      }
    }
  }

  useEffect(() => {
    let sessionInitial;
    let localInitial;

      if ( sessionStorage.getItem('quiz-log') === null ) {
        sessionInitial = {
          login: null
        }

        sessionStorage.setItem('quiz-log', JSON.stringify(sessionInitial));
      } else {
        sessionInitial = JSON.parse(sessionStorage.getItem('quiz-log'));
      }


      if ( localStorage.getItem('my-database') === null ) {
        localInitial = {
              users: [
                  {
                      _id: 1,
                      type: "Admin",
                      name: "Raj Dutta",
                      email: 'admin@gmail.com',
                      password: '123456',
                      answers: [],
                      oldAnswers: []
                  },
                  {
                    _id: 2,
                    type: "General",
                    name: "Raj General",
                    email: 'general@gmail.com',
                    password: '123456',
                    answers: [],
                    oldAnswers: []
                }
              ],
              questions: [
                  {
                      _id: `q-1`,
                      question: 'HTML stands for -',
                      options: [
                          { id: `q-1-1`, text: 'HighText Machine Language' },
                          { id: `q-1-2`, text: 'HyperText and links Markup Language' },
                          { id: `q-1-3`, text: 'HyperText Markup Language' },
                          { id: `q-1-4`, text: 'None of these' }
                      ],
                      answer: { id: `q-1-3`, text: 'HyperText Markup Language' }
                  },
                  {
                      _id: `q-2`,
                      question: 'The correct sequence of HTML tags for starting a webpage is -',
                      options: [
                          { id: `q-2-1`, text: 'Head, Title, HTML, body' },
                          { id: `q-2-2`, text: 'HTML, Body, Title, Head' },
                          { id: `q-2-3`, text: 'HTML, Head, h3, Body' },
                          { id: `q-2-4`, text: 'HTML, Head, Title, Body' }
                      ],
                      answer: { id: `q-2-4`, text: 'HTML, Head, Title, Body' }
                  },
                  {
                      _id: `q-3`,
                      question: 'Which of the following element is responsible for making the text bold in HTML?',
                      options: [
                          { id: `q-3-1`, text: '<pre>' },
                          { id: `q-3-2`, text: '<a>' },
                          { id: `q-3-3`, text: '<b>' },
                          { id: `q-3-4`, text: '<br>' }
                      ],
                      answer: { id: `q-3-3`, text: '<b>' }
                  },
                  {
                      _id: `q-4`,
                      question: 'Which of the following tag is used for inserting the largest heading in HTML?',
                      options: [
                          { id: `q-3-1`, text: '<h3>' },
                          { id: `q-3-2`, text: '<h1>' },
                          { id: `q-3-3`, text: '<h5>' },
                          { id: `q-3-4`, text: '<h6>' }
                      ],
                      answer: { id: `q-3-2`, text: '<h1>' }
                  }
              ]
          }
          localStorage.setItem('my-database', JSON.stringify(localInitial));
      } else {
        localInitial = JSON.parse(localStorage.getItem('my-database'));
      }

      setState({ ...state, login: sessionInitial.login });
  }, []);

  return (
    <>
      <LoginFunctionalities.Provider value={{ logout, login: state.login, error: state.error, loginFunction, addedAnswers }}>
        <Switch>
          <Route path="/not-found" component={props => <NotFound {...props} />} />
          <Route path="/questions">
            { ( state.login ) ? (
              <>
                { ( state.login.type === "Admin" ) ? <Route path="/questions" component={props => <QuestionPage {...props} />} /> : <Redirect to="/" /> }
              </>
            ) : <Redirect to="/" /> }
          </Route>
          <Route path="/" exact component={props => <Home {...props} login={state.login} loginFunction={loginFunction} error={state.error} />} />
          <Redirect to="not-found" />
        </Switch>
      </LoginFunctionalities.Provider>
    </>
  );
}

export default App;