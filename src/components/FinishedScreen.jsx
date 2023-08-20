const FinishedScreen = ({
    points,
    maxPossiblePoints,
    dispatch,
    highestPoint,
}) => {
    const percentage = (points / maxPossiblePoints) * 100;
    let emoji;
    if (percentage === 100) emoji = '🥇';
    else if (percentage >= 80 && percentage < 100) emoji = '🥈';
    else if (percentage >= 50 && percentage < 80) emoji = '🥉';
    else if (percentage >= 30 && percentage < 50) emoji = '💨';
    else if (percentage < 30) emoji = '💩';

    return (
        <>
            {!!highestPoint && (
                <h4 className={'text-center tracking-wide'}>
                    Highest Point{' '}
                    <strong className={'text-amber-400 underline'}>
                        {highestPoint}
                    </strong>
                </h4>
            )}
            <p className={'result'}>
                {emoji} You scored <strong>{points}</strong> out of{' '}
                {maxPossiblePoints} ({Math.ceil(percentage)}%)
            </p>
            <button
                onClick={() => {
                    dispatch({type: 'restartQuiz'});
                }}
                className={
                    'mx-auto block px-6 py-2 text-white font-bold text-2xl uppercase hover:scale-105 tracking-wide hover:text-gray-300 transition-all duration-200'
                }
            >
                Start Again
            </button>
        </>
    );
};

export default FinishedScreen;
