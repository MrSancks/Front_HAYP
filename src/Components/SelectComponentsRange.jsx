// SelectComponentsRange.jsx
import React, { useState, useEffect } from 'react';
import Presupuesto from './Presupuesto';
import Connection from '../data/Connection';
import '../output.css';
import Datos from '../data/Datos';
import IaConnect from './IaConnect';
import TablaCombinaciones from './TablaCombinaciones';

function SelectComponentsRange() {
    const [presupuestoTotal, setPresupuestoTotal] = useState(0);
    const [presupuestosPorModelo, setPresupuestosPorModelo] = useState({});
    const [modelos, setModelos] = useState([]);
    const [selectedModels, setSelectedModels] = useState({});
    const [combinaciones, setCombinaciones] = useState('');


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

    const handleGenerarCombinaciones = async () => {
        const combinaciones = await IaConnect(filteredData, presupuestoTotal);
        setCombinaciones(combinaciones);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <label htmlFor="inputPresupuesto" className="text-2xl font-bold mb-2">Ingrese su Presupuesto:</label>
            <input
                type="number"
                id="inputPresupuesto"
                value={presupuestoTotal}
                onChange={(e) => setPresupuestoTotal(parseInt(e.target.value))}
                className="border border-gray-300"
            />
            <div className="my-6">
                <button onClick={handleGenerarCombinaciones} className="rounded-md bg-white text-sm text-gray-900 shadow-sm ring-1
                                                                        text-lg ring-inset ring-gray-300 p-2 font-bold">Generar combinaciones</button>
            </div>

            

            <div className="flex flex-wrap justify-center">
                {modelos.map((modelo) => (
                    <div key={modelo} className=" items-center mr-4 mb-2">
                        <label className=" items-center">
                            <input
                                type="checkbox"
                                name={modelo}
                                checked={selectedModels[modelo]}
                                onChange={handleCheckboxChange}
                            />
                            <span className="ml-2">{modelo.replace('modelos', ' ').replace('modelo', ' ').slice(0, -1)}</span>
                        </label>
                        {selectedModels[modelo] && (
                            <Presupuesto
                                className="block text-sm text-gray-700 mb-1"
                                valorPrincipal={presupuestoTotal - Object.values(presupuestosPorModelo).reduce((total, presupuesto) => total + presupuesto, 0) + (presupuestosPorModelo[modelo] || 0)}
                                modelo={modelo}
                                onModeloCambio={handleModeloCambio}
                                isSelected={selectedModels[modelo]}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="flex flex-col items-center justify-center h-screen">
                <TablaCombinaciones combinaciones={combinaciones} />
            </div>

            {console.log(filteredData)}
            <Datos
                selectedModels={selectedModels}
                presupuestosPorModelo={presupuestosPorModelo}
            />
            

        </div>
    );
}

export default SelectComponentsRange;
