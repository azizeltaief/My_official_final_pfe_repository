//to consume the scriptContext and the 2 value of state&dispatch we can use the built-in hook useContext& specify which context we wanna use or 2nd method that we gonna use is to make a custom hook for each context that I have and whenever I want to use that context I invoke my custom hook
//this file is four our hook (useScriptContext),whenever we want to use the data of the script we invoke this component useScriptContext
//all the context stuff will be useful especially when many components will share and update the same state
import { useContext } from "react"
import { ScriptContext } from "../context/ScriptContext"



export const useScriptContext =()=>{
  const context = useContext(ScriptContext) //context will be an object {state,dispatch}

  if(!context){ //the context will have a value only when it's used whithin the tree of the component(the component in our case it's tha app so context will always have value since the app is in the top of the tree) otherwise it'll be null if it's been used outsid that component tree
    throw Error('error context not available for this component')
  }
  return context
}