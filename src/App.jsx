import './output.css'
import ListaComponentes from './Components/ListaComponentes.jsx';
import SelectComponentsRange from './Components/SelectComponentsRange';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatBot from './Components/Chabot';
function App() {
    return (
        <BrowserRouter>
          <Routes>
                <Route exact path="/" element=<SelectComponentsRange /> />
                <Route exact path="/componentes" element=<ListaComponentes /> />
                <Route exact path="/chat" element=<ChatBot /> />
            {/* Agrega más rutas según sea necesario */}
          </Routes>
        </BrowserRouter>
            
            
    )
    }

export default App;