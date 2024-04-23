import { useState } from "react";
import { useScriptContext } from "../hooks/useScriptContext";
import { useAuthContext } from '../hooks/useAuthContext'


const ScriptForm = () =>{
  const [title,setTitle] = useState('')
  const [load,setLoad] = useState(null)
  const [reps,setReps] = useState(null)
  const [id,setId] = useState('')
  const [isClickedSubmit,setIsClickedSubmit] = useState(false)
  const [isClickedDelete,setIsClickedDelete] = useState(false)
  const [error,setError] = useState(null)
  const [emptyFields,setEmptyFields] = useState([])
  const {dispatch} = useScriptContext()
  const {user} = useAuthContext()

  const CreateForm = async() => {

    if (!user) {
      setError('You must be logged in')
      return
    }
    const response = await fetch('/api/scripts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
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
    
  }

  const DeleteForm = async (id) => {
    try {
      const response = await fetch(`/api/scripts/${id}`, {
        method: 'DELETE',
      });
      const json = await response.json()
      if (response.ok) {
        console.log('Script deleted successfully',json);
        //update state or perform any other action after successful deletion
        setId('')
        setError(null)   
        dispatch({type: 'DELETE_SCRIPT', payload:json})
    } else {
      console.error('Failed to delete script');
    }
    } catch (error) {
      console.error('Error deleting script:', error);
    }
  };




  const handleSubmitClick = () => {
    setIsClickedSubmit(true);
    CreateForm();
  };
  const handleDeleteClick = (id) => {
    setIsClickedDelete(true);
    DeleteForm(id);
  };
  return(
    <>
    {user.userType === "admin" && (
      <from>
      <h3>Form</h3>
      <label>Title</label>
      <input
        type="text"
        onChange={ (e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title')? 'error' : ''}     
      />

      <label>Load</label>
      <input
        type="number"
        onChange={ (e) => setLoad(e.target.value)}
        value={load}  
        className={emptyFields.includes('load')? 'error' : ''}    
      />

      <label>Reps</label>
      <input
        type="number"
        onChange={ (e) => setReps(e.target.value)}
        value={reps}  
        className={emptyFields.includes('reps')? 'error' : ''}    
      />



      <button 
      className="custom-button"
      type="submit"
      onClick={handleSubmitClick}>
        Add script
      </button>
      {error && <div className="error">{error}</div>}
      
      <input
        type="text"
        maxLength={25}
        onChange={ (e) => setId(e.target.value)}
        value={id}     
      />
      <button
      className="custom-button"
      type="delete"
      onClick={() => handleDeleteClick(id)}> 
      Delete script   
      </button>
      
    </from>    




    )}
    </>
  );
}

export default ScriptForm