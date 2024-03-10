import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Asegúrate de importar axios si no lo has hecho
import { Connection } from '../data/Connection.jsx';
import '../output.css';
import Header from './Header';
function ListaComponentes() {
    const [data, setData] = useState({});
    const [selectedModels, setSelectedModels] = useState([]);
    const [componenteImages, setComponenteImages] = useState({});

    useEffect(() => {
        const fetchComponents = async () => {
            const data = await Connection();
            setData(data);
        }
        fetchComponents();
    }, []);

    useEffect(() => {
        const fetchComponente2 = async () => {
            const images = {};
            await Promise.all(
                Object.keys(data).map(async (model) => {
                    await Promise.all(
                        data[model].map(async (componente, idx) => {
                            try {
                                const response = await axios.get(`https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(componente.nombre)}&key=AIzaSyAaa77L0OpW8lMay785WtIzOHPqsBR7eY4&cx=b03bf514d1e874c21`);
                                if (response.data.items && response.data.items.length > 0) {
                                    images[`${model}-${idx}`] = response.data.items[0].link;
                                }
                            } catch (error) {
                                console.error('Error fetching image:', error);
                            }
                        })
                    );
                })
            );
            setComponenteImages(images);
        };

        fetchComponente2();
    }, [data]);

    const handleChange = (event) => {
        setSelectedModels(Array.from(event.target.selectedOptions, option => option.value));
    }

    return (
        <div className="flex flex-col h-screen items-center">
        <Header/>
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
                                <th className="py-2 px-4 border border-gray-300">Descripción</th>
                                <th className="py-2 px-4 border border-gray-300">Precio</th>
                                <th className="py-2 px-4 border border-gray-300">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data[model]?.map((component, id) => (
                                <tr key={id}>
                                    <td className="py-2 px-4 border border-gray-300">{component.nombre}</td>
                                    <td className="py-2 px-4 border border-gray-300">{component.descripcion}</td>
                                    <td className="py-2 px-4 border border-gray-300">{component.precio}</td>
                                    <td className="py-2 px-4 border border-gray-300"><a href={componenteImages[`${model}-${id}`]} target="_blank" rel="noopener noreferrer">
                                        {component.nombre}
                                            </a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default ListaComponentes;
