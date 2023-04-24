import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import app from '../../firebase/firebase.init';
import { Link } from 'react-router-dom';


const auth = getAuth(app)


const Register = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = (event) => {
        // 1. Prevent page refresh
        event.preventDefault();
        setSuccess('');
        setError('');

        // 2. Collect form date
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password)

        // validate
        if ( ! /(?=.*[A-Z])/.test(password)) {
            setError('Please use at least one upper case');
            return;
        }
        else if( ! /(?=.[0-9].*[0-9])/.test(password)){
            setError('Password should contain two digit')
        }
        else if(password.length <= 6){
            setError('Password should be at least 6 characters')
        }

        // create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setError('');
                event.target.reset();

                setSuccess('User has been created successfully')
            })
            .catch(error => {
                console.error(error.message);
                setError(error.message);
            })
    }

    const handleEmailChange = (event) => {
        // console.log(event.target.value)
        // setEmail(event.target.value)
    }

    const handlePasswordBlur = (event) => {
        // console.log(event.target.value)
    }

    return (
        <div className='w-50 mx-auto'>
            <h4>Please Register</h4>
            <form onSubmit={handleSubmit}>
                <input className='w-50 mb-4 rounded ps-2' onChange={handleEmailChange} type="email" name='email' id='email' placeholder='Your email' required />
                <br />
                <input className='w-50 mb-4 rounded ps-2' onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='Your password' required />
                <br />
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>
            <p><small>Already have an account? Please <Link to='/login'>Login</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;