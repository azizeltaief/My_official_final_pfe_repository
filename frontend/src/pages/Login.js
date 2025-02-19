import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
//import '../reset.css'
import '../index.css'
const Login=()=>{
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const { login, isLoading, error }= useLogin()
  
  const handleSubmit =async(e)=>{
    e.preventDefault()
    //console.log(email,password)
    await login(email,password)

 
  }
  return(
    <form className="login" onSubmit={handleSubmit}>
      <h3 className="h3style">Log in:</h3>
      <label>Email:</label>
      <input
      type="email"
      onChange={(e)=>(setEmail(e.target.value))}
      value={email}
      />
      
      <label>Password:</label>
      <input
      type="password"
      onChange={(e)=>(setPassword(e.target.value))}
      value={password}
      />

      <button disabled={isLoading} >Submit</button>
      {error && <div className="error">{error}</div>}
      
    </form>
  )
}

export default Login