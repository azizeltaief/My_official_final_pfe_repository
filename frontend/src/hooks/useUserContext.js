import { useContext } from "react"
import { UserContext } from "../context/UserContext"



export const useUserContext =()=>{
  const context = useContext(UserContext) //context will be an object {state,dispatch}

  if(!context){ //the context will have a value only when it's used whithin the tree of the component(the component in our case it's tha app so context will always have value since the app is in the top of the tree) otherwise it'll be null if it's been used outsid that component tree
    throw Error('error context not available for this component')
  }
  return context
}