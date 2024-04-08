import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Connection } from '../data/Connection.jsx';
import '../output.css';
import Header from './Header';

function ListaComponentes() {
    const [data, setData] = useState({});
    const [selectedModels, setSelectedModels] = useState([]);
    const [componenteImages, setComponenteImages] = useState({});
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchComponents = async () => {
            const data = await Connection();
            setData(data);
        }
        fetchComponents();
    }, []);
    const handleChange = (event) => {
        setSelectedModels(Array.from(event.target.selectedOptions, option => option.value));
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    return (
        <div className="flex flex-col h-screen items-center">
            <Header />
            <select value={selectedModels} onChange={handleChange} className="w-1/2 p-3 border border-gray-300 rounded-md m-3">
                <option value="">Selecciona un modelo</option>
                <option value="modeloCpus">Cpu</option>
                <option value="modeloGpus">Gpu</option>
                <option value="modeloCases">Cases</option>
                <option value="modeloCoolers">Coolers</option>
                <option value="modeloMonitors">Monitores</option>
                <option value="modeloPlacas">Placas</option>
                <option value="modeloPsus">Psu's</option>
                <option value="modeloSsds">Discos</option>
            </select>

            {selectedModels.map(model => (
                <div key={model} className="mt-4 mx-4">
                    <h2 className="text-xl font-bold mb-2">Componentes</h2>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border border-gray-300">Nombre</th>
                                <th className="py-2 px-4 border border-gray-300">Descripcion</th>
                                <th className="py-2 px-4 border border-gray-300">Precio</th>
                                <th className="py-2 px-4 border border-gray-300">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data[model]?.slice(currentPage * 10, (currentPage + 1) * 10).map((component, idx) => (
                                <tr key={idx}>
                                    <td className="py-2 px-4 border border-gray-300">{component.nombre}</td>
                                    <td className="py-2 px-4 border border-gray-300">{component.descripcion}</td>
                                    <td className="py-2 px-4 border border-gray-300">{component.precio}</td>
                                    <td className="py-2 px-4 border border-gray-300">
                                        <a href={`https://www.amazon.com/s?k=` + [component.nombre]} target="_blank" rel="noopener noreferrer">
                                            {component.nombre}
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between mt-4">
                        <button onClick={prevPage} disabled={currentPage === 0} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            &#8592; Anterior
                        </button>
                        <button onClick={nextPage} disabled={(currentPage + 1) * 10 >= data[model]?.length} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Siguiente &#8594;
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ListaComponentes;
