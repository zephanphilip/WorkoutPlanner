import React,{useState} from 'react'
import { useLogin } from '../hooks/useLogin'

function Login() {

    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const{login, isLoading, error} = useLogin()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await login(email, password)
    }

  return (
    <form className='login' onSubmit={handleSubmit}>
        <h3>Login</h3>
        <input type='email' placeholder='Email' 
            onChange={(e) => setEmail(e.target.value)}
            value={email}
        />
        <input type='password' placeholder='Password' 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
        />
        <button disabled={isLoading}>Login</button>
        {error && <div className='error'>{error}</div>}

    </form>
  )
}

export default Login
