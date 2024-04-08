import './output.css'
import ListaComponentes from './Components/ListaComponentes.jsx';
import SelectComponentsRange from './Components/SelectComponentsRange';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatBot from './Components/Chabot';
import Login from './Components/Login';
import Register from './Components/Register';
import Planes from './Components/Planes';
function App() {
    return (
        <BrowserRouter>
          <Routes>
                <Route exact path="/chat" element=<SelectComponentsRange /> />
                <Route exact path="/componentes" element=<ListaComponentes /> />
                <Route exact path="/" element=<ChatBot /> />
                <Route exact path="/login" element=<Login /> />
                <Route exact path="/register" element=<Register /> />
                <Route exact path="/planes" element=<Planes /> />
          </Routes>
        </BrowserRouter>
            
            
    )
    }

export default App;