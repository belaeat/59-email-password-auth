import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import app from '../../firebase/firebase.init';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Login = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // For Reset Password
    const emailRef = useRef();

    const handleLogin = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        // validation
        setError('')
        setSuccess('')

        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('Password should contain two upper letter.')
            return;
        }
        else if (!/(?=.*[0-9].*[0-9].*[0-9])/.test(password)) {
            setError('Password should contain three digit.')
            return;
        }
        else if (password.length <= 6) {
            setError('Password must be 6 characters long.')
            return;
        }

        // sign in
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                if (!loggedUser.emailVerified) {
                    alert('Please verify your email address')
                }

                setSuccess('Login Successful!')
                setError('');
            })
            .catch(error => {
                setError(error.message)
            })
    }

    // for reset password
    const handleResetPassword = event => {
        const email = emailRef.current.value;
        if(!email){
            alert('Please provide your email address to reset your password')
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then( () =>{
                alert('Please check your email')
            })
            .catch(error => {
                console.log(error);
                setError(error.message)
            })
    }


    return (
        <div className='w-50 mx-auto'>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input ref={emailRef} className='w-50 mb-4 rounded ps-2' type="email" name='email' id='email' placeholder='Your email' required />
                <br />
                <input className='w-50 mb-4 rounded ps-2' type="password" name="password" id="password" placeholder='Your password' required />
                <br />
                <input className='btn btn-primary' type="submit" value="Login" />
            </form>

            <p><small>Forget Password? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button></small></p>

            <p><small>New to this website? Please <Link to='/register'>Register</Link></small></p>

            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;