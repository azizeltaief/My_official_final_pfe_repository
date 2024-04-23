//npx create-react-app frontend to create a react app
//this will kickstart the whole react app
//it's the app cmponent that needs to be wrapped by the context provider component ,how?=>we put App component inside our ScriptContextProvider component

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';// Import global styles
//require("react-hot-loader/patch");
import App from './App';
import { ScriptContextProvider } from './context/ScriptContext';
import { AuthContextProvider } from './context/AuthContext';  
import { UserContextProvider } from './context/UserContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ScriptContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>      
      </ScriptContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


