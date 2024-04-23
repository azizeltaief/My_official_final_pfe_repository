
//in this file we gonna make a context and a context provider component
import { createContext, useReducer } from "react"; //import this fct that let us create a context

export const UserContext = createContext() //create a context and store it in this variable,this create us a context and then we export it to use it

export const userReducer = (state,action) =>{  //2arguments,state:theprevios satet before we made the change,action that has type and payload properties of the object passed as an argument to the dispatch fct

  switch(action.type){
    //this is all with the local state we aren't interacting with the db just to made the local state insync with the db
    case 'SET_USERS': //in each case we wanna return the new value of the state.
      return { 
        users: action.payload   //WE WILL RETURN AN OBJECT THAT HAS A SCRIPT PROPERTY,because in this case the payload property of the action that we pass into the dispatch fct gonna be an array of all the scripts.
      }
    case 'CREATE_USER':
      return {
        users : [action.payload, ...state.users] //WE WILL RETURN A NEW ARRAY,...state.scripts will be an array of the preexisting scripts + action.payload which is the new added(to the top) script =>the final array
      }
    case 'DELETE_USER':
      return{
        users: state.users.filter(user => user._id !== action.payload._id)
      }
    case 'UPDATE_USER':
      return {
        users: state.users.map((user) =>
          user._id === action.payload._id ? { ...user, ...action.payload } : user //In the UPDATE_USER case, we use map to iterate over the users array. If we find a user with the same _id as the updated user (action.payload._id), we merge the existing user object with the new data from action.payload.
        )
      }
    /*case 'SET_USER':
        return {
          user: action.payload,
        };*/
    default:
      return state
      
  }
}



export const UserContextProvider = ({children}) =>{

  const [state,dispatch] = useReducer(userReducer,{
    users:null
  })

 

  return(
    <UserContext.Provider value={{...state,dispatch}}>  
        {children}   
    </UserContext.Provider>
  
  )
}