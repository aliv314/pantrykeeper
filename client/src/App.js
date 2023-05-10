import './App.scss';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './pages/Register/Register';

function App() {
  return (
    <BrowserRouter>
    <header>
      
    </header>
    <main>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element = {<Login></Login>}/>
        <Route path='/register' element = {<Register></Register>}/>
        <Route path='/kitchen'/>
        <Route path='/friend-kitchens'/>
      </Routes>
    </main>
    </BrowserRouter>
  );
}

export default App;
