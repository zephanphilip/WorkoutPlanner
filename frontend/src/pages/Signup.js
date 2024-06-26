import React,{useState} from 'react'
import {useSignup} from '../hooks/useSignup'

function Signup() {

    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await signup(email, password)
    }

  return (
    <form className='signup' onSubmit={handleSubmit}>
        <h3>Signup</h3>
        <input type='email' placeholder='Email' 
            onChange={(e) => setEmail(e.target.value)}
            value={email}
        />
        <input type='password' placeholder='Password' 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
        />
        <button >Signup</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Signup
