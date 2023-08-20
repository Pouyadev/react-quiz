import {useEffect, useReducer} from 'react';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Loader from './components/Loader.jsx';
import Error from './components/Error.jsx';
import StartScreen from './components/StartScreen.jsx';
import Question from './components/Question.jsx';
import NextButton from './components/NextButton.jsx';
import Progress from './components/Progress.jsx';
import FinishedScreen from './components/FinishedScreen.jsx';
import Timer from './components/Timer.jsx';
import Footer from './components/Footer.jsx';

const SEC_PER_QUESTION = 10;

const initialState = {
    status: 'idle', // idle, loading, error, active, ready, finished
    questions: [],
    current: 0,
    answer: null,
    points: 0,
    highestPoint: 0,
    secondRemaining: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'startFetching':
            return {...state, status: 'loading'};
        case 'dataReceived':
            return {...state, questions: action.payload, status: 'ready'};
        case 'dataFailed':
            return {...state, status: 'error'};
        case 'startQuiz':
            return {
                ...state,
                status: 'active',
                secondRemaining: state.questions.length * SEC_PER_QUESTION,
            };
        case 'ticktock':
            return {
                ...state,
                secondRemaining: state.secondRemaining - 1,
                status: state.secondRemaining === 0 ? 'finished' : state.status,
                highestPoint:
                    state.secondRemaining === 0 &&
                    state.points > state.highestPoint
                        ? state.points
                        : state.highestPoint,
            };
        case 'newAnswer':
            const question = state.questions[state.current];
            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points,
            };
        case 'nextQuestion':
            return {...state, current: state.current + 1, answer: null};
        case 'endQuiz':
            return {
                ...state,
                status: 'finished',
                highestPoint:
                    state.points > state.highestPoint
                        ? state.points
                        : state.highestPoint,
            };
        case 'restartQuiz':
            return {
                ...initialState,
                questions: state.questions,
                status: 'active',
                secondRemaining: state.questions.length * SEC_PER_QUESTION,
                highestPoint: state.highestPoint,
            };
        default:
            throw new Error('Unknown action');
    }
};

const App = () => {
    const [
        {
            status,
            questions,
            current,
            answer,
            points,
            highestPoint,
            secondRemaining,
        },
        dispatch,
    ] = useReducer(reducer, initialState);

    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce(
        (acc, cur) => acc + cur.points,
        0,
    );

    const fetchQuestions = async () => {
        dispatch({type: 'startFetching'});
        try {
            const res = await fetch('http://localhost:8000/questions');
            const data = await res.json();
            dispatch({type: 'dataReceived', payload: data});
        } catch (err) {
            dispatch({type: 'dataFailed'});
            console.error(err.message);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <div className="app mb-4">
            <Header status={status} answer={answer} />
            <Main>
                {status === 'loading' && <Loader />}
                {status === 'error' && <Error />}
                {status === 'ready' && (
                    <StartScreen
                        numQuestions={numQuestions}
                        dispatch={dispatch}
                    />
                )}
                {status === 'active' && (
                    <>
                        <Progress
                            current={current}
                            numQuestions={numQuestions}
                            answer={answer}
                            points={points}
                            maxPossiblePoints={maxPossiblePoints}
                        />
                        <Question
                            question={questions[current]}
                            answer={answer}
                            dispatch={dispatch}
                        />
                        <Footer>
                            <Timer
                                secondRemaining={secondRemaining}
                                dispatch={dispatch}
                                answer={answer}
                            />
                            <NextButton
                                answer={answer}
                                current={current}
                                numQuestions={numQuestions}
                                dispatch={dispatch}
                            />
                        </Footer>
                    </>
                )}
                {status === 'finished' && (
                    <FinishedScreen
                        highestPoint={highestPoint}
                        points={points}
                        maxPossiblePoints={maxPossiblePoints}
                        dispatch={dispatch}
                        fetchQuestions={fetchQuestions}
                    />
                )}
            </Main>
        </div>
    );
};

export default App;
