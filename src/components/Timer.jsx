import {useEffect} from 'react';

const Timer = ({dispatch, secondRemaining, answer}) => {
    const hasAnswered = answer !== null;

    const min = Math.floor(secondRemaining / 60);
    const sec = Math.floor(secondRemaining % 60);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch({type: 'ticktock'});
        }, 1000);
        if (hasAnswered) clearInterval(interval);

        return () => clearInterval(interval);
    }, [hasAnswered]);

    return (
        <div
            className={`text-gray-300 text-xl font-bold tracking-widest ${
                !hasAnswered && 'animate-ping'
            }`}
        >
            {min < 10 ? min === 0 ? '00' : `0${min}` : min}:
            {sec < 10 ? sec === 0 ? '00' : `0${sec}` : sec}
        </div>
    );
};

export default Timer;
