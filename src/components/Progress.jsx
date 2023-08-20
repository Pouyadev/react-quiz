const Progress = ({
    current,
    numQuestions,
    points,
    answer,
    maxPossiblePoints,
}) => {

    const progressWidth = Math.round(
        ((current + Number(answer !== null)) / numQuestions) *
        100
    );

    return (
        <>
            <div className={'w-full h-6 bg-gray-300 rounded-full mb-1'}>
                <div
                    style={{width: `${progressWidth}%`}}
                    className={
                        'h-full bg-[#1098ad] rounded-full flex items-center justify-center font-sans text-lg'
                    }
                >
                    {!!progressWidth && `${progressWidth}%`}
                </div>
            </div>
            <header className={'progress'}>
                <p>
                    Question <strong>{current + 1}</strong>/{numQuestions}
                </p>
                <p>
                    <strong>{points}</strong>/{maxPossiblePoints}
                </p>
            </header>
        </>
    );
};

export default Progress;
