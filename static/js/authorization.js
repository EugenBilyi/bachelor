function App() {
    const [errorMessage, setErrorMessage] = React.useState('');

    const [showPassword, setShowPassword] = React.useState(false);

    const handleAuthorisation = (event) => {
        event.preventDefault();

        // Получаем данные из элементов формы по их именам
        const form = event.target;
        const email = form.elements.email.value;
        const password = form.elements.password.value;

        fetch('http://127.0.0.1:5000/authorize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/main_page'; // Перенаправление на главную страницу
            } else {
                setErrorMessage('Error:  ' + data.message); // Отображение сообщения об ошибке
            }
        })
        .catch(error => {
            setErrorMessage('An error occurred during authorization.');
            console.error(error);
        });
    };

    const handleCheckboxChange = () =>{
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div className='divText'>
                <h1>Skladový systém</h1>
            </div>
            <div className='wrapper'>
                <form onSubmit={handleAuthorisation}>
                    <h1>Login</h1>
                    <div className='input-box'>
                        <input type='email' name='email' placeholder='Email' required />
                        <i className='fa-regular fa-envelope icon'></i>
                    </div>
                    
                    <div className='input-box'>
                        <input type={showPassword ? 'text' : 'password'} 
                            name='password' 
                            placeholder='Password' 
                            required />
                        <i className={showPassword ? 'fa-solid fa-lock-open icon' : 'fa-solid fa-lock icon'}></i>
                    </div>

                    <label className='labelCheckbox'>
                        <input type='checkbox' checked={showPassword} onChange={handleCheckboxChange} />
                        Show Password
                    </label>

                    <p className='errorTag' style={{color: 'red'}}>{errorMessage}</p>

                    <button type='submit'>Login</button>

                    <div className='register-link'>
                        <p>Don't have an account? <a href='/register_page'>Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));
