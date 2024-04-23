import React from 'react';
import './css/UsersManagement.css'; // Assuming you have a CSS file named UserManagement.css
import user_image1 from './images/user_image1.jpg'
import UserDetails from '../components/UserDetails';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect,useState } from 'react';
import { useUserContext } from '../hooks/useUserContext';
import UserAddForm from '../components/UserAddForm';

const Users = () => {
    /*const [scripts, setScripts] = useState(null) we no longer need it we'll use context*/
    const {users,dispatch} = useUserContext();
    const {user} = useAuthContext()
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
      setShowModal(!showModal);
      console.log(showModal)
    };

    useEffect( ()=>
    {
      const fetchUsers = async ()=>{
        const response = await fetch('/api/user'/*, {
          headers: {'Authorization': `Bearer ${user.token}`},
        }*/)
        const json = await response.json()  //json type's is array of objects each object is a script we use .json() to transform a JSON-formatted array of JavaScript objects to array of Javascript objects      
        if(response.ok){ //if we get the data back successfully
          /*setScripts(json)   //update the state variable script with the fetched data (json). Updating the state triggers a re-render of the component, allowing you to display or work with the fetched data in your React component.
          console.log("ok")*/
          dispatch({type:'SET_USERS', payload:json})

        }
            
      }
      if (user) { //if we have a user we will fetch the scripts if not we will not fetch it
        fetchUsers()

  
      }
    },[  dispatch, user, showModal]) //we want it to be rendered only the first time 
    
    /*const CreateUser = async() => {

      if (!user) {
        setError('You must be logged in')
        return
      }
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ title, load, reps }),
      });
      const json = await response.json()
      if (!response.ok){
        setError(json.error)
        setEmptyFields(json.emptyFields)
      }
      if(response.ok){
        
        setTitle('');
        setLoad('');
        setReps('');
        setError(null)
        setEmptyFields([])
        console.log('new script added',json)    
        dispatch({type: 'CREATE_SCRIPT', payload:json})
      }
      
    }*/

    /*const handleAddClick = () => {
      //setIsClickedSubmit(true);
      //CreateUser();
    };*/



  return (
  <>
    <div className="user-management-container">
      <div className="header">
        <div className="column">Full Name</div>
        <div className="column">Username</div>
        <div className="column">Status</div>
        <div className="column">Role</div>
        <div className="actions">Actions</div>
      </div>
      <div className="user-list">
      {users === null ? ( // Render loading indicator while users are being fetched
        <p></p>
      ) : (users.map((user) => (
          <UserDetails user={user} key={user._id}/>)))
      }
      </div>

    </div>
    <div className="container-add">
      <button className="add-user-button"
      onClick={toggleModal}>Add new user</button>
      {showModal ? (
        <UserAddForm toggleModal={toggleModal}/>

      ) : (
        <div className="modal-hide">
          <div className="modal-show">
            <div className="modal-content">
              <h2>Modal Content</h2>
              <p>This is the content of the modal.</p>
              <button onClick={toggleModal}>Close</button>
            </div>
          </div>
        </div>

      )}
    </div>





  </>
  );

};
export default Users;

/* import React from 'react';
import './UserManagement.css'; // Assuming you have a CSS file named UserManagement.css

const UserManagement = ({ users, handleUpdate, handleDelete }) => {
  return (
    <div className="user-management-container">
      <div className="header">
        <div className="column">Full Name</div>
        <div className="column">Username</div>
        <div className="column">Status</div>
        <div className="column">Role</div>
        <div className="actions">Actions</div>
      </div>
      <div className="user-list">
        {users.map((user) => (
          <div className="user-item" key={user.id}>
            <div className="column">
              <div className="user-info">
                <img src={user.image} alt={user.fullName} />
                <div>{user.fullName}</div>
                <div className="email">{user.email}</div>
              </div>
            </div>
            <div className="column">{user.username}</div>
            <div className="column">{user.status}</div>
            <div className="column">{user.role}</div>
            <div className="actions">
              <button onClick={() => handleUpdate(user.id)}>Update</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
        */

/*  return (
    <div className="user-management-container">
      <div className="header">
        <div className="column">Full Name</div>
        <div className="column">Username</div>
        <div className="column">Status</div>
        <div className="column">Role</div>
        <div className="actions">Actions</div>
      </div>
      <div className="user-list">
        <div className="user-item" >    
          <div className="column">
            <div className="user-info"> 
              <img src={user_image1} alt={user_image1} />             
              <div>fullName1</div>
              <div className="email">email1</div>  
            </div>
          </div>

            <div className="column">username1</div>
            <div className="column">status1</div>
            <div className="column">role1</div>
            <div className="actions">
              <button>Update</button>
              <button>Delete</button>
            </div>
          </div>
        <div className="user-item" >    
          <div className="column">
            <div className="user-info"> 
              <img src={user_image1} alt={user_image1} />             
              <div>fullName1</div>
              <div className="email">email1</div>  
            </div>
          </div>

            <div className="column">username1</div>
            <div className="column">status1</div>
            <div className="column">role1</div>
            <div className="actions">
              <button>Update</button>
              <button>Delete</button>
            </div>
          </div>          
          <div className="user-item" >    
          <div className="column">
            <div className="user-info"> 
              <img src={user_image1} alt={user_image1} />             
              <div>fullName1</div>
              <div className="email">email1</div>  
            </div>
          </div>

            <div className="column">username1</div>
            <div className="column">status1</div>
            <div className="column">role1</div>
            <div className="actions">
              <button>Update</button>
              <button>Delete</button>
            </div>
          </div>
      </div>
    </div>
  );*/