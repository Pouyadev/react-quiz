const Options = ({question, options, dispatch, answer}) => {
    const hasAnswered = answer !== null;

    return (
        <div className="options">
            {options.map((option, index) => (
                <button
                    disabled={hasAnswered}
                    key={index}
                    className={`btn btn-option ${
                        index === answer ? 'answer' : ''
                    } ${
                        hasAnswered
                            ? index === question.correctOption
                                ? 'correct'
                                : 'wrong'
                            : ''
                    }`}
                    onClick={() =>
                        dispatch({type: 'newAnswer', payload: index})
                    }
                >
                    {option}
                </button>
            ))}
        </div>
    );
};

export default Options;
