import { Link } from "react-router-dom"
import {useLogOut} from '../hooks/useLogOut'
import {useAuthContext} from '../hooks/useAuthContext'
const Navbar = () =>{
  const {logout}=useLogOut() 
  const { user } = useAuthContext()

  const handleClick=()=>{
    logout()
  }
  const handleProfile=()=>{

  }

  return(
    <header>
      <div className="container">
        <Link to='/'>
          <h1>
            Navbar
          </h1>
        </Link>
        <nav>
          {user &&(
          <div> 
            <Link to='/profile'><span >{user.email}</span></Link>
            
            <button onClick={handleClick}>Logout</button>
          </div>
          )}
          {!user &&(
          <div>
            <Link to='/login'>login</Link>
            <Link to='/signup'>signup</Link>
          </div>
          )}

        </nav>



    </div>

    </header>

  )
}

export default Navbar