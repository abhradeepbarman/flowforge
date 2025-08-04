const App = () => {
    const handleLogin = () => {
        window.location.href = "http://localhost:8000/api/v1/auth/google";
    };

    return (
        <div>
            <button onClick={handleLogin}>Login with google</button>
        </div>
    );
};

export default App;
