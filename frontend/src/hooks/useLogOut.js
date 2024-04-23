import {useAuthContext} from './useAuthContext'
import { useScriptContext } from './useScriptContext'
//tuto17:we should clear our global script state in the react application before loged out so that when we login again we don't see the previous cripts in home for 1 sec and it changes to the right scripts, it shows directly the right scripts
export const useLogOut=()=>{
  const {dispatch}=useAuthContext()
  const {dispatch : scriptsDispatch} = useScriptContext()
  const logout=()=>{
    localStorage.removeItem('user')
    dispatch({type: 'LOGOUT'})
    scriptsDispatch({type:'SET_SCRIPTS',payload:null})

  }
return {logout}
}