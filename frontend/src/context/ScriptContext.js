//we want when add a script it will be added instantly whithout the need to refresh the page
//there're 2 methodes to do that ,one of them is context(update the state locally whenever we successfully add a new script)
//Context in React allows you to share data across the component tree without explicitly passing props through each level of the tree. Context provides a way to pass data down to components at any level of the tree without using props manually.
//react context is a way to provide kind of global state to many different components in the app instead of pasing it in as props and we can update that state by dispatching actions from those components, using contexte provider we can update it directly from any component 
//in this file we gonna make a context and a context provider component
import { createContext, useReducer } from "react"; //import this fct that let us create a context

export const ScriptContext = createContext() //create a context and store it in this variable,this create us a context and then we export it to use it

export const scriptReducer = (state,action) =>{  //2arguments,state:theprevios satet before we made the change,action that has type and payload properties of the object passed as an argument to the dispatch fct

  switch(action.type){
    //this is all with the local state we aren't interacting with the db just to made the local state insync with the db
    case 'SET_SCRIPTS': //in each case we wanna return the new value of the state.
      return { 
        scripts: action.payload   //WE WILL RETURN AN OBJECT THAT HAS A SCRIPT PROPERTY,because in this case the payload property of the action that we pass into the dispatch fct gonna be an array of all the scripts.
      }
    case 'CREATE_SCRIPT':
      return {
        scripts : [action.payload, ...state.scripts] //WE WILL RETURN A NEW ARRAY,...state.scripts will be an array of the preexisting scripts + action.payload which is the new added(to the top) script =>the final array
      }
    case 'DELETE_SCRIPT':
      return{
        scripts: state.scripts.filter(script => script._id !== action.payload._id)
      }
    default:
      return state
      
  }
}


//provide that context to our app component tree so that our comoponents can access it=>to do that we make a context provider component(a regular react component that will wrap the rest of our app), we export this functional component
//destructure the children property from the props in this ScriptContextProvider,the children property represents whatever components or template the ScriptContextProvider wraps in our case it's the App
export const ScriptContextProvider = ({children}) =>{
  //we need to return a template
  //scriptReducer:a reducer fct name, initial value of the state whitch is an object{script:null} in this case, dispatch;to update the state value
  const [state,dispatch] = useReducer(scriptReducer,{
    scripts:null
  })

  //when we want to update the state we use the dispatch fct
  //dispatch({type: 'SET_SCRIPTS',payload: [{},{},{}]}) //type: it describes the state change, payload any data we need to make this change (array of scripts objects in this case), the object inside the dispatch is called action
  //when we invoke the dispatch fct it invokes the scriptReducer fct and passes the action into it that will change the state using the type and data in the payload

  return(
    //this is a component given by the ScriptContext that we created, this will wrap whenever parts of our app needs access to the context(in our case we'll wrap the whole app the whole component tree so every component has access to this context(we will wrap the root app component at the top of the component tree))
    //When you wrap components in a context provider, you make the context and its associated data available to all components within the provider's scope. This means that any component nested within the provider can access the context data without having to pass props down manually through intermediate components.
    //Wrapping in context is commonly used for managing global state, theme settings, user authentication status, or any other data that needs to be accessible across multiple components in the application.
    //outputting the root app component using {children inside <ScriptContext.Provider> }
    //we add the value prop so that the provider provide some data ,it's value will be available to our components,it's better that it's value be dynamic not hard coded, we can use usestate but we gonna use useReducer
    //we use ...state to spreading the different properties inside the value object {...state,dispatch}
    <ScriptContext.Provider value={{...state,dispatch}}>  
        {children}   
    </ScriptContext.Provider>
  
  )
}