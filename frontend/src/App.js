import './App.css';
import React,{} from 'react';
import { UserContextProvider } from './UserContext';
import Routes from './Routes';

function App() {
  
  return (
    <div className="App">
      <UserContextProvider>
       <Routes/>
      </UserContextProvider>
    </div>
  );
}

export default App;
