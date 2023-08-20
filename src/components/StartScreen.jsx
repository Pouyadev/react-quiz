const StartScreen = ({numQuestions, dispatch}) => {
    return (
        <div className="start">
            <h3>Welcome to the Master Quiz</h3>
            <h4 className={'text-zinc-400'}>{numQuestions} question to test your react mastery</h4>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({type: 'startQuiz'})}
            >
                Start Now
            </button>
        </div>
    );
};

export default StartScreen;
