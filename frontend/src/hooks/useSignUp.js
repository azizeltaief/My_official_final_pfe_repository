//lena bch nhotou logic mta3 sending request to the end point of tha api
import {useAuthContext} from './useAuthContext'
import { useState } from 'react'  

export const useSignup = ()=>{
  const [isLoading,setIsLoading] = useState('')
  const [error,setError] = useState('')
  const {dispatch}=useAuthContext()

  const signup = async (email,password,userType)=>{
    setError(null)
    setIsLoading(true)
    const response = await fetch ('api/user/signup',{
      method : 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({email,password,userType})
    })

    const json = await response.json()
    if(!response.ok){
      setError(json.error)
      setIsLoading(false)
    }
    if(response.ok){
      // save the user to local storage
      localStorage.setItem('user',JSON.stringify(json))
      
      // update the auth context
      dispatch({type: 'LOGIN', payload: json})
      setIsLoading(false)


    }

  }
  
  return { signup, isLoading, error }
}