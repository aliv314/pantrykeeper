import './Login.scss'
import validator from 'validator';
import { useState } from 'react'
import {useNavigate} from 'react-router-dom';

import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const [submitted, setSubmitted] = useState(true);

    const nav = useNavigate();
    const onSubmitHandler = (e) =>{
        e.preventDefault();
        //Missing input fields.
        if (!mail || !pass){
            console.log("Missing required fields.");
            return;
        }
        //If it's not a valid email address.
        if(!validator.isEmail(mail)){
            console.log("Invalid Email");
            return
        }

        try{
            signInWithEmailAndPassword(auth, mail, pass)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                nav('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        }catch (error){
            console.log(error)
        }
        
    }

    return (
        <section className='register'>
            <h2 className='register__title'> Login </h2>
            <form className='register__form' onSubmit={onSubmitHandler}>
                <p className='register__label'>Email</p>
                <input className='register__input' placeholder='e-Mail' type='text' value={mail} onChange={(e) => setMail(e.target.value)}></input>
                <p className='register__label'>Password</p> 
                <input className='register__input' placeholder='Password' type='password' value ={pass} onChange={(e) => setPass(e.target.value)}></input>
                
                <button type="submit"> Submit </button> 
            </form>
        </section>
    )
}

export default Login;