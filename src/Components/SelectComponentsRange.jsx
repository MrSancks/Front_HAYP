// SelectComponentsRange.jsx
import React, { useState, useEffect } from 'react';
import Presupuesto from './Presupuesto';
import Connection from '../data/Connection';
import '../output.css';
import Datos from '../data/Datos';
import IaConnect from './IaConnect';

function SelectComponentsRange() {
    const [presupuestoTotal, setPresupuestoTotal] = useState(0);
    const [presupuestosPorModelo, setPresupuestosPorModelo] = useState({});
    const [modelos, setModelos] = useState([]);
    const [selectedModels, setSelectedModels] = useState({});
    const [combinaciones, setCombinaciones] = useState(''); // Nuevo estado para las combinaciones


    const [data, setData] = useState({});
    const [filteredData, setFilteredData] = useState({});

    useEffect(() => {
        const fetchComponents = async () => {
            const fetchedData = await Connection();
            setData(fetchedData);
        }
        fetchComponents();
    }, []);

    useEffect(() => {
        const filtered = {};
        Object.entries(selectedModels).forEach(([modelo, isSelected]) => {
            if (isSelected) {
                filtered[modelo] = data[modelo]?.filter(component => component.precio <= presupuestosPorModelo[modelo]);
            }
        });
        setFilteredData(filtered);
    }, [selectedModels, data, presupuestosPorModelo]);



    useEffect(() => {
        const fetchData = async () => {
            const data = await Connection();
            const modelosFromDatabase = Object.keys(data);
            setModelos(modelosFromDatabase);
            setSelectedModels(modelosFromDatabase.reduce((obj, modelo) => ({ ...obj, [modelo]: false }), {}));
        };

        fetchData();
    }, []);
    
    const handleModeloCambio = (modelo, nuevoPresupuesto) => {
        const nuevoPresupuestoTotalSeleccionado = Object.values({ ...presupuestosPorModelo, [modelo]: nuevoPresupuesto }).reduce((total, presupuesto) => total + presupuesto, 0);

        if (nuevoPresupuestoTotalSeleccionado <= presupuestoTotal) {
            setPresupuestosPorModelo({
                ...presupuestosPorModelo,
                [modelo]: nuevoPresupuesto,
            });
        }
    };

    const handleCheckboxChange = (event) => {
        setSelectedModels({
            ...selectedModels,
            [event.target.name]: event.target.checked,
        });
    };

    const handleGenerarCombinaciones = async () => { // Nueva función para generar las combinaciones
        const combinaciones = await IaConnect(filteredData, presupuestoTotal);
        setCombinaciones(combinaciones);
    };

    return (
        <div className="flex flex-col items-center">
            <label htmlFor="inputPresupuesto">Ingrese su presupuesto:</label>
            <input
                type="number"
                id="inputPresupuesto"
                value={presupuestoTotal}
                onChange={(e) => setPresupuestoTotal(parseInt(e.target.value))}
                className="border border-gray-300"
            />
            <button onClick={handleGenerarCombinaciones}>Generar combinaciones</button> {/* Botón para generar las combinaciones */}
            <p>
                <pre>{combinaciones}</pre>
            </p>
            
            {modelos.map((modelo) => (
                <div key={modelo}>
                    <label>
                        <input
                            type="checkbox"
                            name={modelo}
                            checked={selectedModels[modelo]}
                            onChange={handleCheckboxChange}
                        />
                        {modelo.replace('modelos', ' ').replace('modelo',' ').slice(0, -1)}
                    </label>
                    {selectedModels[modelo] && (
                        <Presupuesto
                            valorPrincipal={presupuestoTotal - Object.values(presupuestosPorModelo).reduce((total, presupuesto) => total + presupuesto, 0) + (presupuestosPorModelo[modelo] || 0)}
                            modelo={modelo}
                            onModeloCambio={handleModeloCambio}
                            isSelected={selectedModels[modelo]}
                        />
                    )}
                </div>
            ))}
            {console.log(filteredData)}
            <Datos
                selectedModels={selectedModels}
                presupuestosPorModelo={presupuestosPorModelo}
            />
            
        </div>
    );
}

export default SelectComponentsRange;
