const NextButton = ({answer, current, numQuestions, dispatch}) => {
    if (answer === null) return;

    const lastQuestion = current === numQuestions - 1;

    return (
        <button
            className={
                `${lastQuestion ? 'hover:text-rose-600 ' :'hover:text-teal-500'} text-2xl tracking-wide uppercase font-bold text-gray-400 transition-colors duration-200`
            }
            onClick={() =>
                dispatch({
                    type: lastQuestion ? 'endQuiz' : 'nextQuestion',
                })
            }
        >
            {lastQuestion ? 'Finish' : 'Next '}
        </button>
    );
};

export default NextButton;
