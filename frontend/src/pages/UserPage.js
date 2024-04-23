import React from 'react';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/UserPagecss.css'; // Import the CSS file
import { useAuthContext } from "../hooks/useAuthContext"

//importing images
import image1 from './images/image1.png'
import image2 from './images/image2.png'
import image3 from './images/image3.png'
import image4 from './images/image4.png'
import image5 from './images/image5.png'


const UserPage = () =>{
  const {user} = useAuthContext()
  const [userType, setUserType] = useState('');
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      setUserType(userObj.userType);
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return(
    <>
    <div className="user-container">
      {userType === 'user' && (
        <>
        <div className="user-box">
          <h4 className="text">Documentation</h4>
          <Link to="/documentation">
            <img src={image5} alt="Image 5" className="image" />          
          </Link>
        </div>
        <div className="user-box">
          <h4 className="text">Scripts</h4>
          <Link to="/">
            <img src={image1} alt="Image 1" className="image" />
          </Link>
        </div>
        <div className="user-box">
          <h4 className="text">Reports</h4>
          <Link to="/reports">
            <img src={image2} alt="Image 2" className="image" />
          </Link>
        </div>
        
        </>


      )}
    
      {userType === 'admin' && (
        <>
        <div className="user-container">
          <div className="user-box">
            <h4 className="text">Documentation</h4>
            <Link to="/documentation">
              <img src={image5} alt="Image 5" className="image" />
            </Link>
          </div>
          <div className="user-box">
            <h4 className="text">Scripts</h4>
            <Link to="/">
              <img src={image1} alt="Image 1" className="image" />
            </Link>
          </div>
          <div className="user-box">
            <h4 className="text">Reports</h4>
            <Link to="/reports">
              <img src={image2} alt="Image 2" className="image" />
            </Link>
          </div>
          <div className="user-box">
            <h4 className="text">Users</h4>
            <Link to="/users">
              <img src={image3} alt="Image 3" className="image" />
            </Link>
          </div>
          <div className="user-box">
            <h4 className="text">Dashboard</h4>
            <Link to="/dashboard">
              <img src={image4} alt="Image 4" className="image" />
            </Link>
          </div>
    
        
        </div>
        </>      

      )}


    </div>
    </>
  )

}

export default UserPage