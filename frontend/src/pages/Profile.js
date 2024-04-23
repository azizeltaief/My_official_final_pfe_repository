import React, { useEffect, useRef, useState } from 'react';
import image1 from './images/image1.png'
import { useAuthContext } from "../hooks/useAuthContext"
import { useUserContext } from "../hooks/useUserContext";
import './css/Profile.css'
import {useLogOut} from '../hooks/useLogOut'


const Profile = () => {

  /*Upload logic*/
  const fileInputRef = useRef(null);
  const handleUploadClick = () => {
    fileInputRef.current.click(); // Programmatically trigger file input click
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Handle the file upload logic here, such as displaying the uploaded image
    console.log('Uploaded file:', file);
  };
  /*Upload logic*/
  const {user} = useAuthContext()
  console.log("useeer"+user.email)
  const {users} = useUserContext();
  const [email,setEmail] = useState(user.email)
  const [password,setPassword] = useState('')
  const [userType,setUsertype] = useState(user.userType)
  const [isClickedSubmit,setIsClickedSubmit] = useState(false)
  const [error,setError] = useState(null)
  const [message,setMessage] = useState(null)
  const [emptyFields,setEmptyFields] = useState([])
  const {dispatch} = useUserContext()
  const [specificUser, setSpecificUser] = useState(null); // State for specific user
  const {logout}=useLogOut() 

  useEffect( ()=>
  {
    const fetchUsers = async ()=>{
      const response = await fetch(`/api/user/${user._id}`/*, {
        headers: {'Authorization': `Bearer ${user.token}`},
      }*/)
      const json = await response.json()  //json type's is array of objects each object is a script we use .json() to transform a JSON-formatted array of JavaScript objects to array of Javascript objects      
      if(response.ok){ //if we get the data back successfully
        /*setScripts(json)   //update the state variable script with the fetched data (json). Updating the state triggers a re-render of the component, allowing you to display or work with the fetched data in your React component.
        console.log("ok")*/
        //dispatch({type:'SET_USERS', payload:json})
        console.log(json)
        console.log(user)
        setSpecificUser(json)
        /*const foundUser = users.find(u => u.email === user.email);
        setSpecificUser(foundUser); // Update specificUser state*/
      }
          
    }
    if (user) { //if we have a user we will fetch the scripts if not we will not fetch it
      console.log("user fetch"+user)
      fetchUsers()
      
    }
    console.log("jkvosnjvod")
  }, [user])
  
  
  
  console.log("Users"+users)
  console.log("User"+user)
  console.log('Specific User:', specificUser);

  




  //useEffect(()=>{
    const UpdateUser = async() => {

console.log(user)
      if (!user) {
        setError('You must be logged in')
        return
      }
      //console.log(User)
      //console.log(user)
      /*console.log(email+"*EMAIL*"+specificUser.email)
      console.log(password+"*p*"+specificUser.password)
      console.log(userType+"*t*"+specificUser.userType)*/
  
      if (email === specificUser.email  && password ===""  && userType === specificUser.userType){
        console.log("No changes")
        setMessage("No changes to update")
        
        return
      }
      // Set email(the input) to user.email(the actual email before trying the modify process) if the input empty (we are not trying to modify a value)
      const updatedEmail = email === specificUser.email ? specificUser.email : email;
      const updatedPassword = password === '' ? specificUser.password : password;
  
      console.log(updatedEmail)
      console.log(updatedPassword)
  

      
      const response = await fetch('/api/user/'+specificUser._id, {
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
      }
      if(response.ok){

        /*setEmail('');
        setPassword('');
        setUsertype('');*/
        setError(null)
        //setEmptyFields([])

        console.log('user modified',json)  

        dispatch({type: 'UPDATE_USER', payload:json})
        /*console.log("specificUser"+specificUser)
        console.log("user"+user)
        console.log(json)*/
        console.log("no")
        logout()
        console.log("yes")
      }
    }
      
  //},[  dispatch ])



  const handleSubmitClick = () => {
    setIsClickedSubmit(true);
    UpdateUser();
  };





  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-image">
          <img src={image1} alt="Profile" />
        </div>

        {/* Hidden file input */  }
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {/* Upload button with label */ }
        <label className="upload-button" onClick={handleUploadClick}>
          Upload Image
        </label>

        <div className="input-group">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <div className="input-group">
          <input type="email" placeholder="Email" onChange={ (e) => setEmail(e.target.value)} value={email} />
          <input type="text" placeholder="Password" onChange={ (e) => setPassword(e.target.value)} value={password} />
        </div>

        <select 
          id="userType"
          onChange={ (e) => setUsertype(e.target.value) }
          value={userType}  >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>



        {error && <div className="error">{error}</div>}   
        {message && <div className="message">{message}</div>} 


        <button className="save-button" type="submit" onClick={handleSubmitClick} >Save Profile</button>
      </div>
    </div>
  );
}

export default Profile; 