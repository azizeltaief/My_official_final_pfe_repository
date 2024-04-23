import { useState } from "react"
import { useSignup } from "../hooks/useSignUp"

const Signup=()=>{
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [userType,setUserType]=useState('user')
  const {signup,error,isLoading} = useSignup()
  
  const handleSubmit =async (e)=>{
    e.preventDefault()
    //console.log(email,password)
    await signup(email,password,userType)
  }
  return(
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up:</h3>
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

      <select 
      id="userType"
      onChange={(e) => setUserType(e.target.value)}
      value={userType}  >
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>

      <button disabled={isLoading} >Submit</button>
      {error && <div className="error">{error}</div>}
      
    </form>
  )
}

export default Signup