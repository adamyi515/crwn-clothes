import React, { useState, useContext } from 'react'
import './sign-up-form.styles.scss';

// Firebase
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

// Components
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';


const SignUpForm = () => {
    const [user, setUser] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { displayName, email, password, confirmPassword} = user;

    // Methods ////////////////////////////////////////////////////////////////////////
    const handleChange = ev => {
        setUser({
            ...user,
            [ev.target.name]: ev.target.value
        });
    }

    const handleSubmit = async ev => {
        ev.preventDefault();
        const { displayName, email, password, confirmPassword } = user;
        if(password !== confirmPassword){
            alert('passowrd does not match');
            return;
        }

        try{
            // Create the document inside your authentication
            const response = await createAuthUserWithEmailAndPassword(email, password);
            // After it generate the user in the authentication, create the user inside your firestore database.
            await createUserDocumentFromAuth(response.user, { displayName });
            setUser({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch(err){
            if(err.code === 'auth/email-already-in-use'){
                alert('Cannot create new user, email already in use.')
            }
            console.log(err);
        }   
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>     
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' type='text' name='displayName' onChange={handleChange} value={displayName} required />
                <FormInput label='Email Address' type='email' name='email' onChange={handleChange} value={email} required />
                <FormInput label='Password' type='password' name='password' onChange={handleChange} value={password} required />
                <FormInput label='Confirm password' type='password' name='confirmPassword' onChange={handleChange} value={confirmPassword} required />
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;