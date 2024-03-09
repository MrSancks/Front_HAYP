import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TablaCombinaciones = ({ combinaciones }) => {
    const [componenteImages, setComponenteImages] = useState({});


    const parsedCombinaciones = combinaciones.split('\n\n').map(combinacion => {
        const lines = combinacion.split('\n');
        const componentes = lines.slice(0, -1).map(line => {
            const [nombre, precio] = line.split(': ');
            return { nombre: nombre.trim(), precio: parseFloat(precio.trim()) };
        });
        const total = parseFloat(lines[lines.length - 1].split(': ')[1]);
        return { componentes, total };
    });


    useEffect(() => {
        const fetchComponenteImages = async () => {
            const images = {};
            await Promise.all(
                parsedCombinaciones.map(async (combinacion, index) => {
                    await Promise.all(
                        combinacion.componentes.map(async (componente, idx) => {
                            try {
                                const response = await axios.get(`https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(componente.nombre)}&key=AIzaSyAaa77L0OpW8lMay785WtIzOHPqsBR7eY4&cx=b03bf514d1e874c21`);
                                if (response.data.items && response.data.items.length > 0) {
                                    images[`${index}-${idx}`] = response.data.items[0].link;
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

        fetchComponenteImages();
    }, [combinaciones]);
    return (
        <div>
            <h2>Combinaciones de Componentes</h2>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Componentes</th>
                        <th className="px-4 py-2">Precio</th>
                        <th className="px-4 py-2">Precio Total</th>
                        <th className="px-4 py-2">Links</th>
                    </tr>
                </thead>
                <tbody>
                    {parsedCombinaciones.map((combinacion, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">
                                <ul>
                                    {combinacion.componentes.map((componente, idx) => (
                                        <li key={idx}>{componente.nombre}</li>

                                    ))}                               
                                </ul>
                            </td>
                            <td className="border px-4 py-2">
                                <ul>
                                    {combinacion.componentes.map((componente, idx) => (
                                        <li key={idx}>$ {componente.precio}</li>

                                    ))}
                                </ul>
                            </td>
                            <td className="border px-4 py-2">$ {combinacion.total}</td>
                            <td className="border px-4 py-2">
                                <ul>
                                    {combinacion.componentes.map((componente, idx) => (
                                        <li key={idx}>
                                            <a href={componenteImages[`${index}-${idx}`]} target="_blank" rel="noopener noreferrer">
                                                {componente.nombre}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {console.log(componenteImages) }
        </div>
    );
};

export default TablaCombinaciones;
