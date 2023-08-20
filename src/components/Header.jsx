function Header({status, answer}) {
    return (
        <header className="app-header space-x-3 items-center">
            <img
                src="react.ico"
                alt="vite"
                className={`${
                    status === 'active' && answer === null ? 'animate-spin' : ''
                }`}
            />
            <h1 className={'font-header text-center'}>The Master Quiz</h1>
            <img
                src="react.ico"
                alt="vite"
                className={`${
                    status === 'active' && answer === null ? 'animate-spin' : ''
                }`}
            />
        </header>
    );
}

export default Header;
