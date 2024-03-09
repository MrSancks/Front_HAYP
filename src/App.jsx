import './output.css'
import Datos from './data/datos.jsx';
import SelectComponentsRange from './Components/SelectComponentsRange';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
    return (
        <BrowserRouter>
          <Routes>
                <Route exact path="/" element=<SelectComponentsRange /> />
                <Route exact path="/componentes" element=<Datos /> />
            {/* Agrega más rutas según sea necesario */}
          </Routes>
        </BrowserRouter>
            
            
    )
    }

export default App;