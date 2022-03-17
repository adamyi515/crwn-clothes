import React, { useState, useContext } from 'react'
import './sign-in-form.styles.scss';


// Firebase
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

// Components
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const SignInForm = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const { email, password } = user;

    // Methods /////////////////////////////////////
    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleChange = ev => {
        setUser({
            ...user,
            [ev.target.name]: ev.target.value
        });
    }

    const handleSubmit = async ev => {
        ev.preventDefault();
        const { email, password } = user;

        try{
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            setUser({
                email: '',
                password: ''
            });

        } catch(err){
            switch(err.code){ 
                case 'auth/user-not-found':
                    alert('Email does not exist.')
                    break;
                case 'auth/wrong-password':
                    alert('Password does not match for email.');
                    break;
                default: 
                    console.log(err);
            }   
        }   
    }

    return (
        <div className='sign-in-container'>
            <h2>Already haven an account?</h2>
            <span>Sign in with your email and password</span>     
            <form onSubmit={handleSubmit}>
                <FormInput label='Email Address' type='email' name='email' onChange={handleChange} value={email} required />
                <FormInput label='Password' type='password' name='password' onChange={handleChange} value={password} required />
                <div className='buttons-container'>   
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign in</Button>
                </div>
            
            </form>
        </div>
    )
}

export default SignInForm;