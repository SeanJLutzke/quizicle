import { useState } from 'react';
import './App.css'
import Homepage from './Homepage';
import Backend from './Backend';

function App() {
  const [outputURL, setOutputURL] = useState('');
  const [userName, setUserName] = useState('');

  return (
    <div>
    <h1>Welcome to Quizicle.</h1>
    <h2>Fill out the form and press Start Quiz.</h2>
    <Homepage setOutputURL={setOutputURL} onSubmit={(data) => { setOutputURL(data.outputURL); setUserName(data.name);}}/>
    {outputURL && <Backend outputURL={outputURL} name={userName}/>}
    </div>
    
  )
}

export default App
