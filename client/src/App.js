import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import Postform from './Postform';
import Edit from './edit';
import './index.css';


function App(){
    const [pass, setPass] = useState({});
    return(
        <Router>
            <Routes>
                <Route exact path='/' element={<Postform setPass={setPass}/>} />
                <Route exact path ='/edit/:id' element={<Edit pass={pass}  />} />
            </Routes>
        </Router>
    )
}

export default App;