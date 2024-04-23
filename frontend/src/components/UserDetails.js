import { useUserContext } from "../hooks/useUserContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from "react"
import UserModifyForm from "./UserModifyModel"
import {useLogOut} from '../hooks/useLogOut'


const UserDetails = ({user})=>{
  const {users,dispatch} = useUserContext()
  const {logout}=useLogOut() 
  const {user: connectedUser}=useAuthContext()
  //const { user } = useAuthContext()
  const [showModal, setShowModal] = useState(false);
  const toggleModal1 = () => {
    setShowModal(!showModal);
  };

  const handleDelete = async() =>{
    if (!user) {
      return
    }

    const response = await fetch('/api/user/'+user._id,{
      method: 'DELETE',
      /*headers: {
        'Authorization': `Bearer ${user.token}`
      }*/
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_USER', payload: json})
    }
    if(json.email === connectedUser.email){
      console.log(json)
      console.log(json.email)
      console.log(connectedUser)
      console.log("logout")
      logout()
    }

  }

  /*const handleUpdate = async () => {
    if (!user) {
      return;
    }
  
    const updatedUserData = {
      email: 'newEmai45l@gmail.com', // Update with the new email
      password: 'newPassword', // Update with the new password
       // Update with the new userType
    }
  
    const response = await fetch('/api/user/'+user._id,{
      method: 'PATCH', // Use PATCH method for updating data
      headers: {
        'Content-Type': 'application/json', // Specify JSON content type
        // 'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(updatedUserData), // Convert data to JSON string
    })
  
    const json = await response.json();
  
    if (response.ok) {
      dispatch({ type: 'UPDATE_USER', payload: json }); // Assuming you have an action for updating user data
    }
  };
*/



  
    return(
      <div className="user-item" /*key={user.id}*/>
            <div className="column">
              <div className="user-info">
                <img src={user.image} alt={user.fullName} />
                <div>{user.fullName}</div>
                <div className="email">{user.email}</div>
              </div>
            </div>
            <div className="column">{user.username}</div>
            <div className="column">{user.status}</div>
            <div className="column">{user.userType}</div>
            <div className="actions">
              <button onClick={toggleModal1}>Update</button>
              <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
            </div>
            {showModal ? (
            <UserModifyForm toggleModal1={toggleModal1} user={user}/>
            ) : (
              <div className="modal-hide">
                <div className="modal-show">
                  <div className="modal-content">
                    <h2>Modal Content</h2>
                    <p>This is the content of the modal.</p>
                    <button onClick={toggleModal1}>Close</button>
                  </div>
                </div>
              </div>

  )}

          </div>




    );
      



}

export default UserDetails




