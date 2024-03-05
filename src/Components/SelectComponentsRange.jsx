import React from 'react';
import { useEffect, useState } from 'react';
import Presupuesto from './Presupuesto';
import Connection from '../data/Connection';
import '../output.css';
function SelectComponentsRange() {
    const [presupuestoTotal, setPresupuestoTotal] = useState(0);
    const [presupuestosPorModelo, setPresupuestosPorModelo] = useState({});
    const [modelos, setModelos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await Connection();
            const modelosFromDatabase = Object.keys(data);
            setModelos(modelosFromDatabase);
        };

        fetchData();
    }, []);


    const handleModeloCambio = (modelo, nuevoPresupuesto) => {
        setPresupuestosPorModelo({
            ...presupuestosPorModelo,
            [modelo]: nuevoPresupuesto,
        });
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

            <Presupuesto
                valorPrincipal={presupuestoTotal}
                modelos={modelos}
                onModeloCambio={handleModeloCambio}
            />

            <h2 className="text-xl font-bold mt-4">Presupuestos por Modelo:</h2>
            <pre className="border border-gray-300 p-2">{JSON.stringify(presupuestosPorModelo, null, 2)}</pre>
        </div>
  );
}

export default SelectComponentsRange;