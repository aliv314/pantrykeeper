import { useState } from 'react'
import './Register.scss'

const Register = () => {
    const [mail, setMail] = useState("");
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [confirm, setConfirm] = useState("");

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        console.log(mail)
        console.log(user)
        console.log(pass)
        console.log(confirm)
    }

    return (
        <section className='register'>
            <h2 className='register__title'> SignUp </h2>
            <form className='register__form' onSubmit={onSubmitHandler}>
                <p className='register__label'>Email</p>
                <input className='register__input' placeholder='e-Mail' type='text' value={mail} onChange={(e) => setMail(e.target.value)}></input>
                <p className='register__label'>Username</p>
                <input className='register__input' placeholder='Username' type='text' value ={user} onChange={(e) => setUser(e.target.value)}></input>
                <p className='register__label'>Password</p> 
                <input className='register__input' placeholder='Password' type='password' value ={pass} onChange={(e) => setPass(e.target.value)}></input>
                <p className='register__label'>Confirm Password</p>
                <input className='register__input' placeholder='Confirm Password' type='password' value ={confirm} onChange={(e) => setConfirm(e.target.value)}></input>

                <button type="submit"> Submit </button> 
            </form>
        </section>
    )
}

export default Register;