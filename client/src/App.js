import './App.scss';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Header from './components/Header/Header';
import Pantries from './pages/Pantries/Pantries';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <header>
      <Header/>
    </header>
    <main>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/register' element = {<Register/>}/>

        <Route path='/my-pantry' element={<Pantries/>}/>
        <Route path='/new-pantry'/>
        <Route path='/edit-pantry'/>
        <Route path='/my-pantry/:id'/>
        
        <Route path='/friend-pantry'/>
        <Route path='/friend-pantry/:id'/>

        {/* leftover:id and ingredient:id can also used to edit */}
        <Route path='/new-leftover'/>
        <Route path='/leftover/:id'/>
        <Route path='/new-ingredients'/>
        <Route path='/ingredient/:id'/>
      </Routes>
    </main>
    </BrowserRouter>
  );
}

export default App;
