import {  useState} from 'react'
import { useAuthContext } from './useAuthContext'



export function useSignup() {

    const [error, setError] = useState(null)
    const [isLoading,setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://workoutplanner-zl28.onrender.com/api/user/signup',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password})
            }
        )
        const json = await response.json()

        if (!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok){
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update context
            dispatch({type:'LOGIN', payload: json})

            setIsLoading(false)
        }
 
    }


  return { signup, isLoading, error}
}


