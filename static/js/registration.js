function App(){
    const [errorMessage, setErrorMessage] = React.useState('');

    const [showPassword, setShowPassword] = React.useState(false);

    const handleRegister = (event) => {
        event.preventDefault();

        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;
        const confirmPassword = event.target.elements.confirmPassword.value;

        // Проверка совпадения паролей
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        if(password.length < 8){
            setErrorMessage('Password must contain at least 8 characters');
            return;
        }

        // Отправка данных на сервер для регистрации
        fetch('http://16.171.29.143:8000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/authorization_page';  // Переход на страницу авторизации
            } else {
                setErrorMessage(data.message);  // Вывод сообщения об ошибке
            }
        })
        .catch(error => {
            setErrorMessage('An error occurred during registration.');
            console.error(error);
        });
    };

    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };
    

    return (
        <div>
            <div className='divText'>
                <h1>Skladový systém</h1>
            </div>
            <div className='wrapper'>
                <form onSubmit={handleRegister} noValidate>
                    <h1>Register</h1>
                    <div className='input-box'>
                        <input type='text' name='email' placeholder='Email' required />
                        <i className='fa-solid fa-envelope icon'></i>
                    </div>

                    <div className='input-box'>
                        <input type={showPassword ? 'text' : 'password'} 
                            name='password' 
                            placeholder='Password' 
                            minLength='8'
                            title='Password must contain at least 8 characters'
                            required />
                        <i className={showPassword ? 'fa-solid fa-lock-open icon' : 'fa-solid fa-lock icon'}></i>
                    </div>
                    
                    <div className='input-box'>
                        <input className='confirmPassword' 
                            name='confirmPassword' 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder='Confirm password'
                            required />
                        <i className={showPassword ? 'fa-solid fa-lock-open icon' : 'fa-solid fa-lock icon'}></i>
                    </div>

                    <label className='labelCheckbox'>
                        <input type='checkbox' checked={showPassword} onChange={handleCheckboxChange} />
                        Show Password
                    </label>

                    <p className='errorTag' style={{color: 'red'}}>{errorMessage}</p>

                    <button type='submit'>Register</button>

                    <div className='register-link'>
                        <p>Already have an account?<a href='/authorization_page'>Sign in</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));
