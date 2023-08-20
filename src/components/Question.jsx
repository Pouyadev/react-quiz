import Options from './Options.jsx';

const Question = ({question, dispatch, answer}) => {
    return (
        <div>
            <h4>{question.question}</h4>
            <Options options={question.options} question={question} dispatch={dispatch} answer={answer} />
        </div>
    );
};

export default Question;
