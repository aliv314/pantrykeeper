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
        <Route path='/friend-pantry'/>

        {/* leftover:id and ingredient:id can also used to edit */}
        <Route path='/leftovers'/>
        <Route path='/ingredients'/>
      </Routes>
    </main>
    </BrowserRouter>
  );
}

export default App;
