import { useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
import {useLogOut} from '../hooks/useLogOut'
import { useAuthContext } from '../hooks/useAuthContext';


const UserModifyForm = ({ toggleModal1 ,user}) =>{
  const [email,setEmail] = useState(user.email)
  const [password,setPassword] = useState('')
  const [userType,setUsertype] = useState(user.userType)
  const [isClickedSubmit,setIsClickedSubmit] = useState(false)
  const [error,setError] = useState(null)
  const [message,setMessage] = useState(null)
  const [emptyFields,setEmptyFields] = useState([])
  const {dispatch} = useUserContext()
  const {logout}=useLogOut() 
  const { user: connectedUser } = useAuthContext();

  const UpdateUser = async() => {



    if (!user) {
      setError('You must be logged in')
      return
    }
    console.log(email+"*EMAIL*"+user.email)
    console.log(password+"*p*"+user.password)
    console.log(userType+"*t*"+user.userType)
    console.log(user)

    if (email === user.email  && password ===""  && userType === user.userType){
      console.log("No changes")
      setMessage("No changes to update")
      setError(null)
      
      return
    }
    // Set email(the input) to user.email(the actual email before trying the modify process) if the input empty (we are not trying to modify a value)
    const updatedEmail = email === user.email ? user.email : email;
    const updatedPassword = password === '' ? user.password : password;

    console.log(updatedEmail)
    const response = await fetch('/api/user/'+user._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ email:updatedEmail, password:updatedPassword, userType }),
    });
    const json = await response.json()
    if (!response.ok){
      /*setError(json.error)
      setEmptyFields(json.emptyFields)*/
      setError(json.error)
      setMessage(null)
    }
    if(response.ok){
      
      /*setEmail('');
      setPassword('');
      setUsertype('');*/
      setError(null)
      //setEmptyFields([])
      console.log('user modified',json)    
      dispatch({type: 'UPDATE_USER', payload:json})

      if(json.email === connectedUser.email){
        console.log(json)
        console.log(json.email)
        console.log(connectedUser)
        console.log("logout")
        logout()
      }
      toggleModal1();
      
    }
  }


  const handleSubmitClick = () => {
    setIsClickedSubmit(true);
    UpdateUser();
  };


  return(
    <>

      <div className="modal-show">
        <div className="modal-content">      

          <label>email</label>
          <input
            type="text"
            onChange={ (e) => setEmail(e.target.value)}
            value={email}            
            />

          <label>password</label>
          <input
            type="text"
            onChange={ (e) => setPassword(e.target.value)}
            value={password}  
          />

          <label>User type</label>
          <select 
          id="userType"
          onChange={ (e) => setUsertype(e.target.value) }
          value={userType}  >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>



          {error && <div className="error">{error}</div>}   
          {message && <div className="message">{message}</div>}   





          
          
          
          <button 
          className="custom-button"
          type="submit"
          onClick={handleSubmitClick}>
            Submit
          </button>
          


          <button onClick={toggleModal1}>Close</button>
        </div>
      </div>

    
    </>
  );
}

export default UserModifyForm

/*          <label>User type</label>
          <input
            type="text"
            onChange={ (e) => setUsertype(e.target.value)}
            value={userType}
            className={emptyFields.includes('usertype')? 'error' : ''}     
          />*/