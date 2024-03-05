import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Connection } from './Connection.jsx'
import '../output.css';

const Datos = () => {
    const [data, setData] = useState({});
    const [selectedModels, setSelectedModels] = useState([]);

    useEffect(() => {
        const fetchComponents = async () => {
            const data = await Connection();
            setData(data);
        }
        fetchComponents();
    }, []);

    const handleChange = (event) => {
        setSelectedModels(Array.from(event.target.selectedOptions, option => option.value));
        console.log(selectedModels);
    }

    return (
        <div className="p-4">
            <select multiple={true} value={selectedModels} onChange={handleChange}
                className="w-full h-fit p-3 border border-gray-300 rounded-md overflow-y-auto" aria-label="Modelos de componentes de PC">
                <option value="modeloCpus">Cpu</option>
                <option value="modeloGpus">Gpu</option>
                <option value="modeloCases">Cases</option>
                <option value="modeloCoolers">Coolers</option>
                <option value="modeloMonitors">Monitores</option>
                <option value="modeloPlacas">Placas</option>
                <option value="modeloPsus">Psu's</option>
                <option value="modelosSsds">Discos</option>
            </select>

            {selectedModels.map(model => (
                <div key={model} className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Componentes</h2>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border border-gray-300">Nombre</th>
                                <th className="py-2 px-4 border border-gray-300">Descripción</th>
                                <th className="py-2 px-4 border border-gray-300">Imagen</th>
                                <th className="py-2 px-4 border border-gray-300">Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data[model]?.map((component, id) => (
                                <tr key={id}>
                                    <td className="py-2 px-4 border border-gray-300">{component.nombre}</td>
                                    <td className="py-2 px-4 border border-gray-300">{component.descripcion}</td>
                                    <td className="py-2 px-4 border border-gray-300">{component.image}</td>
                                    <td className="py-2 px-4 border border-gray-300">{component.precio}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default Datos;
