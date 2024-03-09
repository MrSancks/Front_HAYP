import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Connection } from './Connection.jsx'
import '../output.css';

const Datos = ({ selectedModels, presupuestosPorModelo }) => {
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

    return (
        <div className="p-4">
            {Object.entries(filteredData).map(([modelo, components]) => (
                <div key={modelo} className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Componentes</h2>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border border-gray-300">Nombre</th>
                                <th className="py-2 px-4 border border-gray-300">Descripción</th>
                                <th className="py-2 px-4 border border-gray-300">Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {components?.map((component, id) => (
                                <tr key={id}>
                                    <td className="py-2 px-4 border border-gray-300">{component.nombre}</td>
                                    <td className="py-2 px-4 border border-gray-300">{component.descripcion}</td>
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
