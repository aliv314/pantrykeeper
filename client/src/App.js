import './App.scss';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './pages/Register/Register';
import Header from './components/Header/Header';

function App() {
  return (
    <BrowserRouter>
    <header>
      <Header/>
    </header>
    <main>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element = {<Login></Login>}/>
        <Route path='/register' element = {<Register></Register>}/>
        <Route path='/my-kitchen'/>
        <Route path='/friend-kitchens'/>
      </Routes>
    </main>
    </BrowserRouter>
  );
}

export default App;
