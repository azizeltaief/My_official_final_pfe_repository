import { useScriptContext } from "../hooks/useScriptContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'
const ScriptDetails = ({script})=>{
  const {scripts,dispatch} = useScriptContext()
  const { user } = useAuthContext()
  const handleDelete = async() =>{
    if (!user) {
      return
    }

    const response = await fetch('/api/scripts/'+script._id,{
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_SCRIPT', payload: json})
    }
  }


  
    return(
      <div className="script-details">
        <h4>{script.title}</h4>
        <p><strong>Load:</strong>{script.load}</p>
        <p><strong>reps:</strong>{script.reps}</p>
        <p>{formatDistanceToNow(new Date(script.createdAt), {addSuffix: true})}</p>
        <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
      </div>
    );
      



}

export default ScriptDetails