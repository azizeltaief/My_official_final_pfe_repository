import { useEffect } from "react"
import { useScriptContext } from "../hooks/useScriptContext"
import { useAuthContext } from "../hooks/useAuthContext"
import React from 'react';
//import { GitHubEmbed } from 'react-github-embed';

//components
import ScriptDetails from "../components/ScriptDetails"
import ScriptForm from "../components/ScriptForm"


const Home = () =>{
  /*const [scripts, setScripts] = useState(null) we no longer need it we'll use context*/
  const {scripts,dispatch} = useScriptContext();
  const {user} = useAuthContext()
  useEffect( ()=>
  {
    const fetchScripts = async ()=>{
      const response = await fetch('/api/scripts', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()  //json type's is array of objects each object is a script we use .json() to transform a JSON-formatted array of JavaScript objects to array of Javascript objects      
      if(response.ok){ //if we get the data back successfully
        /*setScripts(json)   //update the state variable script with the fetched data (json). Updating the state triggers a re-render of the component, allowing you to display or work with the fetched data in your React component.
        console.log("ok")*/
        dispatch({type:'SET_SCRIPTS', payload:json})

      }
          
    }
    if (user) { //if we have a user we will fetch the scripts if not we will not fetch it
      fetchScripts()

    }
  },[dispatch, user]) //we want it to be rendered only the first time 


  //only when it's has value(it's updated from null the initial value to setScripts) we wanna map throught Scripts
  return(
    <div className="home">
    {user.userType === 'admin' && (
      <>
      <div className="scripts">
      {scripts && scripts.map(script => (
        <ScriptDetails script={script} key={script._id} />
      ))}
      </div>
      <ScriptForm />
     </>

  



     
     
     
     
     
     )}     
      </div>
  )
}

export default Home