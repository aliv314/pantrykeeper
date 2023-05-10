import './Register.scss'

const Register = () => {
    return (
        <>
            <h2> SignUp </h2>
            <form>
                <input placeholder='e-Mail'></input>
                <input placeholder='Username'></input>
                <input placeholder='Password'></input>
                <input placeholder='Confirm Password'></input>

                <button type="submit"/>
            </form>
        </>
    )
}

export default Register;