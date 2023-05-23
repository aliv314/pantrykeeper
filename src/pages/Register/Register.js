import './Register.scss'
import validator from 'validator';
import axios from 'axios';

import { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { backend, auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile, deleteUser } from "firebase/auth";
import BackButton from '../../components/BackButton/BackButton';

const Register = () => {
    const [mail, setMail] = useState("");
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [confirm, setConfirm] = useState("");

    //Validation/Error Handling
    const [serverError, setServerError] = useState("")
    const [userError, setUserError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    
    const nav = useNavigate();

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        //Missing input fields.
        if (!mail || !user || !pass || !confirm){
            console.log("Missing required fields.");
            return;
        }
        //Passwords don't match.
        if(!validator.equals(pass, confirm)){
            console.log("Mismatching passwords");
            return
        }  
        //If it's not a valid email address.
        if(!validator.isEmail(mail)){
            console.log("Invalid Email");
            return
        }
        
        try{
            //Create the user. (Firebase)
            //Attempt to create user in db (Backend)
            //If user is not created, delete user (Auth)
            //Flash error (Front end)
            createUserWithEmailAndPassword(auth, mail, pass)
            .then((userCredential) => {
                const userObj = userCredential.user;
                const postReq = {
                    userId: userObj.uid,
                    friendCode: String(userObj.uid).substring(0, 7),
                }

                axios.post(` ${backend}/api/users`, postReq)
                .then(res => {
                    updateProfile( userObj, {
                        displayName: user
                    }).then(() => {
                        alert("Success! Routing you back to Home.")
                        console.log("Profile updated!")
                        nav('/')
                    }).catch(() => {
                        console.log("Profile failed to update!")
                    })
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                    deleteUser(userObj)
                    .then(() =>{
                        console.log("Error creating user in the database. Deleting.")
                    }).catch((error) => {
                        console.log(error);
                    })
                })                
            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
            }); 
        }catch (error){}  
    }

    return (
        <section className='register'>
            <div className='register__header'>
                <BackButton onClose={() => nav('/')}></BackButton>
                <h2 className='register__title'> SignUp </h2>
            </div>
            <form className='register__form' onSubmit={onSubmitHandler}>
                <p className='register__label'>Email</p>
                <input className='register__input' placeholder='e-Mail' type='text' value={mail} onChange={(e) => setMail(e.target.value)}></input>
                <p className='register__label'>Username</p>
                <input className='register__input' placeholder='Username' type='text' value ={user} onChange={(e) => setUser(e.target.value)}></input>
                <p className='register__label'>Password</p> 
                <input className='register__input' placeholder='Password' type='password' value ={pass} onChange={(e) => setPass(e.target.value)}></input>
                <p className='register__label'>Confirm Password</p>
                <input className='register__input' placeholder='Confirm Password' type='password' value ={confirm} onChange={(e) => setConfirm(e.target.value)}></input>

                <button className='register__button' type="submit"> Submit </button> 
            </form>
        </section>
    )
}

export default Register;