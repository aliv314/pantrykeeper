import './Login.scss'
import validator from 'validator';
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';

import { auth } from '../../firebase';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import BackButton from '../../components/BackButton/BackButton';

const Login = () => {
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const [user, setUser] = useState({});
    const [submitted, setSubmitted] = useState(true);

    const nav = useNavigate();
    const auth = getAuth();
    
    useEffect (()=>{
        onAuthStateChanged(auth, (user) => {
            if (user){
                nav("/")
            }
        })
    }, [auth])

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
                alert("Success! Routing you to home.")
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
        <section className='login'>
            <div className='login__header'>
                <BackButton onClose={() => nav('/')}></BackButton>
                <h2 className='login__title'> Login </h2>
            </div>
            <form className='login__form' onSubmit={onSubmitHandler}>
                <p className='login__label'>Email</p>
                <input className='login__input' placeholder='e-Mail' type='text' value={mail} onChange={(e) => setMail(e.target.value)}></input>
                <p className='login__label'>Password</p> 
                <input className='login__input' placeholder='Password' type='password' value ={pass} onChange={(e) => setPass(e.target.value)}></input>
                
                <button className='login__button' type="submit"> Submit </button> 
            </form>
        </section>
    )
}

export default Login;