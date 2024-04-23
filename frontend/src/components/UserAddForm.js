import { useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useAuthContext } from '../hooks/useAuthContext'


const UserAddForm = ({ toggleModal }) =>{
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [userType,setUsertype] = useState('user')
  const [isClickedSubmit,setIsClickedSubmit] = useState(false)
  const [error,setError] = useState(null)
  const [emptyFields,setEmptyFields] = useState([])
  const {dispatch} = useUserContext()
  const {user} = useAuthContext()



  const SaveUser = async() => {
    console.log(emptyFields)

    if (!user) {
      setError('You must be logged in')
      return
    }
        // Set email(the input) to user.email(the actual email before trying the modify process) if the input empty (we are not trying to modify a value)
        //const updatedEmail = email === '' ? user.email : email;

      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ email, password, userType }),
      });


    const json = await response.json()
    console.log(json)
    if (!response.ok){
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if(response.ok){
      
      setEmail('');
      setPassword('');
      setUsertype('');
      setError(null)
      setEmptyFields([])
      console.log('new user added',json)    
      dispatch({type: 'CREATE_USER', payload:json})
      toggleModal();

    }
    
  }




  const handleSubmitClick = () => {
    setIsClickedSubmit(true);
    SaveUser();
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
            className={emptyFields.includes('email')? 'error' : ''}    
          />

          <input
          type="password"
          onChange={ (e) => setPassword(e.target.value)}
          value={password}  
          className={emptyFields.includes('password')? 'error' : ''}    
          />

          
        








          



          
                          
          <select 
          id="userType"
          onChange={ (e) => setUsertype(e.target.value) }
          value={userType}  >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>

          {error && <div className="error">{error}</div>}   
          <button 
          className="custom-button"
          type="submit"
          onClick={handleSubmitClick}>
            Submit
          </button>
          


          <button onClick={toggleModal}>Close</button>
        </div>
      </div>










      




    
    </>
  );
}

export default UserAddForm;

