import React from 'react'
import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

function Navbar() {

  const { user } = useAuthContext()

  const {logout} = useLogout()
  
  const handleClick = () => {
    logout()
  }
  
  return (
    <header>
        <div className='container'>
            <Link to='/'><h1>WorkoutPlanner</h1></Link>
            <nav>
              {user && (
              <div>
                <span>{user.email}</span>
                <button onClick={handleClick}>Logout</button>
                </div> )}
              {!user &&(<div>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Signup</Link>
              </div>
              )}
            </nav>
        </div>
    </header>
  )
}

export default Navbar
