import {BrowserRouter, Routes, Route,Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Home from './pages/Home'
import Navbar from './components/Navbar' 
import Login from './pages/Login'
import SignUp from './pages/Signup'
//import Profile from './pages/Profile'
import Documentation from './pages/Documentation'
import Users from './pages/Users'
import Dashboard from './pages/Dashboard'
import Reports from './pages/Reports'
import UserPage from './pages/UserPage'
import Profile from './pages/Profile'

function App() {
  const{user}=useAuthContext()//will have an object if we re loged in and null if we loged out
  const username = 'azizeltaief'; // Replace 'your-username' with your actual GitHub username
  const repository = 'PFE';
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className='pages'>
        <Routes>
          <Route
            path='/'
            element={user ? <Home/> : <Navigate to="/login"/>}
          />
          <Route 
            path='/login'
            element={!user ? <Login/> : <Navigate to="/userpage"/>}
          />  
          <Route 
            path='/signup'
            element={!user ? <SignUp/> : <Navigate to="/userpage"/>}
          />   
          <Route
              path='/profile'
              element={user ? <Profile/> : <Navigate to="/login"/>}
          />
          <Route 
            path='/documentation'
            element={user ? <Documentation  username={username} repository={repository} /> : <Navigate to="/login"/>}
          />
          <Route 
            path='/dashboard'
            element={user ? <Dashboard/> : <Navigate to="/login"/>}
          />
          <Route 
            path='/users'
            element={user ? <Users/> : <Navigate to="/login"/>}
          />
          <Route 
            path='/reports'
            element={user ? <Reports/> : <Navigate to="/login"/>}
          />
          <Route 
            path='/userpage'
            element={user ? <UserPage/> : <Navigate to="/login"/>}
          />
            
          




        </Routes>
      
      </div> 
      
        
      
      </BrowserRouter>

    </div>

  );
}
/*<h1 className="text-3xl font-bold underline">
    Hello world!
  </h1>*/

export default App;
/*          <Route 
            path='/adminpage'
            element={
              user ? (user.userType === 'admin' ? <AdminPage /> : <Navigate to="/home" />) :(<Navigate to="/" />)}
          
                    <Route 
            path='/documentation'
            element={
              user ?  <Documentation /> : <Navigate to="/login" />}
          />        />
          
                     */